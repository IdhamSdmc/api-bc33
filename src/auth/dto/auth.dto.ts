import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsInt()
  dni: number;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
