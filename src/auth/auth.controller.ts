import { Body, Controller, Get, Post, Request, UseGuards,UsePipes,ValidationPipe } from '@nestjs/common';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly subscriptionService: SubscriptionService
        ) {}
       
    @Post('register')
    async postRegister(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.create(
            createUserDto.email,
            createUserDto.password,
            new Date(createUserDto.dateOfBirth),
            createUserDto.firstName,
            createUserDto.lastName
        )
        
        //console.log(">> %s", JSON.stringify(user.properties))
        return await this.authService.createToken(user)
        
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async postLogin(@Request() request) {

        return await this.authService.createToken(request.user)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() request) {
        const {id, email, dateOfBirth, firstName, lastName} = request.user.properties

        return {
            id, email, firstName, lastName,
            dateOfBirth: (new Date(dateOfBirth)).toISOString()
        }
    }
}