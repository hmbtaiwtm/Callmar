import { Controller, Get, Param, Post, Body, Req, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './user.dto';
import { Email } from './user.dto';
import { userId } from 'src/types/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getMeByToken')
  isUserAuth(@Req() req: userId) {
    return this.userService.GetMyByToken(req.userId)
  }

  @Post('email')
  sendEmail(@Body() email: Email) {
    return this.userService.SendEmail(email)
  }

  @Patch('resetPassword/:id') 
  async resetPassword(@Param('id') id: number, @Body() password: { password: string }) {
    const pass = password.password 
    return this.userService.resetPassword(id, pass);
  }

  @Post('register')
  registerUser(@Body() userData: UserRegisterDto) {
    return this.userService.RegisterUser(userData)
  }

  @Post('login')
  loginUser(@Body() userData: {email: string, password: string}) {
    return this.userService.SignInUser({ email: { email: userData.email }, password: userData.password })
  }

}



