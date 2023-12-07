import { BadRequestException, ConflictException, Injectable, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(()=> AuthService)) private readonly authService:AuthService

  ) { }
  async create(createUserDto: CreateUserDto): Promise<object> {
    try {
console.log("line 20");
      const existingUser = await this.findOneByName(createUserDto.userName)
      if (existingUser) throw new ConflictException('Username already exists')

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt)
      createUserDto.password = hashedPassword

      await this.userRepository.save(createUserDto)
      return { message: "User registered!" };
    } catch (error) {
      throw error
    }

  }

  async login(loginUserDto: CreateUserDto): Promise<object> {
    try {

      const existingUser = await this.findOneByName(loginUserDto.userName)
      if (!existingUser) throw new BadRequestException("Invalid Username!")

      const isPasswordMatch = await bcrypt.compare(loginUserDto.password, existingUser.password)

      if (!isPasswordMatch) throw new BadRequestException("Invalid Password!")

      const token=this.authService.generateToken({userName:loginUserDto.userName,id:existingUser.id})

      return { token };

    } catch (error) {
      throw error
    }

  }

  async findOneByName(name: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: {
          userName: name
        }
      })
    } catch (error) {
      throw error
    }
  }

}
