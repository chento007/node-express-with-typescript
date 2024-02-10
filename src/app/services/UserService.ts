import {User} from "../models/users"


/**
 * 
 */
export class UserService {


    static async getAll() {
        return await User.find();
    }


}

