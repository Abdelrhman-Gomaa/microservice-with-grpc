import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from '@app/rabbitmq';

@Module({
  imports: [
    UserModule,
    RabbitmqModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ]
})
export class RegisterModule { }
