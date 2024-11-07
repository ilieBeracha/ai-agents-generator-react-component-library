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
      ],
      types: `type ButtonProps = { 
            label: string; 
            onClick: () => void; 
            className?: string;
          };`,
      styleRules: {
        defaultClasses: "w-40 h-12 text-base font-medium rounded-md",
      },
    },
  },
  input: {
    componentName: "Input",
    baseStructure: {
      props: [
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text for the input",
        },
        {
          name: "type",
          type: "string",
          description: "Type of input (text, password, etc.)",
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
      ],
      types: `type InputProps = {
            placeholder?: string;
            type?: string;
            value: string;
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
          };`,
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
      ],
      types: `type CardProps = {
            title: string;
            content: string;
          };`,
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
          name: "children",
          type: "ReactNode",
          description: "Content to display inside the modal",
        },
      ],
      types: `type ModalProps = {
            isOpen: boolean;
            onClose: () => void;
            children: React.ReactNode;
          };`,
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
          name: "children",
          type: "ReactNode",
          description: "Form fields and components to render inside the form",
        },
        {
          name: "validationSchema",
          type: "object",
          description: "Schema to validate form inputs",
        },
        {
          name: "initialValues",
          type: "object",
          description: "Initial values for the form fields",
        },
      ],
      types: `type FormProps = {
            onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
            children: React.ReactNode;
            validationSchema?: object;
            initialValues?: object;
          };`,
      styleRules: {
        defaultClasses:
          "p-6 space-y-4 border border-gray-300 rounded-lg shadow-md",
      },
    },
  },
};
