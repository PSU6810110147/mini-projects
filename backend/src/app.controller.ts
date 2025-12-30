import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  // เปิด http://localhost:3002 แล้วได้ list users เลย
  @Get()
  async root() {
    return this.usersService.findAll();
  }
}
