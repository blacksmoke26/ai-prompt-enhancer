

# ResponseArea Component: Ultimate Integration Guide

This guide provides a comprehensive roadmap to integrate the **ResponseArea** component into your React application. It covers setup, state management, data handling, and multiple real-world usage scenarios ranging from static display to complex streaming LLM integrations.

---

## 📦 Phase 1: Prerequisites & Installation

Ensure your project is set up with the necessary dependencies.

### 1. Install Dependencies
The `ResponseArea` relies on `lucide-react` for icons, `streamdown` for markdown rendering, and utility libraries.

```bash
npm install lucide-react streamdown @excalidraw/markdown-to-text clsx tailwind-merge
# or
yarn add lucide-react streamdown @excalidraw/markdown-to-text clsx tailwind-merge
```

### 2. Required UI Components
The component assumes a set of base UI components (Buttons, Popovers, Tooltips) exist in your project. If you are using **shadcn/ui**, ensure you have installed:
*   `Button`
*   `Popover`
*   `Tooltip` (renamed to `TooltipMini` in the code)

### 3. Theme & State Management (Zustand)
The component consumes a global `ThemeProvider` and two Zustand stores (`useAppStore`, `useDataStore`).

**Minimal `stores/appStore.ts` Example:**
```typescript
import { create } from 'zustand';

interface AppConfig {
  userRole: string;
  model: string;
  setUserRole: (role: string) => void;
  setModel: (model: string) => void;
}

export const useAppStore = create<AppConfig>((set) => ({
  userRole: 'general',
  model: 'gpt-4',
  setUserRole: (role) => set({ userRole: role }),
  setModel: (model) => set({ model }),
}));
```

**Minimal `stores/dataStore.ts` Example:**
```typescript
import { create } from 'zustand';

interface DataConfig {
  userRoles: { id: string; name: string; key: string }[];
  setUserRoles: (roles: any[]) => void;
}

export const useDataStore = create<DataConfig>((set) => ({
  userRoles: [],
  setUserRoles: (roles) => set({ userRoles: roles }),
}));
```

---

## 🧩 Phase 2: Types & Interfaces

Create a shared types file to ensure data consistency between your backend, stores, and the component.

**File: `types/chat.ts`**

```typescript
export interface PromptHistory {
  id: string;
  aiPrompt: string;
  originalPrompt: string;
  enhancedPrompt: string;
  model: string;
  enhancementType: string;
  userRole: string;
  systemPrompt?: string;
  provider?: string;
  timestamp: Date;
  tokensUsed?: number;
  processingTime: number;
  temperature?: number;
  maxTokens?: number;
  rating: number;
  notes: string | null;
  targetAudience?: string | null;
  tone?: string | null;
  responseLength?: string | null;
  customInstructions?: string | null;
  format?: 'markdown' | 'text' | 'html' | 'json' | null;
  metadata?: Record<string, any> | null;
  stats: {
    textData: { name: string; value: number }[];
    tokenStats: { name: string; value: number; fill: string }[];
  };
  pinned?: boolean;
  variants?: string[];
  variantIndex?: number;
}

export interface ChatMessage extends PromptHistory {
  role: 'user' | 'assistant' | 'system';
}
```

---

## 🔧 Phase 3: The "Controller" Parent Component

The `ResponseArea` is a "dumb" component (mostly presentational). It requires a parent "Controller" to handle business logic, API calls, and state updates.

### Example 1: Basic Integration
A minimal implementation with static data.

