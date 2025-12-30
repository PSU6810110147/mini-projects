import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private repo: Repository<Movie>,
    private categoriesService: CategoriesService,
  ) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const movie = await this.repo.findOne({ where: { id } });
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async create(dto: {
    title: string; year: number; posterUrl: string; stockCount: number; categoryId: number;
  }) {
    const categories = await this.categoriesService.findAll();
    const ok = categories.some(c => c.id === dto.categoryId);
    if (!ok) throw new BadRequestException('Invalid categoryId');

    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<Movie>) {
    const movie = await this.findOne(id);
    Object.assign(movie, dto);
    return this.repo.save(movie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    await this.repo.remove(movie);
    return { message: 'deleted' };
  }

  async decreaseStock(movieId: number) {
    const movie = await this.findOne(movieId);
    if (movie.stockCount <= 0) throw new BadRequestException('Out of stock');
    movie.stockCount -= 1;
    await this.repo.save(movie);
  }

  async increaseStock(movieId: number) {
    const movie = await this.findOne(movieId);
    movie.stockCount += 1;
    await this.repo.save(movie);
  }
}
