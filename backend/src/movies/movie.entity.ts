import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Rental } from '../rentals/rental.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'int' })
  year: number;

  @Column()
  posterUrl: string;

  @Column({ type: 'int', default: 0 })
  stockCount: number;

  @Column({ type: 'int' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.movies, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Rental, (r) => r.movie)
  rentals: Rental[];
}
