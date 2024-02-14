import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { catchAsyncError } from '../middlewares/catchAsyncErrors';
import { BaseRest } from '../base/BaseRest';

export const register = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

  const isEmailExist = await AuthService.findByEmail(req.body.email);
  if (isEmailExist) {
    return res.status(400).json({
      status: 400,
      message: "Email is already exist."
    })
  }

  const user = await AuthService.register({ ...req.body });

  return res.status(200).json(
    new BaseRest({
      status: true,
      code: 200,
      message: "You have register successfully.",
      data: user
    })
  )
})


export const login = catchAsyncError(async (req: Request, res: Response) => {

  let { email, password } = req.body;

  const isEmailExist = await AuthService.findByEmail(email);
  if (!isEmailExist) {
    return res.status(400).json({
      status: 400,
      message: "Email or Password is invalid."
    })
  }


  const isPasswordMatch = await AuthService.comparePassword(password, isEmailExist.password);
  if (!isPasswordMatch) {
    return res.status(400).json({
      status: 400,
      message: "Email or Password is invalid."
    })
  }


  const token = await AuthService.getToken(isEmailExist.id)

  return res.status(200).json(
    new BaseRest({
      status: true,
      code: 200,
      message: "You have login successfully.",
      data: token
    })
  )
})

export const getProfile = catchAsyncError(async (req: Request, res: Response) => {


  return res.status(200).json(
    new BaseRest({
      status: true,
      code: 200,
      message: "You have retrive your profile successfully.",
      data: req.user
    })
  )
})

export const refresh = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "Access Denied. No refresh token provided."
    });
  }

  const user = await AuthService.getRefreshToken(refreshToken);
  const token = await AuthService.getToken(user.id);

  return res.status(200).json(
    new BaseRest({
      status: true,
      code: 200,
      message: "You have new access successfully.",
      data: token
    })
  )
})

