import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async findAll() {
    return this.userRepo.find({
      select: { id: true, email: true, role: true }, // ไม่ส่ง password
      order: { id: 'ASC' },
    });
  }

  async createUser(dto: { email: string; password: string }) {
    const exists = await this.findByEmail(dto.email);
    if (exists) throw new BadRequestException('Email already exists');

    const hash = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      email: dto.email,
      password: hash,
      role: Role.USER, // default
    });

    const saved = await this.userRepo.save(user);

    // ไม่คืน password
    return { id: saved.id, email: saved.email, role: saved.role };
  }

  // (Optional) ใช้สำหรับทำให้เป็น ADMIN โดย ADMIN เท่านั้น (ถ้าอาจารย์ต้องการ)
  async updateRole(userId: number, role: Role) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    user.role = role;
    const saved = await this.userRepo.save(user);
    return { id: saved.id, email: saved.email, role: saved.role };
  }
}
