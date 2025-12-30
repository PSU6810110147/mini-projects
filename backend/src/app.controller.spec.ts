import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      ok: true,
      message: "Reelrent API is running ✅",
      endpoints: ["/users", "/users/:id"],
    };
  }
}
