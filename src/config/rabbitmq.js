const amqp = require('amqplib');

class RabbitMQService {
  async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
  }

  async sendNotification(userId, message, type) {
    await this.channel.assertQueue('user_notifications');
    this.channel.sendToBuffer('user_notifications',
      Buffer.from(JSON.stringify({
        userId,
        message,
        type
      }))
    );
  }
}

module.exports = new RabbitMQService();
