import { Agent, Task } from "kaibanjs";

// Types
export interface AgentConfig {
  name: string;
  role: string;
  goal: string;
  background: string;
  tools?: any[];
}

export interface TaskConfig {
  title: string;
  description: string;
  expectedOutput: string;
  agent: Agent;
}

export interface TeamConfig {
  name: string;
  agents: Agent[];
  tasks: Task[];
  env: { [key: string]: string };
}

// res

export interface LLMUsageStats {
  inputTokens: number;
  outputTokens: number;
  callsCount: number;
  callsErrorCount: number;
  parsingErrors: number;
}

export interface CostDetails {
  costInputTokens: number;
  costOutputTokens: number;
  totalCost: number;
}

export interface Stats {
  startTime: number;
  endTime: number;
  duration: number;
  llmUsageStats: LLMUsageStats;
  iterationCount: number;
  costDetails: CostDetails;
  teamName: string;
  taskCount: number;
  agentCount: number;
}

// Main response interface
export interface AIGenerationResponse {
  status: "FINISHED" | "PENDING" | "ERROR"; // Added other possible states
  result: string; // Contains stringified JSON of the generated code
  stats: Stats;
  filePath: string;
}

// Optional: Interface for the parsed result content
export interface GeneratedResultParsed {
  code: string;
  notes: string;
}

export interface GenerationsInDB {
  resultCode: string;
  notes: string;
  userId: string;
  completedAt: string | null;
  createdAt: string;
  id: string;
}
