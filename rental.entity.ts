import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  rentDate: Date;

  @Column({ type: 'date', nullable: true })
  returnDate: Date;

  // เชื่อมไปยัง User (Many-to-One) 
  @ManyToOne(() => User, (user) => user.rentals)
  user: User;

  // เชื่อมไปยัง Movie (Many-to-One) 
  @ManyToOne(() => Movie, (movie) => movie.rentals)
  movie: Movie;
}