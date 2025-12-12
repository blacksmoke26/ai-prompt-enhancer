/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

export const providers: { name: string; baseUrl: string; [key: string]: any; }[] = [
  {name: 'ollama', baseUrl: 'http://localhost:11434', timeout: 30000},
  {name: 'openai', baseUrl: 'https://api.openai.com/v1', apiKey: ''},
  {name: 'openrouter', baseUrl: 'https://openrouter.ai/api/v1', apiKey: ''},
  {name: 'deepseek', baseUrl: 'https://api.deepseek.com', apiKey: ''},
  {name: 'coze', baseUrl: 'https://api.coze.cn', apiKey: ''},
  {name: 'qianfan', baseUrl: 'https://aip.baidubce.com', apiKey: ''},
  {name: 'gemini', baseUrl: 'https://generativelanguage.googleapis.com/v1beta', apiKey: ''},
  {name: 'kimi', baseUrl: 'https://api.moonshot.cn', apiKey: ''},
  {name: 'groq', baseUrl: 'https://api.groq.com', apiKey: ''},
  {name: 'anthropic', baseUrl: 'https://api.anthropic.com', apiKey: ''},
  {name: 'mistral', baseUrl: 'https://api.mistral.ai', apiKey: ''},
  {name: 'nvidia', baseUrl: 'https://api.nvidia.com', apiKey: ''},
  {name: 'cohere', baseUrl: 'https://api.cohere.ai', apiKey: ''},
  {name: 'cody', baseUrl: 'https://sourcegraph.com', apiKey: ''},
  {name: 'xai', baseUrl: 'https://api.x.ai', apiKey: ''},
  {name: 'huggingface', baseUrl: 'https://api-inference.huggingface.co/models', apiKey: ''},
  {name: 'siliconflow', baseUrl: 'https://api.siliconflow.cn', apiKey: ''},
  {name: 'zhipu', baseUrl: 'https://open.bigmodel.cn', apiKey: ''},
  {name: 'qwen', baseUrl: 'https://dashscope.aliyuncs.com', apiKey: ''},
];
