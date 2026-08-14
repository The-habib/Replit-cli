import { ReplInfo } from '../api/types.js';

export interface SyncFileEntry {
  path: string;
  content: string;
  isDir: boolean;
  size: number;
}

export interface SyncResult {
  added: string[];
  updated: string[];
  deleted: string[];
  totalFiles: number;
}

export interface AiMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AiStepResult {
  step: number;
  thought: string;
  action: 'inspect' | 'read' | 'write' | 'exec' | 'finish';
  target?: string;
  content?: string;
  command?: string;
  output?: string;
  isComplete: boolean;
}

export interface AiAgentSession {
  goal: string;
  steps: AiStepResult[];
  summary: string;
  success: boolean;
}
