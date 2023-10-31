import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@app/database';
import { RabbitmqModule } from '@app/rabbitmq';

@Module({
  imports: [DatabaseModule, RabbitmqModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
