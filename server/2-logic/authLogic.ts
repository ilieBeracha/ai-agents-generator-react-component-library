import { User } from "@prisma/client";
import { prisma } from "../1-dal/prismaClient";
import { generateToken } from "../middleware/jwt";
import bcrypt from "bcrypt";

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 401, message: "Invalid password" };
    }

    const token = generateToken(user);

    return {
      status: 200,
      token: token,
    };
  } catch (error: any) {
    return { status: 500, message: error };
  }
}

export async function register(user: User) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  try {
    const createdUser = await prisma.user.create({
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
      },
    });

    const token = generateToken(createdUser);

    return {
      status: 200,
      token: token,
    };
  } catch (error: any) {
    return { status: 500, message: error };
  }
}

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}
