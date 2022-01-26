import { Injectable } from '@nestjs/common';
import { UserService, User } from '../user/user.service';
import { EncryptionService } from '../encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (
      user !== undefined &&
      this.encryptionService.compare(
        password,
        (<Record<string, any>>user.properties).password,
      )
    ) {
      return user;
    }
  }

  async createToken(user: User) {
    // Deconstruct the properties
    const { id, email, dateOfBirth, firstName, lastName } = <
      Record<string, any>
    >user.properties;

    // Encode that into a JWT
    return {
      access_token: this.jwtService.sign({
        sub: id,
        email,
        dateOfBirth,
        firstName,
        lastName,
      }),
    };
  }
}
