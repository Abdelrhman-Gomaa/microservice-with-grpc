import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { rabbitmqConfig } from './rabbitmq.config';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;

  // onModuleInit(): void {
  //   this.connect();
  // }

  async connect(): Promise<void> {
    try {
      this.connection = await connect({
        hostname: rabbitmqConfig.hostname,
        port: rabbitmqConfig.port,
        username: rabbitmqConfig.username,
        password: rabbitmqConfig.password,
      });
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(rabbitmqConfig.exchange, 'direct', { durable: true });
      rabbitmqConfig.queues.map(async queue => {
        await this.channel.assertQueue(queue.name, { durable: true });
        await this.channel.bindQueue(queue.name, rabbitmqConfig.exchange, queue.routingKey);
      });
      Logger.log('RabbitMQ connection is initialized ...');
    } catch (error) {
      console.error('An error occurred while connecting to RabbitMQ:', error);
      throw error;
    }
  }

  async publishMessage(message: string, routingKey: string, queue: string): Promise<void> {
    try {
      if (!this.channel) this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(rabbitmqConfig.exchange, 'direct', { durable: true });
      if (queue) await this.channel.assertQueue(queue, { durable: true });
      if (queue && routingKey) await this.channel.bindQueue(queue, rabbitmqConfig.exchange, routingKey);
      await this.channel.publish(rabbitmqConfig.exchange, routingKey, Buffer.from(message));
    } catch (error) {
      console.error('An error occurred while publishing a message to RabbitMQ:', error);
      throw error;
    }
  }

  async consumeMessages(queue: string, callback: (message: string) => void): Promise<void> {
    try {
      if (!this.channel) {
        throw new Error('RabbitMQ channel is not initialized');
      }
      await this.channel.consume(queue, (msg) => {
        if (msg) {
          const message = msg.content.toString();
          callback(message);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('An error occurred while consuming messages from RabbitMQ:', error);
      throw error;
    }
  }
}