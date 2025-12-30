import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from './enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // สมัคร/สร้าง user (public)
  @Post()
  async create(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body);
  }

  // ดู users ทั้งหมด (ADMIN เท่านั้น)
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async findAll() {
    return this.usersService.findAll();
  }

  // เปลี่ยน role (ADMIN เท่านั้น) - เผื่ออาจารย์ให้ทำ
  @Patch(':id/role')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async changeRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { role: Role },
  ) {
    return this.usersService.updateRole(id, body.role);
  }
}
