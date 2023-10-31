import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserInput } from 'apps/register/src/user/input/register.input';
import { UserService } from 'apps/register/src/user/user.service';

@Injectable()
export class AppService implements OnModuleInit {

  private userService: UserService;

  constructor(@Inject('register') private client: ClientGrpc) { }

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  createUser(input: CreateUserInput) {
    return this.userService.createUser(input);
  }
}
