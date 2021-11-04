import { Injectable } from '@nestjs/common';
import { GoogleUser } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  /**
   * Checks if google user exists in our database and creates if it doesn't
   * @param googleUser user to be checked if exists or to be created
   * @returns Google user of our app
   */
  async findOrCreteGoogleUser(googleUser: GoogleUser): Promise<GoogleUser> {
    return null;
  }
}
