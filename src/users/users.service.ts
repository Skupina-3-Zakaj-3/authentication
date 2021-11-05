import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  endpoint: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.endpoint = `http://${this.configService.get<string>(
      'services.user.name',
    )}:${this.configService.get(
      'services.user.port',
    )}/${this.configService.get<string>('services.user.version')}/users`;
    console.log(this.endpoint);
  }
  /**
   * Checks if google user exists in our database and creates if it doesn't
   * @param googleUser user to be checked if exists or to be created
   * @returns Google user of our app
   */
  async findOrCreateGoogleUser(googleUser: GoogleUser): Promise<GoogleUser> {
    let user;
    try {
      user = await this.httpService.post(this.endpoint, googleUser).toPromise();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}
