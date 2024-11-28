import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(message: string, subject: string, sendTo: string) {

    const sender = {
        address: "tinnt0504@gmail.com",
        name: "Admin Booksotre",
      };

    const result = await this.mailService.sendMail({
      from: sender,
      to: sendTo,
      subject: subject,
      text: message,
    })

    console.log('result: ', result); 
  }
}