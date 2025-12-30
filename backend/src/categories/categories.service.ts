import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private repo: Repository<Category>,
  ) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async create(name: string) {
    const exists = await this.repo.findOne({ where: { name } });
    if (exists) throw new BadRequestException('Category already exists');
    return this.repo.save(this.repo.create({ name }));
  }
}
