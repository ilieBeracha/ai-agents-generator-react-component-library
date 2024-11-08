import { executeAgents } from "../2-logic/agentsLogic";
import { saveComponentInDB } from "../2-logic/componentLogic";
import express from "express";
import { componentTemplates } from "../helpers/componentsTemplates";
import { GenerationsInDB } from "../types/agent";
import { getGenerations } from "../2-logic/componentLogic";

export const AgentsRoute = express();

AgentsRoute.get(
  "/get-generated-components",
  async (req: any, res): Promise<GenerationsInDB[] | any> => {
    const generations = await getGenerations();
    res.json(generations);
  }
);

AgentsRoute.post("/generate-component", async (req: any, res): Promise<any> => {
  try {
    const { componentType, description } = req.body;

    if (!componentType || !description) {
      return res.status(400).json({
        error: "Missing required fields: componentType and description",
      });
    }

    if (description.trim() === "") {
      return res.status(400).json({
        error: "Description cannot be empty",
      });
    }

    const template = componentTemplates[componentType.toLowerCase()];
    if (!template) {
      return res.status(400).json({
        error:
          "Invalid component type. Supported types: " +
          Object.keys(componentTemplates).join(", "),
      });
    }

    const generatedComponent: any = await executeAgents(
      componentType,
      description,
      req.userId
    );
    res.json(generatedComponent);
  } catch (error) {
    console.error("Error generating component:", error);
    res.status(500).json({
      error: "Internal server error while generating component",
    });
  }
});
