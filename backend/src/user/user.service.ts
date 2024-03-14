import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRegisterDto } from './user.dto';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { userId } from 'src/types/user';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private readonly mailerServ: MailerService){}

    async GetUserById(id: Prisma.UserWhereUniqueInput) {
        try {
            const user = await this.prisma.user.findUnique({
                where: id
            })
            if(!user) {
                throw new UnauthorizedException('user not found')
            }

            return user

        } catch(error) {
            console.log(error)
            throw new NotFoundException('хуй')
        }
    }

    async GetMyByToken(id: number) {
      try {
        const user = await this.GetUserById({ id })
        return user
      } catch(error) {
        console.log(error)
        throw new NotFoundException('соси хуй быдло')
      }
    }

    async SendEmail(email: Prisma.UserWhereUniqueInput ) {
       try {
            const user = await this.prisma.user.findUnique({
                where: email
            })

            if(!user) {
                throw new UnauthorizedException('user not found')
            }

            this.mailerServ.sendMail({
                from: 'comf270518@gmail.com',
                to: `${user.email}`,
                subject: 'Hello there',
                text: `Вот ваша ссылка для сброса пароля :) http://localhost:5173/ressetPass/${user.id}`
            })

            return 'succes'
       } catch(error) {
        console.log(error)
            throw new NotFoundException(error.message)
       }
    }

    async resetPassword(id: number, pass: string ) {
       try {
            const hash = await bcrypt.hash(pass, 10)
            const newPassword = await this.prisma.user.update({
                where: { id: +id } ,
                data: { password: hash }
            })

            if(!newPassword) {
                throw new UnauthorizedException('пиздец')
            }

            const token = jwt.sign({
                id: id,
            }, 
            'secret123',
            {
                expiresIn: '30d',
            })

            return { message: 'пароль был успешно обновлен', token }
       } catch (error) {
            console.log(error)
            throw new NotFoundException(error.message)
       }
    }

    async RegisterUser(userData: UserRegisterDto)  {
        const password = userData.password;
        const hash = await bcrypt.hash(password, 10)

        const newUser = await this.prisma.user.create({
            data: {
              username: userData.username,
              email: userData.email,
              address: userData.address,
              phone: userData.phone,
              password: hash,
            }
        })

        const token = jwt.sign({
            id: newUser.id,
        }, 
        'secret123',
        {
            expiresIn: '30d',
        })

        if(!newUser) {
            throw new Error('user not created')
        }

        return {...newUser, token }
    }

    async SignInUser(userData: {email: Prisma.UserWhereUniqueInput, password: string}) {
        try {
            const user = await this.prisma.user.findUnique({
                where: userData.email
            })
            

            if(!user) {
                throw new UnauthorizedException('user not found')
            }
    
            const isCorrectPassword =  await bcrypt.compare(userData.password, user.password)
    
            if(!isCorrectPassword) {
                throw new UnauthorizedException('wrong email or password')
            }
    
            const token = jwt.sign(
                {id: user.id},
                'secret123',
                {expiresIn: '10d'} 
            )
            return {
                user,
                token
            };
        } catch(error) {
            console.log(error)
            throw new NotFoundException(error.message)
        }
    } 
}
