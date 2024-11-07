import express, { Request, Response } from "express";
import { getAllUsers, login, register } from "../2-logic/authLogic";

export const AuthRoute = express.Router();

AuthRoute.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);

    res.json(result);
  } catch (error: any) {
    return res.status(500).json(error);
  }
});

AuthRoute.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const user = req.body;
      const result = await register(user);

      res.json(result);
    } catch (error: any) {
      return res.status(500).json(error);
    }
  }
);
AuthRoute.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await getAllUsers();
    res.json(result);
  } catch (error: any) {
    return res.status(500).json(error);
  }
});
