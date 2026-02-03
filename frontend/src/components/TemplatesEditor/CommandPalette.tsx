/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
*/

import React, { useState } from 'react';
import {Copy, FileText, Play, RotateCcw, Save, Search, Terminal} from 'lucide-react';

/**
 * Props for the CommandPalette component.
 */
export interface CommandPaletteProps {
  /** Whether the command palette is currently open. */
  isOpen: boolean;

  /** Callback to close the command palette. */
  onClose(): void;

  /** Callback when a command is selected. */
  onSelect(action: string): void;
}

const CommandPalette: React.FC<CommandPaletteProps> = (props) => {
  const {isOpen, onClose, onSelect} = props;

  const [search, setSearch] = useState('');

  const commands = [
    {id: 'zen', label: 'Toggle Zen Mode', icon: Terminal, shortcut: '⌘ K'},
    {id: 'run', label: 'Run / Compile Prompt', icon: Play, shortcut: '↵'},
    {id: 'copy', label: 'Copy to Clipboard', icon: Copy, shortcut: '⌘ C'},
    {id: 'reset', label: 'Reset Variables', icon: RotateCcw},
    {id: 'save', label: 'Save Snapshot', icon: Save},
    {id: 'export', label: 'Export as Markdown', icon: FileText},
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div
        className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center border-b border-border px-4">
          <Search size={18} className="text-muted-foreground mr-3"/>
          <input
            autoFocus
            placeholder="Type a command or search..."
            className="flex-1 h-12 bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
          />
          <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">ESC</span>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          <div className="text-xs font-bold text-muted-foreground px-2 py-1.5 uppercase">Actions</div>
          {filtered.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => onSelect(cmd.id)}
              className="w-full flex items-center gap-3 px-2 py-2.5 rounded-md hover:bg-accent text-sm text-left group transition-colors"
            >
              <div
                className="p-1.5 rounded-md bg-muted/50 text-muted-foreground group-hover:text-foreground group-hover:bg-muted">
                <cmd.icon size={14}/>
              </div>
              <span className="flex-1 font-medium">{cmd.label}</span>
              {cmd.shortcut && (
                <span className="text-xs text-muted-foreground font-mono">{cmd.shortcut}</span>
              )}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">No commands found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
