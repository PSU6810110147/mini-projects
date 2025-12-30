import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rental.entity';
import { Movie } from '../movies/movie.entity';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental) private rentalRepo: Repository<Rental>,
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
  ) {}

  async createRental(userId: number, movieId: number) {
    // 1. ค้นหาหนังที่ต้องการเช่า
    const movie = await this.movieRepo.findOne({ where: { id: movieId } });

    // 2. ตรวจสอบสต็อก (Business Logic) 
    if (!movie || movie.stock_count <= 0) {
      throw new BadRequestException('หนังเรื่องนี้หมดสต็อกหรือไม่พบข้อมูล');
    }

    // 3. ลดสต็อกหนังลง 1 
    movie.stock_count -= 1;
    await this.movieRepo.save(movie);

    // 4. บันทึกข้อมูลการเช่า
    const newRental = this.rentalRepo.create({
      user: { id: userId },
      movie: { id: movieId },
    });

    return await this.rentalRepo.save(newRental);
  }
}