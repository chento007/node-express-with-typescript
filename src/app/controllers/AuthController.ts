import { Request, Response } from 'express';
import { UserService } from '../services/AuthService';


export const register = async (req: Request, res: Response) => {


  const isEmailExist = await UserService.findByEmail(req.body.email);
  if (isEmailExist) {
    return res.json({
      status: 400,
      message: "Email is already exist."
    })
  }

  const user = await UserService.register({ ...req.body });
  return res.json({
    message: "You have register success."
  })
}


export const login = async (req: Request, res: Response) => {

  let { email, password } = req.body;

  const isEmailExist = await UserService.findByEmail(email);
  console.log(isEmailExist);
  if (!isEmailExist) {
    return res.json({
      status: 400,
      message: "Email or Password is invalid."
    })
  }
  const isPasswordMatch = await UserService.comparePassword(password, isEmailExist.password);
  if (!isPasswordMatch) {
    return res.json({
      status: 400,
      message: "Email or Password is invalid."
    })
  }

  res.json({
    data: await UserService.getToken(isEmailExist.id)
  })


}


export const getProfile = async (req: Request, res: Response) => {
  
  res.json({
    data: req.user
  })
}