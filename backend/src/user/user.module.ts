import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'comf270518@gmail.com',
            pass: 'yrtr vwlw ayka nrcf'
        }
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
