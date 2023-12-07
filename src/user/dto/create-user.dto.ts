import {IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Please enter userName more than 6 characters'})    
    userName:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'Please enter password more than 6 characters'})    
    password:string;
}

export class UserDto {
    @IsNotEmpty()
    @IsString()
    userName:string;

    @IsNotEmpty()
    @IsNumber()
    id:number;
}

