import { executeAgents, saveComponentInDB } from "../2-logic/agentsLogic";
import express from "express";
import { componentTemplates } from "../helpers/componentsTemplates";

export const AgentsRoute = express();

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
      template.componentName,
      description
    );

    const savedComponent = await saveComponentInDB(
      generatedComponent,
      req.userId
    );
    res.json(savedComponent);
  } catch (error) {
    console.error("Error generating component:", error);
    res.status(500).json({
      error: "Internal server error while generating component",
    });
  }
});