```tsx
import React from 'react';
import ResponseArea from '~/components/ResponseArea';
import { ChatMessage } from '~/types/chat';

const BasicChat = () => {
  const [messages] = React.useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      aiPrompt: 'Welcome to the system.',
      originalPrompt: '',
      enhancedPrompt: '',
      model: 'gpt-4',
      enhancementType: '',
      userRole: 'system',
      timestamp: new Date(),
      processingTime: 0,
      rating: 5,
      notes: null,
      stats: {
        textData: [{ name: 'Words', value: 4 }],
        tokenStats: []
      }
    }
  ]);

  return (
    <div className="h-screen w-full bg-slate-950 text-white">
      <ResponseArea
        content=""
        messages={messages}
        isLoading={false}
        isStreaming={false}
        isWide={false}
        isFullScreen={false}
        onCopy={(text) => navigator.clipboard.writeText(text)}
        onDownload={(text) => console.log('Downloading', text)}
        toggleWidth={() => console.log('Toggle Width')}
        toggleFullScreen={() => console.log('Toggle Fullscreen')}
      />
    </div>
  );
};
```

### Example 2: Real-World Chat with Streaming
This example demonstrates connecting to an AI backend (e.g., OpenAI).

```tsx
import React, { useState, useRef, useCallback } from 'react';
import { generateId } from '~/utils/helpers';
import { ChatMessage } from '~/types/chat';
import ResponseArea from '~/components/ResponseArea';

const AIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamContent, setStreamContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 1. Handle Stream Stop
  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      
      // Save partial content
      if (streamContent) {
        const partialMsg: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          aiPrompt: streamContent,
          // ... other required fields (see full interface)
          originalPrompt: '',
          enhancedPrompt: '',
          model: 'gpt-4',
          enhancementType: '',
          userRole: 'ai',
          timestamp: new Date(),
          processingTime: 0,
          rating: 0,
          notes: 'Partial Response',
          stats: { textData: [], tokenStats: [] }
        };
        setMessages(prev => [...prev, partialMsg]);
        setStreamContent('');
      }
    }
  };

  // 2. Fetch from API
  const generateResponse = async (userInput: string) => {
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      aiPrompt: userInput,
      // ... fill standard fields
      originalPrompt: userInput,
      enhancedPrompt: userInput,
      model: 'user-input',
      enhancementType: 'user',
      userRole: 'user',
      timestamp: new Date(),
      processingTime: 0,
      rating: 0,
      notes: null,
      stats: { textData: [], tokenStats: [] }
    };

    setMessages(prev => [...prev, userMsg]);
    setIsStreaming(true);
    setStreamContent('');
    setIsLoading(true);

    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: userInput }),
        signal: abortControllerRef.current.signal
      });

      // Handle Streaming Body
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          // Update streaming buffer
          setStreamContent(prev => prev + chunk);
        }
      }
    } catch (error) {
      console.error("Stream failed", error);
      setIsStreaming(false);
    } finally {
      setIsStreaming(false);
      setIsLoading(false);
      
      // Commit final message
      const finalMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        aiPrompt: streamContent,
        // ... fill fields ...
        originalPrompt: '',
        enhancedPrompt: streamContent,
        model: 'gpt-4',
        enhancementType: 'stream',
        userRole: 'ai',
        timestamp: new Date(),
        processingTime: 1500,
        rating: 0,
        notes: null,
        stats: { textData: [], tokenStats: [] }
      };
      setMessages(prev => [...prev, finalMsg]);
      setStreamContent('');
    }
  };

  // 3. Handle Message Actions
  const handleRegenerate = async () => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === 'assistant') {
      // Remove last and retry (logic depends on your backend)
      setMessages(prev => prev.slice(0, -1));
      // Trigger regeneration logic...
    }
  };

  return (
    <div className="h-screen w-full bg-slate-950 text-white p-4">
      <div className="max-w-4xl mx-auto h-full">
        <ResponseArea
          content={streamContent}
          messages={messages}
          isLoading={isLoading}
          isStreaming={isStreaming}
          isWide={false}
          isFullScreen={false}
          onCopy={(text) => navigator.clipboard.writeText(text)}
          onDownload={(text) => {
             const blob = new Blob([text], {type: 'text/markdown'});
             const url = URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             a.download = 'chat.md';
             a.click();
          }}
          toggleWidth={() => console.log('toggled')}
          toggleFullScreen={() => console.log('toggled')}
          onStopStream={handleStopStream}
          onRegenerate={handleRegenerate}
          onClearHistory={() => setMessages([])}
          // Implementing editing
          onEditMessage={(id, newContent) => {
             setMessages(prev => prev.map(m => m.id === id ? {...m, aiPrompt: newContent} : m));
          }}
          onDeleteMessage={(id) => {
             setMessages(prev => prev.filter(m => m.id !== id));
          }}
          onRateMessage={(id, rating) => {
             setMessages(prev => prev.map(m => m.id === id ? {...m, rating} : m));
          }}
          onPinMessage={(id, isPinned) => {
             setMessages(prev => {
                const target = prev.find(m => m.id === id);
                if(!target) return prev;
                const others = prev.filter(m => m.id !== id);
                return isPinned ? [{...target, pinned: true}, ...others] : [...others, {...target, pinned: false}];
             });
          }}
          onSwitchVariant={(msgId, newIndex) => {
             setMessages(prev => prev.map(m => {
                if(m.id === msgId && m.variants) {
                   return {...m, aiPrompt: m.variants[newIndex], variantIndex: newIndex};
                }
                return m;
             }));
          }}
        />
      </div>
    </div>
  );
};
```

