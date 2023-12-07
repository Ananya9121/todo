
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'Please enter description more than 10 characters' })
    @MaxLength(500, { message: 'Please enter description less than 500 characters' })
    description: string;

}

