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

    const acces_token = googleUser
      ? this.authService.createJwt(googleUser.id, googleUser.email)
      : '';
    /* if (googleUser) {
      return {
        access_token: this.authService.createJwt(
          googleUser.id,
          googleUser.email,
        ),
      };
    } */

    let responseHTML =
      '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>';
    responseHTML = responseHTML.replace(
      '%value%',
      JSON.stringify({
        acess_token: acces_token,
      }),
    );
    res.status(HttpStatus.OK).send(responseHTML);
  }
}
