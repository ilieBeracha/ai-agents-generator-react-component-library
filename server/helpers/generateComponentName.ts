// Utility function to generate a unique component name based on description
export const generateComponentName = (description: string) => {
  return (
    description
      .split(" ")
      .slice(0, 3) // Take first 3 words for uniqueness
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("") + "Component"
  );
};
