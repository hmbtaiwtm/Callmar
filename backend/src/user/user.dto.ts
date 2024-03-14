import { IsString, IsEmail, isPhoneNumber, IsUrl, IsPhoneNumber } from "class-validator";

export class UserRegisterDto {
    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsUrl()
    address: string

    @IsPhoneNumber()
    phone: string

    @IsString()
    password: string
}

export class Email {
    @IsEmail()
    email: string
}

