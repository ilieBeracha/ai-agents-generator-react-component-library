import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { sub } = payload;
    req.userId = sub;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
};
