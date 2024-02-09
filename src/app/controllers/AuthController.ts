import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';


export const register = async (req: Request, res: Response) => {


  const isEmailExist = await AuthService.findByEmail(req.body.email);
  if (isEmailExist) {
    return res.json({
      status: 400,
      message: "Email is already exist."
    })
  }

  await AuthService.register({ ...req.body });
  return res.json({
    message: "You have register success."
  })
}


export const login = async (req: Request, res: Response) => {

  let { email, password } = req.body;

  const isEmailExist = await AuthService.findByEmail(email);
  if (!isEmailExist) {
    return res.json({
      status: 400,
      message: "Email or Password is invalid."
    })
  }


  const isPasswordMatch = await AuthService.comparePassword(password, isEmailExist.password);
  if (!isPasswordMatch) {
    return res.json({
      status: 400,
      message: "Email or Password is invalid."
    })
  }
  const token =  await AuthService.getToken(isEmailExist.id)
  res.json({
    data : token
  })


}


export const getProfile = async (req: Request, res: Response) => {

  res.json({
    data: req.user
  })
}


export const refresh = async (req: Request, res: Response, next: NextFunction) => {

  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.json({
      message: "Access Denied. No refresh token provided."
    });
  }

  const user =await AuthService.getRefreshToken(refreshToken);
  const token = await AuthService.getToken(user.id);

  res.json({
    data: token
  })
}
