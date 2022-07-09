import {NextFunction, Request, Response} from "express";

export class ValErr extends Error {}

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res
        .status(err instanceof ValErr ? 400 : 500)
        .json({
            message: err instanceof ValErr ? err.message : 'Try again later.',
        })
}
