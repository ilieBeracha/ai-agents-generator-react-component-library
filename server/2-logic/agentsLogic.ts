import dotenv from "dotenv";
import { Agent, Task, Team } from "kaibanjs";
import path from "path";
import {
  AgentConfig,
  AIGenerationResponse,
  GeneratedResultParsed,
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
      description: `Design a plain JavaScript React component for ${componentName}.\n
        - Avoid export statements or imports.
        - Return the component function directly so it can be evaluated as an inline function.
        - Include default values for props within the component.
        Example structure:\n
        "function ${componentName}(props) { return (<div>...</div>); }"`,
      expectedOutput: `{
        "code": "function ${componentName}({ label = 'Default Button', styleType = 'primary', isDisabled = false, isLoading = false, onClick = () => alert('Button clicked!') }) {
          return (
            <button
              className={\`px-4 py-2 font-semibold text-white rounded-lg focus:outline-none transition duration-300 ease-in-out \${styleType === 'primary' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'} \${isDisabled ? 'bg-gray-300 cursor-not-allowed' : ''} \${isLoading ? 'opacity-50' : ''}\`}
              onClick={!isDisabled ? onClick : undefined}
              disabled={isDisabled}
              aria-busy={isLoading}
            >
              {isLoading ? <span className='loader animation-spin inline-block mr-2'></span> : label}
            </button>
          );
        }",
        "notes": "Basic React component structure with default props and conditional rendering."
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
    return result;
  } catch (error) {
    console.error("Error generating component:", error);
    throw new Error("An error occurred during component generation.");
  }
};

export const saveComponentInDB = async (
  result: AIGenerationResponse,
  userId: string
) => {
  const parsedResult = JSON.parse(result.result) as GeneratedResultParsed;

  const generation = await prisma.generation.create({
    data: {
      resultCode: parsedResult.code,
      notes: parsedResult.notes,
      userId: userId,
    },
  });
  return generation;
};

export function getGenerations() {
  return prisma.generation.findMany();
}
