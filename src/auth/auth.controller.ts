import { GoogleAuthGuard } from './google-auth.guard';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService, GoogleUser } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
    console.log(req);
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req) {
    const googleUser = await this.userService.findOrCreteGoogleUser(
      req.user as GoogleUser,
    );

    if (googleUser) {
      return {
        access_token: this.authService.createJwt(
          googleUser.id,
          googleUser.email,
        ),
      };
    }
  }
}
