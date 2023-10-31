import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserInput } from 'apps/register/src/user/input/register.input';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('register')
  createUser(@Body() input: CreateUserInput) {
    return this.appService.createUser(input);
  }

}
