import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Rental } from './rental.entity';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private repo: Repository<Rental>,
    private moviesService: MoviesService,
  ) {}

  async rent(userId: number, movieId: number, hours: number) {
    if (!hours || hours <= 0) throw new BadRequestException('hours must be > 0');

    // ลด stock ก่อน
    await this.moviesService.decreaseStock(movieId);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + hours * 60 * 60 * 1000);

    const rental = this.repo.create({
      userId,
      movieId,
      rentDate: now,
      returnDate: null,
      expiresAt,
    });

    return this.repo.save(rental);
  }

  async myRentals(userId: number) {
    const list = await this.repo.find({
      where: { userId, returnDate: IsNull() },
      order: { id: 'DESC' },
    });

    // เพิ่ม remainingSeconds ให้ frontend เอาไปทำ countdown
    return list.map(r => {
      const remainingMs = new Date(r.expiresAt).getTime() - Date.now();
      const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
      return { ...r, remainingSeconds };
    });
  }

  async returnRental(userId: number, rentalId: number) {
    const rental = await this.repo.findOne({ where: { id: rentalId, userId } });
    if (!rental) throw new BadRequestException('Rental not found');
    if (rental.returnDate) throw new BadRequestException('Already returned');

    rental.returnDate = new Date();
    await this.repo.save(rental);

    // คืน stock
    await this.moviesService.increaseStock(rental.movieId);

    return { message: 'returned' };
  }
}
