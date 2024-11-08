import { generateComponentName } from "../helpers/generateComponentName";

// Function to get the template for a specific component type
export const getComponentTemplate = (componentType: string) => {
  return componentTemplates[componentType.toLowerCase()] || null;
};

// Generate task description for generating HTML structure
export const getStructureTaskDescription = (template: any) => {
  if (!template) return "";

  const propsDescription = template.baseStructure.props
    .map(
      (prop) =>
        `- ${prop.name}: ${prop.description}. Default value must be provided if applicable.`
    )
    .join("\n");

  return `
    Component requirements:
    ${propsDescription}
  `;
};

// Extract relevant properties based on the description provided
export function extractRelevantProps(description: string, template: any) {
  if (!template) return "";

  const relevantProps = template.baseStructure.props.filter((prop) => {
    // Check if the prop name or description is mentioned in the user description
    return (
      description.toLowerCase().includes(prop.name.toLowerCase()) ||
      description.toLowerCase().includes(prop.description.toLowerCase())
    );
  });

  return relevantProps.length > 0
    ? relevantProps
        .map((prop) => `- ${prop.name}: ${prop.description}`)
        .join("\n")
    : "";
}

// Wrapper for generating component names
export const generateComponentNameWrapper = (description: string) => {
  return generateComponentName(description);
};

// Templates for generating HTML and Tailwind CSS components
export const componentTemplates = {
  button: {
    componentName: "Button",
    baseStructure: {
      props: [
        {
          name: "label",
          description: "Text to display on the button",
        },
        {
          name: "onClick",
          description: "Functionality for button click",
        },
        {
          name: "variant",
          description: "Button style variant (primary, secondary, outline)",
        },
        {
          name: "isLoading",
          description: "Loading state of the button",
        },
      ],
      resultCode: `
        <button class="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded focus:outline-none">
          {{label}}
        </button>
      `,
    },
  },
  input: {
    componentName: "Input",
    baseStructure: {
      props: [
        {
          name: "label",
          description: "Label text for the input",
        },
        {
          name: "placeholder",
          description: "Placeholder text for the input",
        },
        {
          name: "type",
          description: "Type of input (text, password, email, etc.)",
        },
        {
          name: "value",
          description: "Value of the input field",
        },
        {
          name: "onChange",
          description: "Functionality for input change",
        },
      ],
      resultCode: `
        <label class="block mb-2 text-gray-700">{{label}}</label>
        <input type="{{type}}" placeholder="{{placeholder}}" class="border rounded px-3 py-2 w-full" />
      `,
    },
  },
  card: {
    componentName: "Card",
    baseStructure: {
      props: [
        {
          name: "title",
          description: "Title text for the card",
        },
        {
          name: "content",
          description: "Content text inside the card",
        },
        {
          name: "image",
          description: "URL for the card image",
        },
        {
          name: "footer",
          description: "Footer content of the card",
        },
      ],
      resultCode: `
        <div class="max-w-md mx-auto rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <img src="{{image}}" alt="Card Image" class="h-48 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{title}}</h2>
            <p class="text-gray-700 mb-4">{{content}}</p>
            <div>{{footer}}</div>
          </div>
        </div>
      `,
    },
  },
  modal: {
    componentName: "Modal",
    baseStructure: {
      props: [
        {
          name: "isOpen",
          description: "Controls visibility of the modal",
        },
        {
          name: "onClose",
          description: "Functionality to close the modal",
        },
        {
          name: "title",
          description: "Title of the modal",
        },
        {
          name: "children",
          description: "Content inside the modal",
        },
      ],
      resultCode: `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style="display: {{isOpen ? 'block' : 'none'}};">
          <div class="bg-white rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-4">{{title}}</h2>
            <div>{{children}}</div>
            <button class="mt-4 bg-red-500 text-white py-2 px-4 rounded" onclick="{{onClose}}">Close</button>
          </div>
        </div>
      `,
    },
  },
  form: {
    componentName: "Form",
    baseStructure: {
      props: [
        {
          name: "onSubmit",
          description: "Functionality for form submission",
        },
        {
          name: "title",
          description: "Title of the form",
        },
        {
          name: "fields",
          description: "Array of form field configurations",
        },
      ],
      resultCode: `
        <form onsubmit="{{onSubmit}}">
          <h2 class="text-xl font-semibold mb-4">{{title}}</h2>
          {{#fields}}
            <label class="block mb-2 text-gray-700">{{label}}</label>
            <input type="{{type}}" placeholder="{{placeholder}}" class="border rounded px-3 py-2 w-full mb-4" />
          {{/fields}}
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
        </form>
      `,
    },
  },
};
