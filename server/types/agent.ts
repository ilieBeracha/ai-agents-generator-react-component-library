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