---

## 🚀 Phase 4: Advanced Usage Scenarios

### Scenario 1: Implementing "Smart" Editing
When the user edits a message via the UI, you might want to re-generate the *next* message in the chain.

```tsx
// Inside Parent Component
const handleEditMessage = async (id: string, newContent: string) => {
  // 1. Update the UI immediately
  setMessages(prev => prev.map(m => m.id === id ? { ...m, aiPrompt: newContent } : m));

  // 2. If editing a USER message, regenerate the assistant response
  const msgIndex = messages.findIndex(m => m.id === id);
  if (msgIndex !== -1 && messages[msgIndex].role === 'user') {
     // Logic to delete subsequent AI messages and regenerate them
     const messagesAfter = messages.slice(msgIndex + 1);
     const updated = messages.slice(0, msgIndex + 1); // Keep up to the edited user msg
     setMessages(updated);
     
     // Trigger AI generation again with newContent
     await triggerAIResponse(newContent);
  }
};
```

### Scenario 2: Handling Message Variants (A/B Testing)
The `ResponseArea` supports variants via a carousel. You can fetch these from your backend or generate them locally.

```tsx
// Mocking variants on message creation
const createVariants = (originalText: string) => {
  return [
    originalText,
    `Summarized: ${originalText.substring(0, 50)}...`,
    `Professional Tone: ${originalText.replace(/!/g, '.')}`
  ];
};

// When creating the message object
const assistantMessage: ChatMessage = {
  // ... standard fields
  aiPrompt: "Original response...",
  variants: createVariants("Original response..."), // Inject variants
  variantIndex: 0
};
```

### Scenario 3: Persistent State & Search
The component has a built-in search. To make it robust, implement filtering logic in the parent and pass the filtered list to `ResponseArea`.

```tsx
const ChatWithSearch = () => {
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = useMemo(() => {
    if (!searchQuery) return allMessages;
    return allMessages.filter(m => 
      m.aiPrompt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allMessages, searchQuery]);

  return (
    <ResponseArea
       // Pass filtered messages!
       messages={filteredMessages}
       // ...other props
    />
  );
};
```

### Scenario 4: Full "Kitchen Sink" Integration
This example implements every single callback to verify functionality.

