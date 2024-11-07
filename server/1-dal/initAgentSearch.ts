import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import dotenv from "dotenv";

dotenv.config();

// Create search tool
export function createSearchTool(apiKey: string) {
  return new TavilySearchResults({
    maxResults: 5,
    apiKey,
  });
}
