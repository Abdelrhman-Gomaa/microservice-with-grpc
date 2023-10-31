import { NestFactory } from '@nestjs/core';
import { RegisterModule } from './register.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RegisterModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, 'proto/user.proto'),
        package: 'register',
      },
    },
  );
  await app.listen();
}
bootstrap();
