import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { GoogleUser } from 'src/auth/auth.service';
import { GOOGLE_USER_ENDPOINT } from 'src/config/constants';

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
    )}/${this.configService.get<string>(
      'services.user.version',
    )}${GOOGLE_USER_ENDPOINT}`;
    console.log(this.endpoint);
    //TEST
    this.endpoint = `http://20.72.172.42/users/v1/users/google`;
  }
  /**
   * Checks if google user exists in our database and creates if it doesn't
   * @param googleUser user to be checked if exists or to be created
   * @returns Google user of our app
   */
  async findOrCreateGoogleUser(googleUser: GoogleUser): Promise<GoogleUser> {
    let userResponseData: GoogleUser;
    try {
      userResponseData = await lastValueFrom(
        this.httpService.post(this.endpoint, googleUser).pipe(
          map((res) => {
            console.log('res');
            console.log(res);
            return res.data as GoogleUser;
          }),
        ),
      );
    } catch (error) {
      console.log(error);
    }

    return userResponseData;
  }
}
