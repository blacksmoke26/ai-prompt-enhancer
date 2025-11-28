import axios, { AxiosInstance } from 'axios';
import { PromptRequest, PromptResponse, AIModel } from '../types';

export abstract class BaseAIProvider {
  protected client: AxiosInstance;
  protected name: string;

  constructor(name: string, baseURL: string, timeout: number = 30000) {
    this.name = name;
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  abstract getModels(): Promise<AIModel[]>;
  abstract enhancePrompt(request: PromptRequest): Promise<PromptResponse>;
  abstract isAvailable(): Promise<boolean>;

  protected calculateProcessingTime(startTime: number): number {
    return Date.now() - startTime;
  }
}