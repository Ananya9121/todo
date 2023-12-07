import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto, @Res() res):Promise<object> {
    const newUser= await this.userService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json(newUser)
  }

  @Post('/login')
  async login(@Body() loginUserDto: CreateUserDto, @Res() res):Promise<object> {
    const newUser= await this.userService.login(loginUserDto);
    return res.status(HttpStatus.CREATED).json(newUser)
  }
}
