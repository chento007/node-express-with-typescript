import { ClassType } from 'class-transformer-validator';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';


export const validationMiddleware = (ClassValidate: ClassType<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = new ClassValidate();
            Object.keys(req.body).forEach(key => {
                dto[key] = req.body[key];
            });

            // Validate the DTO object
            const errors = await validate(dto);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            // If validation passes, proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
};