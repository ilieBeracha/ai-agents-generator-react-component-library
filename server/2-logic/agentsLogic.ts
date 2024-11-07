import dotenv from "dotenv";
import { Agent, Task, Team } from "kaibanjs";
import path from "path";
import {
  AgentConfig,
  AIGenerationResponse,
  GeneratedResult,
  TaskConfig,
  TeamConfig,
} from "../types/agent";
import { generateComponentName } from "../helpers/generateComponentName";
import { saveFile } from "../helpers/saveToFile";
import { createSearchTool } from "../1-dal/initAgentSearch";
import { prisma } from "../1-dal/prismaClient";

dotenv.config();

// Create individual agents
const createAgent = (config: AgentConfig) => new Agent(config);

// Create individual tasks
const createTask = (config: TaskConfig) => new Task(config);

// Create team
const createComponentTeam = (config: TeamConfig) => new Team(config);

// Main function to create, configure, execute the team, and save the output
export const executeAgents = async (
  componentType: string,
  description: string
) => {
  const componentName = generateComponentName(description);
  const searchTool = createSearchTool(process.env.TAVILY_API_KEY!);

  // Agents configuration
  const agents = [
    createAgent({
      name: "Luna",
      role: "Component Researcher",
      goal: "Find and summarize best practices for the required React component",
      background: "Experienced in front-end development and UX research",
      tools: [searchTool as any],
    }),
    createAgent({
      name: "Nova",
      role: "Structure Designer",
      goal: "Create the skeleton and structure of the React component based on research",
      background:
        "Frontend developer skilled in component design and architecture",
      tools: [],
    }),
    createAgent({
      name: "Zen",
      role: "Tailwind Stylist",
      goal: "Apply Tailwind CSS classes to ensure the component is visually appealing and responsive",
      background:
        "UI/UX designer with a focus on Tailwind CSS and responsive design",
      tools: [],
    }),
  ];

  // Dynamic tasks with TypeScript support and unique component name
  const tasks = [
    createTask({
      title: "Research Component Requirements",
      description: `Research best practices for creating a React component for: ${componentType}\n${description}`,
      expectedOutput: `{"code": "", "notes": "Summary of best practices and feature requirements for the component."}`,
      agent: agents[0],
    }),
    createTask({
      title: "Component Structure Design",
      description: `Design a TypeScript React component for ${componentName} based on the research.\n
      - Export the component as "export default function ${componentName}()".
      - Include a "Props" TypeScript interface for dynamic elements and a "defaultProps" object for sample display data.
      Example structure:\n
      "export default function ${componentName}(props: ${componentName}Props) { return (<div>...</div>); }"`,
      expectedOutput: `{
        "code": "import React from 'react';\\n\\ninterface ${componentName}Props {\\n  label?: string;\\n  styleType?: 'primary' | 'secondary';\\n  isDisabled?: boolean;\\n  isLoading?: boolean;\\n  onClick: () => void;\\n}\\n\\nconst defaultProps: ${componentName}Props = {\\n  label: 'Click Me',\\n  styleType: 'primary',\\n  isDisabled: false,\\n  isLoading: false,\\n  onClick: () => console.log('Button clicked!'),\\n};\\n\\nexport default function ${componentName}({ label, styleType, isDisabled, isLoading, onClick }: ${componentName}Props) {\\n  return (\\n    <button\\n      className={\`px-4 py-2 font-semibold text-white rounded-lg focus:outline-none transition duration-300 ease-in-out \${styleType === 'primary' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} \${isDisabled ? 'bg-gray-300 cursor-not-allowed' : ''} \${isLoading ? 'opacity-50' : ''}\`}\\n      onClick={!isDisabled ? onClick : undefined}\\n      disabled={isDisabled}\\n      aria-busy={isLoading}\\n    >\\n      {isLoading ? <span className=\\"loader animation-spin inline-block mr-2\\"></span> : label}\\n    </button>\\n  );\\n};\\n\\n${componentName}.defaultProps = defaultProps;",
        "notes": "This template includes a TypeScript interface, props, and defaultProps for ${componentName} in React.",
      }`,
      agent: agents[1],
    }),
    createTask({
      title: "Tailwind Styling Task",
      description: `Apply Tailwind CSS classes to the ${componentName} JSX structure, ensuring responsiveness and visual appeal\n${description}`,
      expectedOutput: `{"code": "<Tailwind CSS classes applied to JSX structure>", "notes": "Responsive Tailwind CSS styling for the component to ensure a visually appealing result."}`,
      agent: agents[2],
    }),
  ];

  const team = createComponentTeam({
    name: "React Component Creation Team",
    agents,
    tasks,
    env: { OPENAI_API_KEY: process.env.OPENAI_API_KEY! },
  });

  try {
    const result: any = await team.start();

    const generatedCode = JSON.parse(result.result)
      .code.replace(/\\n/g, "\n")
      .replace(/\\"/g, '"');

    const dirPath = path.join(__dirname, "../generated");
    const filePath = path.join(dirPath, `${componentName}.tsx`);

    // Save the file using the new saveFile method
    const savedFilePath = saveFile(dirPath, filePath, generatedCode);

    return { ...result, filePath: savedFilePath };
  } catch (error) {
    console.error("Error generating component:", error);
    throw new Error("An error occurred during component generation.");
  }
};

export const saveComponentInDB = async (
  result: AIGenerationResponse,
  userId: string
) => {
  console.log(result);
  const parsedResult = JSON.parse(result.result) as GeneratedResult;

  const generation = await prisma.generation.create({
    data: {
      resultCode: parsedResult.code,
      notes: parsedResult.notes,
      userId: userId,
    },
  });
  return generation;
};
