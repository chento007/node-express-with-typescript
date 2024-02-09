import { RegisterDto } from "app/DTO/AuthDTO/RegisterDto";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginDto } from "app/DTO/AuthDTO/LoginDto";
import { User } from "../models/users";
import { IUser } from "app/middlewares/auth";


/**
 * This class handle all User Service and integrate with database
 */
export class AuthService {

    /**
     * this function use to register user in client page
     * @param registerDto the data that need to register
     * @returns user payload after register
     */
    static async register(registerDto: RegisterDto): Promise<any> {

        let { email, password } = registerDto;

        const user = await User.create({
            email, password
        })

        return user;
    }

    /**
     * this function use to find User by Emai
     * @param email the emal user want to find
     * @returns payload user
     */
    static async findByEmail(email: string): Promise<any> {

        let user = await User.findOne({ email })

        return user;
    }


    /**
     * this function use to get access and refresh token when user login or request new token
     * @param id the user id need to encrpyt payload
     * @returns access and refresh token
     */
    static async getToken(id: string): Promise<any> {

        return {
            accessToken: jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_TIME }),
            refreshToken: jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME })
        }

    }

    /**
     * This function use to compare password before user login 
     * @param passwordEnter the user enter password
     * @param planTextPassword  the password from databas
     * @returns return boolean true is mean correct
     */
    static comparePassword = async (passwordEnter: string, planTextPassword: string) => {

        return await bcrypt.compare(passwordEnter, planTextPassword);
    }


    /**
     * This function use to hasPassword before insert into database
     * @param password is the password need to hash
     * @returns the password after hash
     */
    static hasPassword = async (password: string) => {

        return await bcrypt.hash(password, 10);;
    }

    static getRefreshToken = async (refreshToken: string) => {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY) as IUser;
        const user = await User.findOne({ _id: decoded.id })

        return user;

    }
}