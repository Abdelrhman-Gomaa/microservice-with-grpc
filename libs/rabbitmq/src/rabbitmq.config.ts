import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

const env = dotenv.parse(fs.readFileSync(path.join(process.cwd(), '.env')));

export const rabbitmqConfig = {
  hostname: env.HOST,
  port: +env.RABBITMQ_PORT,
  username: env.RABBITMQ_USERNAME,
  password: env.RABBITMQ_PASSWORD,
  exchange: env.RABBITMQ_EXCHANGE,
  queues: [
    { name: env.RABBITMQ_MAIL_QUEUE, routingKey: env.RABBITMQ_MAIL_ROUTING_KEY },
    { name: env.RABBITMQ_SMS_QUEUE, routingKey: env.RABBITMQ_SMS_ROUTING_KEY }
  ],
};