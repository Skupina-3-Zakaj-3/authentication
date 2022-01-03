import { GoogleAuthGuard } from './google-auth.guard';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Response,
  HttpStatus,
} from '@nestjs/common';
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
  async googleAuthRedirect(@Request() req, @Response() res) {
    const googleUser = await this.userService.findOrCreateGoogleUser(
      req.user as GoogleUser,
    );
    console.log('trlrlala');
    console.log(googleUser);

    const access_token = googleUser
      ? this.authService.createJwt(googleUser.userId, googleUser.email)
      : '';
    /* if (googleUser) {
      return {
        access_token: this.authService.createJwt(
          googleUser.id,
          googleUser.email,
        ),
      };
    } */
    if (access_token) {
      let responseHTML =
        '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>';
      responseHTML = responseHTML.replace(
        '%value%',
        JSON.stringify({
          access_token: access_token,
          name: googleUser.name,
          surname: googleUser.surname,
          email: googleUser.email,
          userId: googleUser.userId,
        }),
      );
      res.status(HttpStatus.OK).send(responseHTML);
    } else {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Google login unssuccesful' });
    }
  }
}
