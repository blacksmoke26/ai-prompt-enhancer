import React from 'react';
import {Button, Theme} from '@radix-ui/themes';
import {AdvancedTextarea} from './index';
import {FileJson} from 'lucide-react';

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */
const Examples = () => {
  const [code, setCode] = React.useState('function hello() {\n  console.log("Hi");\n}');
  const [notes, setNotes] = React.useState('');
  const [json, setJson] = React.useState('');

  return (
    <Theme accentColor="indigo">
      <div className="p-10 max-w-4xl mx-auto space-y-12 bg-gray-50 min-h-screen">

        {/* 1. Code Editor (Tab Support, Monospaced, Soft Variant) */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Code Editor</h2>
          <p className="text-sm text-gray-500">Try pressing Tab to indent. Drag a file here.</p>

          <AdvancedTextarea
            label="Source Code"
            description="Write your code here"
            variant="soft"
            radius="lg"
            size="md"
            jsonMode={false}
            enableTabSupport
            enableDragDrop
            value={code}
            onChange={setCode}
            autoResize={false} // Fixed height
            renderToolbar={(ctx) => (
              <div className="flex gap-1 bg-gray-200 dark:bg-gray-800 rounded p-1">
                <button onClick={ctx.onCopy} className="p-1.5 hover:bg-white dark:hover:bg-black rounded shadow-sm" title="Copy">
                  <FileJson size={14} />
                </button>
                <button onClick={ctx.onClear} className="p-1.5 hover:bg-white dark:hover:bg-black rounded shadow-sm" title="Clear">
                  <span className="text-[10px] font-bold">X</span>
                </button>
              </div>
            )}
          />
        </div>

        {/* 2. Ghost Notes (Minimalist, Large Text) */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Ghost Notes</h2>
          <AdvancedTextarea
            label="Quick Notes"
            variant="ghost"
            size="xl"
            value={notes}
            onChange={(v) => setNotes(v)}
            placeholder="Type something..."
            maxLength={500}
            showCharCount
            suggestions={["Meeting at 5", "Buy milk", "Reply to email"]}
            showCopyButton={false}
            showClearButton={false}
          />
        </div>

        {/* 3. Advanced JSON Toolbar (Custom Render Prop) */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Custom JSON Toolbar</h2>
          <AdvancedTextarea
            label="API Config"
            jsonMode
            enableAutoClosing
            value={json}
            onChange={setJson}
            variant="filled"
            radius="none"
            description="Custom toolbar demonstrating render prop capabilities"
            renderToolbar={(ctx) => (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-6 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                  <div
                    className="absolute left-0 top-0 h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${ctx.maxLength ? (ctx.charCount / ctx.maxLength) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-gray-500">{ctx.charCount} chars</span>
                {ctx.isValidJson && (
                  <Button size="1" color="indigo" onClick={ctx.onFormat} className="cursor-pointer">
                    Format
                  </Button>
                )}
                <Button size="1" variant="soft" color="gray" onClick={ctx.onClear} className="cursor-pointer">
                  Clear
                </Button>
              </div>
            )}
          />
        </div>

      </div>
    </Theme>
  );
};

export default Examples;
