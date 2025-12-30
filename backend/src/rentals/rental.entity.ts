import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  rentDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  returnDate: Date | null;

  // ✅ เพิ่มเพื่อทำเวลาคงเหลือ (ชั่วโมงเช่า)
  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @ManyToOne(() => User, (u) => (u as any).rentals, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Movie, (m) => m.rentals, { eager: true })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

