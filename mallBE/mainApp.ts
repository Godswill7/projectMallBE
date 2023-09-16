import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan";
import helmet from "helmet"
import { HTTP, mainError } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";

export const mainApp = (app: Application) => {
    app.use(express.json())
        app.use(
          cors({
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"],
          })
        );
    app.use(morgan("dev"))
    app.use(helmet())
    app.set("view engine", "ejs")

    app.get("/", (req: Request, res: Response) => {
        try {
            return res.status(200).json({
                message: "OK response from server",
            })
        } catch (error: any) {
            return res.status(404).json({
                message: "error occured while loading default response",
                data: error
            })
        }
    })
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
        next(
            new mainError({
                name: "Router Error",
                message: `This error is coming up because the  URL, isn't correct`,
                status: HTTP.BAD,
                success: false,
            })
        );
    });
    app.use(errorHandler)
}