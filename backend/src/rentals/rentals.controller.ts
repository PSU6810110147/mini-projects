import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Req } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('rentals')
@UseGuards(AuthGuard('jwt'))
export class RentalsController {
  constructor(private readonly service: RentalsService) {}

  @Post()
  rent(@Req() req: any, @Body() body: { movieId: number; hours: number }) {
    return this.service.rent(req.user.sub, body.movieId, body.hours);
  }

  @Get('me')
  myRentals(@Req() req: any) {
    return this.service.myRentals(req.user.sub);
  }

  @Post(':id/return')
  returnRental(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.service.returnRental(req.user.sub, id);
  }

