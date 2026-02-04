/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// providers
import AmazonBedrockProvider from './AmazonBedrockProvider';
import AnthropicProvider from './AnthropicProvider';
import CodyProvider from './CodyProvider';
import CohereProvider from './CohereProvider';
import CozeProvider from './CozeProvider';
import DeepSeekProvider from './DeepSeekProvider';
import GeminiProvider from './GeminiProvider';
import GroqProvider from './GroqProvider';
import HuggingFaceProvider from './HuggingFaceProvider';
import KimiProvider from './KimiProvider';
import LMStudioProvider from './LMStudioProvider';
import MistralProvider from './MistralProvider';
import NvidiaProvider from './NvidiaProvider';
import OllamaProvider from './OllamaProvider';
import OpenAIProvider from './OpenAIProvider';
import OpenRouterProvider from './OpenRouterProvider';
import QianFanProvider from './QianFanProvider';
import QwenProvider from './QwenProvider';
import SiliconFlowProvider from './SiliconFlowProvider';
import VercelProvider from './VercelProvider';
import XAIProvider from './XAIProvider';
import ZhipuProvider from './ZhipuProvider';

// types
import type {ProviderName} from '~/types/providers';

// provider imports
export const providersClasses: Record<ProviderName | string, new (...args: any[]) => object> = {
  [AmazonBedrockProvider.ProviderID]: AmazonBedrockProvider,
  [AnthropicProvider.ProviderID]: AnthropicProvider,
  [CodyProvider.ProviderID]: CodyProvider,
  [CohereProvider.ProviderID]: CohereProvider,
  [CozeProvider.ProviderID]: CozeProvider,
  [DeepSeekProvider.ProviderID]: DeepSeekProvider,
  [GeminiProvider.ProviderID]: GeminiProvider,
  [GroqProvider.ProviderID]: GroqProvider,
  [HuggingFaceProvider.ProviderID]: HuggingFaceProvider,
  [KimiProvider.ProviderID]: KimiProvider,
  [LMStudioProvider.ProviderID]: LMStudioProvider,
  [MistralProvider.ProviderID]: MistralProvider,
  [NvidiaProvider.ProviderID]: NvidiaProvider,
  [OllamaProvider.ProviderID]: OllamaProvider,
  [OpenAIProvider.ProviderID]: OpenAIProvider,
  [OpenRouterProvider.ProviderID]: OpenRouterProvider,
  [QianFanProvider.ProviderID]: QianFanProvider,
  [QwenProvider.ProviderID]: QwenProvider,
  [SiliconFlowProvider.ProviderID]: SiliconFlowProvider,
  [VercelProvider.ProviderID]: VercelProvider,
  [XAIProvider.ProviderID]: XAIProvider,
  [ZhipuProvider.ProviderID]: ZhipuProvider,
};

export {
  AmazonBedrockProvider,
  AnthropicProvider,
  CodyProvider,
  CohereProvider,
  CozeProvider,
  DeepSeekProvider,
  GeminiProvider,
  GroqProvider,
  HuggingFaceProvider,
  KimiProvider,
  LMStudioProvider,
  MistralProvider,
  NvidiaProvider,
  OllamaProvider,
  OpenAIProvider,
  OpenRouterProvider,
  QianFanProvider,
  QwenProvider,
  SiliconFlowProvider,
  VercelProvider,
  XAIProvider,
  ZhipuProvider,
};
