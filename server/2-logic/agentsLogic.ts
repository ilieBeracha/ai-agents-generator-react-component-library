import dotenv from "dotenv";
import {
  createAgent,
  createTask,
  createComponentTeam,
  getSearchTool,
} from "../1-dal/initAgentSearch";
import {
  getComponentTemplate,
  generateComponentNameWrapper,
  extractRelevantProps,
} from "../helpers/componentsTemplates";
import { saveComponentInDB } from "./componentLogic";
import { AIGenerationResponse } from "../types/agent";

dotenv.config();

export const executeAgents = async (
  componentType: string,
  description: string,
  userId: string
) => {
  const componentName = generateComponentNameWrapper(description);
  const searchTool = getSearchTool();
  const template = getComponentTemplate(componentType);

  const agents = [
    createAgent({
      name: "Luna",
      role: "Component Researcher",
      goal: "Find best practices",
      background: "Frontend Dev",
      tools: [searchTool as any],
    }),
    createAgent({
      name: "Nova",
      role: "Structure Designer",
      goal: "Design component structure",
      background: "Frontend Dev",
      tools: [],
    }),
    createAgent({
      name: "Zen",
      role: "Tailwind Stylist",
      goal: "Apply Tailwind CSS",
      background: "UI/UX Designer",
      tools: [],
    }),
  ];

  const tasks = [
    createTask({
      title: "Research Component Requirements",
      description: `Research best practices for creating a React ${componentType} component based on the provided description.\n
      Description: ${description}\n\n${
        template
          ? `Include these specific props based on the description:\n${extractRelevantProps(
              description,
              template
            )}`
          : ""
      }\n
      - Focus on best practices for accessibility, responsiveness, and performance.
      - Consider modern UI/UX principles and Tailwind CSS utility classes.
      - Ensure the component adheres to design patterns that are common for ${componentType} components.
      - Include recommendations on prop usage, structure, and default values.`,
      expectedOutput: `{
        "code": "",
        "notes": "Research summary including best practices and related props."
      }`,
      agent: agents[0],
    }),
    createTask({
      title: "Component Structure Design",
      description: `Design a plain JavaScript React component for ${componentName}.\n
        - Avoid export statements or imports.
        - Avoid using any other libraries or frameworks.
        - Return the component function directly so it can be evaluated as an inline function.
        - Include default values for props within the component (with actual values, not just "undefined" / "null" / "..." / [] / {} / etc.).
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
      description: `Style the component using Tailwind CSS.`,
      expectedOutput: `{"code": "...", "notes": "Styled component"}`,
      agent: agents[2],
    }),
  ];

  const team = createComponentTeam({
    name: "React Component Creation",
    agents,
    tasks,
    env: { OPENAI_API_KEY: process.env.OPENAI_API_KEY! },
  });

  const teamResult = await team.start();

  const DBResult = await saveComponentInDB(
    teamResult as unknown as AIGenerationResponse,
    userId,
    componentName,
    componentType
  );
  return DBResult;
};
