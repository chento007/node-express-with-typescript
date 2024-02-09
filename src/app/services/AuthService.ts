import { RegisterDto } from "app/DTO/AuthDTO/RegisterDto";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginDto } from "app/DTO/AuthDTO/LoginDto";
import { User } from "../models/users";

export class UserService {

    static async register(registerDto: RegisterDto): Promise<any> {

        let { email, password } = registerDto;

        const user = await User.create({
            email, password
        })

        return user;
    }

    static async findByEmail(email: string): Promise<any> {

        let user = await User.findOne({ email })

        return user;
    }

    static async getToken(id: string): Promise<any> {

        return {
            data: {
                accessToken: jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME }),
                refreshToken: jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME })
            }
        }
    }

    static comparePassword = async (passwordEnter: string, planTextPassword: string) => {
        console.log(passwordEnter);
        console.log(planTextPassword);
        return await bcrypt.compare(passwordEnter, planTextPassword);
    }

    static hasPassword = async (password: string) => {
        const newPassword = await bcrypt.hash(password, 10);
        return newPassword;
    }

}