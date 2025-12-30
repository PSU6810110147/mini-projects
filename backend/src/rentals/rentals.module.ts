import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental]), MoviesModule],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}
