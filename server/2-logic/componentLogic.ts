import { prisma } from "../1-dal/prismaClient";
import { AIGenerationResponse, GeneratedResultParsed } from "../types/agent";

export const saveComponentInDB = async (
  result: AIGenerationResponse,
  userId: string,
  componentName: string,
  componentType: string
) => {
  const parsedResult = JSON.parse(result.result) as GeneratedResultParsed;
  return await prisma.generation.create({
    data: {
      resultCode: parsedResult.code,
      notes: parsedResult.notes,
      componentName,
      componentType,
      userId,
    },
  });
};

export const getGenerations = async () => {
  return await prisma.generation.findMany();
};
