import { IsDate, IsEmail, IsNotEmpty, IsStrongPassword, Length, MaxDate } from "class-validator";

export class RegisterDto {


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Length(10, 200)
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

}
