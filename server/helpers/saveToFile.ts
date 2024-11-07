import fs from "fs";

// Save generated code to a .tsx file
export const saveFile = (dirPath: string, filePath: string, code: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, code, "utf8");
  console.log(`Component code saved to ${filePath}`);
  return filePath;
};
