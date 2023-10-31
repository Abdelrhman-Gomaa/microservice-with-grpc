import { Response } from 'express';
import { UserService } from './user.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserInput } from './input/register.input';
import { LoginInput } from './input/login.input';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @GrpcMethod('UserService', 'register')
  async register(@Body() input: CreateUserInput, @Res() res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(input);
      return res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }

  @GrpcMethod('UserService', 'login')
  async login(@Body() input: LoginInput, @Res() res: Response): Promise<Response> {
    try {
      const user = await this.userService.login(input);
      return res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }

}