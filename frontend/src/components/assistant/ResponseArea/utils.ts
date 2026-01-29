/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {ResolveTheme} from '~/components/ThemeProvider';

export interface ThemeColors {
  background: string;
  foreground: string;
  muted: string;
  border: string;
  primary: string;
  accent: string;
  card: string;
  backgroundRgb: string;
  foregroundRgb: string;
}

export const THEME_COLORS: Record<ResolveTheme, ThemeColors> = {
  dark: {
    background: '#0f172a',
    foreground: '#fafafa',
    muted: '#71717a',
    border: '#27272a',
    primary: '#3b82f6',
    accent: '#60a5fa',
    card: '#18181b',
    backgroundRgb: '15, 23, 42',
    foregroundRgb: '250, 250, 250',
  },
  light: {
    background: '#f8fafc',
    foreground: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
    primary: '#2563eb',
    accent: '#3b82f6',
    card: '#ffffff',
    backgroundRgb: '248, 250, 252',
    foregroundRgb: '15, 23, 42',
  },
};

export const styles = `
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .animate-blink { animation: blink 1s step-end infinite; }  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(128,128,128,0.1), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite linear;
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-up { animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
    50% { box-shadow: 0 0 15px 0 rgba(59, 130, 246, 0.3); }
  }
  .animate-pulse-glow { animation: pulseGlow 2s infinite; }
  
  .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background-color: hsl(240 5% 25%); border-radius: 4px; border: 2px solid transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: hsl(240 5% 35%); }
  .custom-scrollbar { scrollbar-width: thin; scrollbar-color: hsl(240 5% 25%) transparent; }
  
  .glass-panel {
    background: rgba(var(--bg-rgb), 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(var(--fg-rgb), 0.1);
  }
  
  .glass-header {
    background: rgba(var(--bg-rgb), 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
  }
`;
