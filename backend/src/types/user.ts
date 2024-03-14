import { Request } from "express";

export interface userId extends Request {
    userId: number
}