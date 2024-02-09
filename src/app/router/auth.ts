import express from 'express';

import { getProfile, login, refresh, register } from "../controllers/AuthController";
import { validationMiddleware } from '../validator/ValidateInput';
import { RegisterDto } from '../DTO/AuthDTO/RegisterDto';
import { LoginDto } from '../DTO/AuthDTO/LoginDto';
import { isAuthenicationedUser } from '../middlewares/auth';

export default (router: express.Router) => {

    router.post('/api/auth/register', register);
    router.post("/api/auth/login", login);
    router.get("/api/auth/me", isAuthenicationedUser, getProfile)
    router.post("/api/auth/refresh", isAuthenicationedUser, refresh);
};