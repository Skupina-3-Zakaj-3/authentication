import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createJwt(id: string, email: string): string {
    try {
      const payload = { id, email };
      return this.jwtService.sign(payload);
    } catch (err) {
      console.log(err);
    }
  }
}

export interface GoogleUser {
  name: string;
  surname: string;
  email: string;
  googleId: string; //google id of user
  id?: string; //our id of user
}
