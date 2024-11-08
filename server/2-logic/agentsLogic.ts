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

  // Define agents
  const agents = [
    createAgent({
      name: "Luna",
      role: "HTML/CSS Researcher",
      goal: "Find best practices for HTML structure",
      background: "Frontend Dev",
      tools: [searchTool as any],
    }),
    createAgent({
      name: "Nova",
      role: "HTML Designer",
      goal: "Generate clean and responsive HTML structure",
      background: "Frontend Dev",
      tools: [],
    }),
    createAgent({
      name: "Zen",
      role: "Tailwind Stylist",
      goal: "Apply Tailwind CSS for styling",
      background: "UI/UX Designer",
      tools: [],
    }),
  ];

  // Define tasks
  const tasks = [
    // Research Task for Best Practices
    createTask({
      title: "Research HTML Component Requirements",
      description: `Research best practices for creating a ${componentType} component using HTML and Tailwind CSS based on the provided description.\n
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
      `,
      expectedOutput: `{
        "code": "",
        "notes": "Research summary including best practices for HTML structure and Tailwind usage."
      }`,
      agent: agents[0],
    }),

    // Task to Generate HTML and Tailwind CSS
    createTask({
      title: "Generate Full HTML and Tailwind CSS",
      description: `Generate a complete, functional, and responsive HTML component using Tailwind CSS based on the given description.\n
      Component Type: ${componentType}
      Description: ${description}\n
    
      Requirements:
      - The component should use semantic HTML elements (like div, button, img, etc.).
      - Include responsive design using Tailwind CSS utility classes.
      - Ensure accessibility (e.g., using aria-* attributes where necessary).
      - Focus on modern UI/UX principles with clean, readable HTML.
      - Include meaningful default content (e.g., placeholder images, text).
      
      Example Output:
      \`\`\`
      <div class="max-w-md mx-auto rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <img src="https://via.placeholder.com/150" alt="Placeholder Image" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">Card Title</h2>
          <p class="text-gray-700 mb-4">This is a description of the card content. It provides additional details.</p>
          <button class="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded">Click Here</button>
        </div>
      </div>
      \`\`\`
      
      - Ensure that all elements are styled using Tailwind classes.
      - The HTML should be ready to copy-paste into any static website.
      `,
      expectedOutput: `{
        "code": "<Complete HTML structure>",
        "css": "<Applied Tailwind CSS classes>"
      }`,
      agent: agents[1],
    }),

    // Task for Tailwind Styling Enhancements
    createTask({
      title: "Tailwind Styling Task",
      description: `Apply Tailwind CSS to the form to make it visually appealing and responsive. Use fixed sizes instead of 'w-full' for inputs and buttons.
      
      Requirements:
      - Use classes like 'max-w-md' or 'max-w-lg' for fixed sizes.
      - Apply background colors, rounded borders, and shadows for a modern look.
      - Ensure input fields have consistent spacing, padding, and clear focus states.
      - Include hover, focus, and disabled states for buttons.
      - Add error message styling using 'text-red-500' or similar classes.
      - Ensure accessibility using appropriate aria-* attributes.
      
      Example:
      \`\`\`
      <form class="max-w-lg mx-auto bg-gray-50 p-6 rounded-lg shadow-lg space-y-4">
        <label class="block text-gray-700">First Name</label>
        <input type="text" class="border border-gray-300 rounded px-4 py-2" placeholder="Enter your first name" />
        <label class="block text-gray-700">Email</label>
        <input type="email" class="border border-gray-300 rounded px-4 py-2" placeholder="Enter your email" />
        <button type="submit" class="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">Submit</button>
      </form>
      \`\`\``,
      expectedOutput: `{
        "code": "<Styled HTML Form>",
        "notes": "Styled form with Tailwind CSS using fixed sizes and accessibility features."
      }`,
      agent: agents[2],
    }),
  ];

  // Create and run the component team
  const team = createComponentTeam({
    name: "HTML and Tailwind Component Creation",
    agents,
    tasks,
    env: { OPENAI_API_KEY: process.env.OPENAI_API_KEY! },
  });

  const teamResult = await team.start();
  console.log("teamResult", teamResult);
  // Save the generated component into the database
  const DBResult = await saveComponentInDB(
    teamResult as unknown as AIGenerationResponse,
    userId,
    componentName,
    componentType
  );

  return DBResult;
};