```tsx
const KitchenSinkApp = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [content, setContent] = useState('');

  // Helper to create messages
  const msg = (role: 'user'|'assistant', text: string): ChatMessage => ({
    id: Math.random().toString(),
    role,
    aiPrompt: text,
    originalPrompt: text,
    enhancedPrompt: text,
    model: 'test',
    enhancementType: 'test',
    userRole: 'dev',
    timestamp: new Date(),
    processingTime: 100,
    rating: 0,
    notes: null,
    stats: { textData: [], tokenStats: [] },
    pinned: false,
    variants: role === 'user' ? ['Var 1', 'Var 2'] : undefined
  });

  return (
    <ResponseArea
      content={content}
      messages={messages}
      isLoading={false}
      isStreaming={streaming}
      isWide={false}
      isFullScreen={false}
      
      // 1. Basic IO
      onCopy={(text) => alert(`Copied: ${text.length} chars`)}
      onDownload={(text) => alert(`Downloaded: ${text.length} chars`)}
      
      // 2. Layout
      toggleWidth={() => alert('Width Toggled')}
      toggleFullScreen={() => alert('FS Toggled')}
      
      // 3. Stream Control
      onStopStream={() => { setStreaming(false); setContent(''); }}
      
      // 4. Message Manipulation
      onRegenerate={() => {
        setMessages(prev => [...prev.slice(0, -1), msg('assistant', 'Regenerated!')]);
      }}
      onEditMessage={(id, newContent) => {
        setMessages(prev => prev.map(m => m.id === id ? {...m, aiPrompt: newContent} : m));
        alert(`Edited ID: ${id}`);
      }}
      onDeleteMessage={(id) => {
        setMessages(prev => prev.filter(m => m.id !== id));
        alert(`Deleted ID: ${id}`);
      }}
      onClearHistory={() => { setMessages([]); }}
      
      // 5. Ratings & Pins
      onRateMessage={(id, rating) => {
        setMessages(prev => prev.map(m => m.id === id ? {...m, rating} : m));
        console.log(`Rated ${id} as ${rating}`);
      }}
      onPinMessage={(id, pinned) => {
        setMessages(prev => {
           const target = prev.find(m => m.id === id);
           if(!target) return prev;
           const others = prev.filter(m => m.id !== id);
           return pinned ? [{...target, pinned}, ...others] : [...others, {...target, pinned: false}];
        });
      }}
      
      // 6. Variants
      onSwitchVariant={(id, index) => {
        setMessages(prev => prev.map(m => {
           if(m.id === id && m.variants) return {...m, aiPrompt: m.variants[index], variantIndex: index};
           return m;
        }));
      }}
    />
  );
};
```

---

## 🐛 Troubleshooting Common Issues

### 1. Scrolling Issues
*   **Problem:** Content scrolls behind the header or top bar disappears.
*   **Solution:** Ensure the parent container of `ResponseArea` has `flex-col` and `overflow-hidden`. The `ResponseArea` itself manages internal flex layout (`flex-col`), but it needs a constrained parent.

### 2. Theme Not Applying
*   **Problem:** Icons or text color are stuck on one theme.
*   **Solution:** Verify that your `ThemeProvider` wraps the `ResponseArea`. The component calls `useTheme()` inside; if there is no provider, it will crash or fallback to default.

### 3. Markdown Not Rendering
*   **Problem:** Raw markdown text displays instead of HTML.
*   **Solution:** Ensure `streamdown` is installed and imported correctly. Check that the `shikiTheme` prop passed to `Streamdown` matches the available themes (e.g., `'github-dark'`, `'github-light'`).

### 4. Z-Index Conflicts
*   **Problem:** Popovers or tooltips are hidden behind other elements.
*   **Solution:** The component uses `z-50` for floating elements. Ensure your surrounding application does not use higher z-indexes for navigation bars or modals that might overlap.

---

## 📝 Conclusion
The `ResponseArea` is designed to be a "drop-in" replacement for standard chat interfaces while providing enterprise-grade features like analytics, variant testing, and deep customization.

By following the **Controller Pattern** (Parent handles state -> Child renders), you get maximum flexibility to hook into any AI backend (OpenAI, Anthropic, LocalLLMs) or static data source without rewriting the UI component.
