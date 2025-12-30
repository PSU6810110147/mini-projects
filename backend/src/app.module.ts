import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entities
import { User } from './users/entities/user.entity';
import { Category } from './categories/category.entity';
import { Movie } from './movies/movie.entity';
import { Rental } from './rentals/rental.entity';

// Modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MoviesModule } from './movies/movies.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  imports: [
    //  โหลด .env ให้ process.env ใช้ได้ทุกที่
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    //  TypeORM + Postgres (อ่านค่าจาก .env)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [User, Category, Movie, Rental],
        synchronize: true,
        // logging: true, // ถ้าอยากดู SQL ให้เปิดบรรทัดนี้
      }),
    }),

    //Feature Modules
    UsersModule,
    AuthModule,
    CategoriesModule,
    MoviesModule,
    RentalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
