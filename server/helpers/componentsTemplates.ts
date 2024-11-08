import { generateComponentName } from "../helpers/generateComponentName";

export const getComponentTemplate = (componentType: string) => {
  return componentTemplates[componentType.toLowerCase()] || null;
};

export const getStructureTaskDescription = (template: any) => {
  if (!template) return "";

  const propsDescription = template.baseStructure.props
    .map(
      (prop) =>
        `- ${prop.name} (${prop.type}): ${prop.description}. Default value must be provided.`
    )
    .join("\n");

  const styleRules = template.baseStructure.styleRules
    ? `\nRequired styling:\n${template.baseStructure.styleRules.defaultClasses}`
    : "";

  return `
    Component requirements:
    ${propsDescription}
    ${styleRules}
  `;
};

export function extractRelevantProps(description: string, template: any) {
  if (!template) return "";

  const relevantProps = template.baseStructure.props.filter((prop) => {
    // Check if the prop name or description is mentioned in the user description
    return (
      description.toLowerCase().includes(prop.name.toLowerCase()) ||
      description.toLowerCase().includes(prop.description.toLowerCase())
    );
  });

  // Format the props to include in the prompt
  return relevantProps.length > 0
    ? relevantProps
        .map((prop) => `- ${prop.name} (${prop.type}): ${prop.description}`)
        .join("\n")
    : "";
}

export const generateComponentNameWrapper = (description: string) => {
  return generateComponentName(description);
};

export const componentTemplates = {
  button: {
    componentName: "Button",
    baseStructure: {
      props: [
        {
          name: "label",
          type: "string",
          description: "Text to display on the button",
        },
        {
          name: "onClick",
          type: "function",
          description: "Function to call on button click",
        },
        {
          name: "variant",
          type: "string",
          description: "Button style variant (primary, secondary, outline)",
        },
        {
          name: "isLoading",
          type: "boolean",
          description: "Loading state of the button",
        },
      ],
      types: `type ButtonProps = { 
        label: string; 
        onClick: () => void; 
        variant?: 'primary' | 'secondary' | 'outline';
        isLoading?: boolean;
        className?: string;
      };`,
      styleRules: {
        defaultClasses:
          "w-40 h-12 text-base font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95",
        variants: {
          primary: "bg-blue-600 text-white hover:bg-blue-700",
          secondary: "bg-gray-600 text-white hover:bg-gray-700",
          outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
        },
      },
    },
  },
  input: {
    componentName: "Input",
    baseStructure: {
      props: [
        {
          name: "label",
          type: "string",
          description: "Label text for the input",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text for the input",
        },
        {
          name: "type",
          type: "string",
          description: "Type of input (text, password, email, etc.)",
        },
        {
          name: "value",
          type: "string",
          description: "Value of the input field",
        },
        {
          name: "onChange",
          type: "function",
          description: "Function to call when input value changes",
        },
        {
          name: "error",
          type: "string",
          description: "Error message to display",
        },
      ],
      types: `type InputProps = {
        label: string;
        placeholder?: string;
        type?: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        error?: string;
      };`,
      styleRules: {
        defaultClasses: "relative w-full group",
        inputClasses:
          "w-full px-4 h-12 peer rounded-lg border-2 border-gray-200 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20",
        labelClasses:
          "absolute left-2 -top-2.5 px-2 bg-white text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500",
        errorClasses: "mt-1 text-sm text-red-500",
      },
    },
  },
  card: {
    componentName: "Card",
    baseStructure: {
      props: [
        {
          name: "title",
          type: "string",
          description: "Title text to display at the top of the card",
        },
        {
          name: "content",
          type: "string",
          description: "Content text to display inside the card",
        },
        {
          name: "image",
          type: "string",
          description: "URL of the card's image",
        },
        {
          name: "footer",
          type: "ReactNode",
          description: "Footer content of the card",
        },
      ],
      types: `type CardProps = {
        title: string;
        content: string;
        image?: string;
        footer?: React.ReactNode;
      };`,
      styleRules: {
        defaultClasses:
          "overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full",
        headerClasses: "p-6 border-b border-gray-100",
        contentClasses: "p-6",
        footerClasses: "p-6 bg-gray-50 border-t border-gray-100",
        imageClasses: "w-full h-48 object-cover",
      },
    },
  },
  modal: {
    componentName: "Modal",
    baseStructure: {
      props: [
        {
          name: "isOpen",
          type: "boolean",
          description: "Controls whether the modal is visible",
        },
        {
          name: "onClose",
          type: "function",
          description: "Function to call when modal should close",
        },
        {
          name: "title",
          type: "string",
          description: "Title of the modal",
        },
        {
          name: "children",
          type: "ReactNode",
          description: "Content to display inside the modal",
        },
      ],
      types: `type ModalProps = {
        isOpen: boolean;
        onClose: () => void;
        title?: string;
        children: React.ReactNode;
      };`,
      styleRules: {
        overlayClasses:
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
        modalClasses:
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl transition-all duration-300",
        headerClasses:
          "flex items-center justify-between p-6 border-b border-gray-100",
        contentClasses: "p-6",
        closeButtonClasses:
          "p-2 rounded-lg hover:bg-gray-100 transition-colors",
      },
    },
  },
  form: {
    componentName: "Form",
    baseStructure: {
      props: [
        {
          name: "onSubmit",
          type: "function",
          description: "Function to call when form is submitted",
        },
        {
          name: "isLoading",
          type: "boolean",
          description: "Loading state of the form",
        },
        {
          name: "title",
          type: "string",
          description: "Form title",
        },
        {
          name: "fields",
          type: "array",
          description: "Array of form field configurations",
          defaultValue: "[firstName, lastName, email, password]",
        },
        {
          name: "submitText",
          type: "string",
          description: "Text to display on submit button",
        },
      ],
      types: `type FormField = {
        name: string;
        label: string;
        type: string;
        placeholder?: string;
        required?: boolean;
        options?: string[];
      };

      type FormProps = {
        onSubmit: (data: any) => void;
        isLoading?: boolean;
        title?: string;
        fields: FormField[];
        submitText?: string;
      };`,
      defaultFields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          required: true,
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          type: "tel",
          required: false,
        },
      ],
      styleRules: {
        defaultClasses:
          "w-full max-w-md mx-auto p-8 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-white/20",
        headerClasses: "text-2xl font-bold text-gray-800 mb-6 text-center",
        fieldGroupClasses: "space-y-6",
        submitButtonClasses:
          "w-full h-12 bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
      },
    },
  },
};
