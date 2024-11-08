import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import dotenv from "dotenv";
import { Agent, Task, Team } from "kaibanjs";
import { AgentConfig, TaskConfig, TeamConfig } from "../types/agent";

dotenv.config();

// Create search tool
export function createSearchTool(apiKey: string) {
  return new TavilySearchResults({
    maxResults: 5,
    apiKey,
  });
}

// Fetch search tool
export const getSearchTool = () =>
  createSearchTool(process.env.TAVILY_API_KEY!);

// Create individual agents
export const createAgent = (config: AgentConfig) => new Agent(config);

// Create individual tasks
export const createTask = (config: TaskConfig) => new Task(config);

// Create team
export const createComponentTeam = (config: TeamConfig) => new Team(config);
