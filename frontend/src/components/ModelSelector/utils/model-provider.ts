
import React from 'react';
import {
  Award,
  Brain,
  Check,
  Code,
  Cpu,
  Database,
  DollarSign,
  Eye,
  EyeOff,
  Gamepad,
  Gavel,
  Globe,
  Infinity as InfinityIcon,
  Layers,
  Lock,
  MessageSquare,
  Palette,
  Server,
  ServerCrash,
  Shield,
  Smartphone,
  Sparkles,
  Table,
  Tablet,
  Target,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react';

// types
import type {AIModel} from '~/types';

/**
 * Comprehensive tag inference function that analyzes model properties
 * and returns relevant tags based on capabilities, performance, and use cases
 * @param {AIModel} model - The AI model to analyze
 * @returns {Array<{icon: React.ElementType, text: string, color: string}>} Array of inferred tags
 */
export const inferTags = (model: AIModel): Array<{ icon: React.ElementType, text: string, color: string }> => {
  // Initialize tags array with explicit typing
  const tags: Array<{ icon: React.ElementType, text: string, color: string }> = [];

  // Parse model properties
  const d = model.description.toLowerCase();
  const n = model.name.toLowerCase();
  const size = parseFloat(model.size.replace(/[^0-9.]/g, '')) || 0;
  const isLargeModel = size >= 70;
  const isSmallModel = size < 1;
  const isMediumModel = size >= 1 && size < 7;

  // 🎯 Capability Tags
  if (d.includes('chat') || d.includes('conversation') || n.includes('chat')) {
    tags.push({
      icon: MessageSquare,
      text: 'Chat Optimized',
      color: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    });
  }

  if (d.includes('code') || d.includes('programming') || n.includes('code') || n.includes('coder')) {
    tags.push({
      icon: Code,
      text: 'Code Capable',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    });
  }

  if (d.includes('reasoning') || d.includes('logic') || d.includes('thinking')) {
    tags.push({
      icon: Brain,
      text: 'Reasoning',
      color: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    });
  }

  if (d.includes('vision') || d.includes('image') || d.includes('multimodal') || n.includes('vision')) {
    tags.push({
      icon: Eye,
      text: 'Vision Enabled',
      color: 'bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
    });
  }

  if (d.includes('audio') || d.includes('speech') || d.includes('transcribe')) {
    tags.push({
      icon: MessageSquare,
      text: 'Audio Ready',
      color: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    });
  }

  if (d.includes('text') && d.includes('generation')) {
    tags.push({
      icon: Sparkles,
      text: 'Text Generation',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    });
  }

  // 🚀 Performance Tags
  if (d.includes('fast') || d.includes('speed') || d.includes('quick') || n.includes('fast')) {
    tags.push({
      icon: Zap,
      text: 'High Speed',
      color: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    });
  }

  if (d.includes('low latency') || d.includes('real-time')) {
    tags.push({
      icon: TrendingUp,
      text: 'Real-time',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
    });
  }

  if (d.includes('batch') || d.includes('batch processing')) {
    tags.push({
      icon: Server,
      text: 'Batch Processing',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
    });
  }

  // 📏 Context Window Tags
  if (model.contextLength >= 1000000) {
    tags.push({
      icon: InfinityIcon,
      text: '1M+ Context',
      color: 'bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800',
    });
  }

  if (model.contextLength >= 128000) {
    tags.push({
      icon: Layers,
      text: '128k Context',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    });
  }

  if (model.contextLength >= 64000) {
    tags.push({
      icon: Database,
      text: '64k Context',
      color: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    });
  }

  if (model.contextLength >= 32768) {
    tags.push({
      icon: Layers,
      text: '32k Context',
      color: 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-800',
    });
  }

  if (model.contextLength >= 8192) {
    tags.push({
      icon: Layers,
      text: '8k Context',
      color: 'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
    });
  }

  // 🏗️ Architecture Tags
  if (d.includes('transformer') || d.includes('attention')) {
    tags.push({
      icon: Cpu,
      text: 'Transformer',
      color: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
    });
  }

  if (d.includes('rnn') || d.includes('lstm') || d.includes('recurrent')) {
    tags.push({
      icon: Workflow,
      text: 'Recurrent',
      color: 'bg-lime-50 text-lime-600 border-lime-200 dark:bg-lime-900/20 dark:text-lime-300 dark:border-lime-800',
    });
  }

  if (d.includes('code transformer') || d.includes('code model')) {
    tags.push({
      icon: Code,
      text: 'Code Specialized',
      color: 'bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800',
    });
  }

  // 🎨 Usage & Specialization Tags
  if (d.includes('research') || d.includes('academic')) {
    tags.push({
      icon: Target,
      text: 'Research Grade',
      color: 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800',
    });
  }

  if (d.includes('creative') || d.includes('creative writing') || d.includes('storytelling')) {
    tags.push({
      icon: Palette,
      text: 'Creative',
      color: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200 dark:bg-fuchsia-900/20 dark:text-fuchsia-300 dark:border-fuchsia-800',
    });
  }

  if (d.includes('enterprise') || d.includes('business')) {
    tags.push({
      icon: Shield,
      text: 'Enterprise',
      color: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    });
  }

  if (d.includes('assistant') || d.includes('helper')) {
    tags.push({
      icon: MessageSquare,
      text: 'Assistant',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
    });
  }

  if (d.includes('agentic') || d.includes('agent')) {
    tags.push({
      icon: Workflow,
      text: 'Agentic',
      color: 'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
    });
  }

  if (d.includes('retrieval') || d.includes('rag') || d.includes('knowledge')) {
    tags.push({
      icon: Database,
      text: 'RAG Ready',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
    });
  }

  if (d.includes('summarization') || d.includes('summary')) {
    tags.push({
      icon: Sparkles,
      text: 'Summarization',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    });
  }

  if (d.includes('translation') || d.includes('translat')) {
    tags.push({
      icon: Globe,
      text: 'Translation',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    });
  }

  if (d.includes('classification') || d.includes('classify')) {
    tags.push({
      icon: Target,
      text: 'Classification',
      color: 'bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
    });
  }

  if (d.includes('extraction') || d.includes('extract')) {
    tags.push({
      icon: Database,
      text: 'Data Extraction',
      color: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    });
  }

  if (d.includes('tabular') || d.includes('data')) {
    tags.push({
      icon: Table,
      text: 'Data Heavy',
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-800',
    });
  }

  // 📊 Size & Performance Tags
  if (isLargeModel) {
    tags.push({
      icon: Layers,
      text: 'Large Model',
      color: 'bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800',
    });
  }

  if (isMediumModel) {
    tags.push({
      icon: Layers,
      text: 'Medium Model',
      color: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    });
  }

  if (isSmallModel) {
    tags.push({
      icon: Cpu,
      text: 'Small Model',
      color: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    });
  }

  if (d.includes('quantized') || d.includes('distilled') || d.includes('optimized')) {
    tags.push({
      icon: Cpu,
      text: 'Optimized',
      color: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    });
  }

  // 💰 Cost & Accessibility Tags
  if (d.includes('free') || d.includes('open source') || d.includes('opensource') || d.includes('no cost')) {
    tags.push({
      icon: Award,
      text: 'Free',
      color: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    });
  }

  if (d.includes('api') || d.includes('cloud')) {
    tags.push({
      icon: Server,
      text: 'API Access',
      color: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    });
  }

  if (d.includes('local') || d.includes('self-hosted')) {
    tags.push({
      icon: Lock,
      text: 'Self-hosted',
      color: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    });
  }

  if (d.includes('offline') || d.includes('unavailable online')) {
    tags.push({
      icon: EyeOff,
      text: 'Offline',
      color: 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
    });
  }

  // 🎯 Use Case Tags
  if (d.includes('developer') || d.includes('developer tools')) {
    tags.push({
      icon: Code,
      text: 'Developer Focused',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    });
  }

  if (d.includes('educational') || d.includes('educator')) {
    tags.push({
      icon: MessageSquare,
      text: 'Educational',
      color: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    });
  }

  if (d.includes('medical') || d.includes('healthcare')) {
    tags.push({
      icon: Shield,
      text: 'Medical Grade',
      color: 'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
    });
  }

  if (d.includes('legal') || d.includes('law')) {
    tags.push({
      icon: Gavel,
      text: 'Legal Grade',
      color: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    });
  }

  if (d.includes('finance') || d.includes('financial')) {
    tags.push({
      icon: DollarSign,
      text: 'Financial Grade',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
    });
  }

  if (d.includes('gaming') || d.includes('game')) {
    tags.push({
      icon: Gamepad,
      text: 'Gaming',
      color: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    });
  }

  // 🔄 Availability & Status Tags
  if (d.includes('deprecated') || d.includes('retired') || d.includes('end of life')) {
    tags.push({
      icon: ServerCrash,
      text: 'Deprecated',
      color: 'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    });
  }

  if (d.includes('beta') || d.includes('experimental')) {
    tags.push({
      icon: Sparkles,
      text: 'Beta',
      color: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    });
  }

  if (d.includes('stable') || d.includes('production')) {
    tags.push({
      icon: Check,
      text: 'Stable',
      color: 'bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    });
  }

  if (d.includes('experimental') || d.includes('research')) {
    tags.push({
      icon: Award,
      text: 'Research',
      color: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
    });
  }

  if (d.includes('proprietary') || d.includes('closed source')) {
    tags.push({
      icon: Lock,
      text: 'Proprietary',
      color: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    });
  }

  // 📱 Platform Tags
  if (d.includes('browser') || d.includes('web')) {
    tags.push({
      icon: Globe,
      text: 'Browser-based',
      color: 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-800',
    });
  }

  if (d.includes('mobile') || d.includes('smartphone') || n.includes('phone')) {
    tags.push({
      icon: Smartphone,
      text: 'Mobile Ready',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    });
  }

  if (d.includes('table') || d.includes('tablet')) {
    tags.push({
      icon: Tablet,
      text: 'Tablet Ready',
      color: 'bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300 dark:border-teal-800',
    });
  }

  // 🎭 Default/General Tags
  if (tags.length === 0) {
    tags.push({
      icon: Shield,
      text: 'General Purpose',
      color: 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
    });
  }

  // Return at most 4 tags to avoid UI clutter
  return tags.slice(0, 4);
};

/**
 * Helper function to format large context lengths for display
 * @param {number} n - The context length in tokens
 * @returns {string} Formatted string (e.g., "128k", "64k", "8k")
 */
export const formatContext = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
  if (n >= 100000) return `${(n / 1000).toFixed(0)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return n.toString();
};
