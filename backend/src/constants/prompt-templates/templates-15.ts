/**
 * Fastify Decorators
 * @Author: Junaid Atari junaid.attari@invozone.dev
 * @Date: 2025-02-06 13:46:59
 */

import type { PromptTemplate } from './types';

const promptTemplates: PromptTemplate[] = [
  {
    title: 'Generate Executive Summary',
    description:
      'Create comprehensive generate executive summary with best practices and expert guidance',
    category: 'business',
    tags: [
      'executive',
      'summary',
      'report',
      'proposal',
      'strategy',
      'generator',
    ],
    tools: [],
    content:
      'Generate a professional generate executive summary.\\n\\nContext: {{context}}\\n\\nRequirements:\\n{{requirements}}\\n\\nInclude:\\n1. Overview and objectives\\n2. Step-by-step instructions\\n3. Best practices\\n4. Examples and templates\\n5. Common pitfalls to avoid\\n6. Tools and resources\\n7. Quality checklists\\n8. Next steps',
    variables: [
      {
        name: 'context',
        description: 'Context or background information',
        type: 'string',
        required: true,
      },
      {
        name: 'requirements',
        description: 'Specific requirements or constraints',
        type: 'string',
        required: true,
      },
      {
        name: 'tone',
        description: 'Desired tone or style',
        type: 'select',
        required: false,
        options: ['professional', 'casual', 'technical', 'formal'],
        defaultValue: 'professional',
      },
      {
        name: 'format',
        description: 'Output format',
        type: 'select',
        required: false,
        options: ['Markdown', 'HTML', 'PDF', 'JSON'],
        defaultValue: 'Markdown',
      },
      {
        name: 'deadline',
        description: 'Project deadline',
        type: 'string',
        required: false,
      },
      {
        name: 'budget',
        description: 'Budget constraints',
        type: 'string',
        required: false,
      },
      {
        name: 'stakeholders',
        description: 'Key stakeholders',
        type: 'string',
        required: false,
      },
    ],
  },
  {
    title: 'Generate Email Campaign',
    description:
      'Create comprehensive generate email campaign with best practices and expert guidance',
    category: 'marketing',
    tags: ['email', 'social-media', 'content', 'campaign', 'seo', 'creator'],
    tools: [],
    content:
      'Generate a professional generate email campaign.\\n\\nContext: {{context}}\\n\\nRequirements:\\n{{requirements}}\\n\\nInclude:\\n1. Overview and objectives\\n2. Step-by-step instructions\\n3. Best practices\\n4. Examples and templates\\n5. Common pitfalls to avoid\\n6. Tools and resources\\n7. Quality checklists\\n8. Next steps',
    variables: [
      {
        name: 'context',
        description: 'Context or background information',
        type: 'string',
        required: true,
      },
      {
        name: 'requirements',
        description: 'Specific requirements or constraints',
        type: 'string',
        required: true,
      },
      {
        name: 'tone',
        description: 'Desired tone or style',
        type: 'select',
        required: false,
        options: ['professional', 'casual', 'technical', 'formal'],
        defaultValue: 'professional',
      },
      {
        name: 'format',
        description: 'Output format',
        type: 'select',
        required: false,
        options: ['Markdown', 'HTML', 'PDF', 'JSON'],
        defaultValue: 'Markdown',
      },
      {
        name: 'target_audience',
        description: 'Target audience',
        type: 'string',
        required: true,
      },
      {
        name: 'campaign_goal',
        description: 'Campaign objective',
        type: 'string',
        required: true,
      },
      {
        name: 'channels',
        description: 'Marketing channels',
        type: 'string',
        required: false,
      },
    ],
  },
  {
    title: 'Generate API Endpoint',
    description:
      'Create comprehensive generate api endpoint with best practices and expert guidance',
    category: 'web-dev',
    tags: ['api', 'frontend', 'backend', 'fullstack', 'react', 'builder'],
    tools: [],
    content:
      'Generate a professional generate api endpoint.\\n\\nContext: {{context}}\\n\\nRequirements:\\n{{requirements}}\\n\\nInclude:\\n1. Overview and objectives\\n2. Step-by-step instructions\\n3. Best practices\\n4. Examples and templates\\n5. Common pitfalls to avoid\\n6. Tools and resources\\n7. Quality checklists\\n8. Next steps',
    variables: [
      {
        name: 'context',
        description: 'Context or background information',
        type: 'string',
        required: true,
      },
      {
        name: 'requirements',
        description: 'Specific requirements or constraints',
        type: 'string',
        required: true,
      },
      {
        name: 'tone',
        description: 'Desired tone or style',
        type: 'select',
        required: false,
        options: ['professional', 'casual', 'technical', 'formal'],
        defaultValue: 'professional',
      },
      {
        name: 'format',
        description: 'Output format',
        type: 'select',
        required: false,
        options: ['Markdown', 'HTML', 'PDF', 'JSON'],
        defaultValue: 'Markdown',
      },
      {
        name: 'framework',
        description: 'Framework or technology',
        type: 'select',
        required: true,
        options: ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Go'],
        defaultValue: 'React',
      },
      {
        name: 'language',
        description: 'Programming language',
        type: 'select',
        required: false,
        options: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust'],
        defaultValue: 'TypeScript',
      },
    ],
  },
  {
    title: 'Generate ML Pipeline',
    description:
      'Create comprehensive generate ml pipeline with best practices and expert guidance',
    category: 'ai-ml',
    tags: [
      'machine-learning',
      'deep-learning',
      'data-science',
      'model',
      'training',
      'designer',
    ],
    tools: [],
    content:
      'Generate a professional generate ml pipeline.\\n\\nContext: {{context}}\\n\\nRequirements:\\n{{requirements}}\\n\\nInclude:\\n1. Overview and objectives\\n2. Step-by-step instructions\\n3. Best practices\\n4. Examples and templates\\n5. Common pitfalls to avoid\\n6. Tools and resources\\n7. Quality checklists\\n8. Next steps',
    variables: [
      {
        name: 'context',
        description: 'Context or background information',
        type: 'string',
        required: true,
      },
      {
        name: 'requirements',
        description: 'Specific requirements or constraints',
        type: 'string',
        required: true,
      },
      {
        name: 'tone',
        description: 'Desired tone or style',
        type: 'select',
        required: false,
        options: ['professional', 'casual', 'technical', 'formal'],
        defaultValue: 'professional',
      },
      {
        name: 'format',
        description: 'Output format',
        type: 'select',
        required: false,
        options: ['Markdown', 'HTML', 'PDF', 'JSON'],
        defaultValue: 'Markdown',
      },
      {
        name: 'dataset',
        description: 'Dataset description',
        type: 'string',
        required: true,
      },
      {
        name: 'model_type',
        description: 'Type of model',
        type: 'select',
        required: true,
        options: [
          'classification',
          'regression',
          'clustering',
          'NLP',
          'computer vision',
        ],
        defaultValue: 'classification',
      },
    ],
  },
  {
    title: 'Generate Security Policy',
    description:
      'Create comprehensive generate security policy with best practices and expert guidance',
    category: 'security',
    tags: [
      'security',
      'incident-response',
      'policy',
      'compliance',
      'audit',
      'analyzer',
    ],
    tools: [],
    content:
      'Generate a professional generate security policy.\\n\\nContext: {{context}}\\n\\nRequirements:\\n{{requirements}}\\n\\nInclude:\\n1. Overview and objectives\\n2. Step-by-step instructions\\n3. Best practices\\n4. Examples and templates\\n5. Common pitfalls to avoid\\n6. Tools and resources\\n7. Quality checklists\\n8. Next steps',
    variables: [
      {
        name: 'context',
        description: 'Context or background information',
        type: 'string',
        required: true,
      },
      {
        name: 'requirements',
        description: 'Specific requirements or constraints',
        type: 'string',
        required: true,
      },
      {
        name: 'tone',
        description: 'Desired tone or style',
        type: 'select',
        required: false,
        options: ['professional', 'casual', 'technical', 'formal'],
        defaultValue: 'professional',
      },
      {
        name: 'format',
        description: 'Output format',
        type: 'select',
        required: false,
        options: ['Markdown', 'HTML', 'PDF', 'JSON'],
        defaultValue: 'Markdown',
      },
      {
        name: 'threat_level',
        description: 'Threat level',
        type: 'select',
        required: false,
        options: ['low', 'medium', 'high', 'critical'],
        defaultValue: 'medium',
      },
      {
        name: 'compliance',
        description: 'Compliance requirements',
        type: 'string',
        required: false,
      },
    ],
  },
];

export default promptTemplates;
