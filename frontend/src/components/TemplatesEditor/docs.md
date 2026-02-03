

# 📘 The Complete Developer’s Guide to Integrating PromptRunner

Welcome to the definitive guide for integrating **PromptRunner** into your React application. This book covers everything from basic installation to advanced debugging, ensuring you have full control over the component's capabilities.

---

## 📦 Chapter 1: Getting Started

### 1.1 Prerequisites
Before integrating, ensure your environment meets these requirements:

- **React**: Version 18 or higher (supports Hooks).
- **Tailwind CSS**: For styling (or your preferred CSS-in-JS solution).
- **Lucide React**: For icons (`npm install lucide-react`).
- **Radix UI**: For primitives (Select, Switch) used internally (`npm install @radix-ui/react-select`).

### 1.2 Installation
If you are using a package manager:

```bash
npm install lucide-react @radix-ui/react-select clsx tailwind-merge
```

### 1.3 File Structure
We recommend keeping `PromptRunner` and its sub-components in a dedicated directory to keep your imports clean.

```text
src/
├── components/
│   ├── prompt-runner/
│   │   ├── index.tsx        # Main PromptRunner export
│   │   ├── types.ts         # Shared types (PromptTemplate, Variable, PromptStatus)
│   │   └── subcomponents.tsx # (Optional) If you split Header/Drawer/etc.
├── ui/                      # Shadcn/Radix primitives
├── lib/
│   └── utils.ts             # Utility helpers (cn, classnames)
└── pages/
    └── editor.tsx          # Your application page
```

---

## 🚀 Chapter 2: Hello World (The Basics)

### 2.1 The Minimal Setup
The simplest way to use `PromptRunner` is to provide an array of templates and handle the "Execute" event. This initializes the component with a single, centered editor.

**`App.tsx`**
```tsx
import React from 'react';
import { PromptRunner } from '@/components/prompt-runner';
import type { PromptTemplate, Variable } from '@/types';

const App = () => {
  // 1. Define your Data
  const templates: PromptTemplate[] = [
    {
      id: 1,
      title: 'Blog Post Generator',
      description: 'Generate a structured blog post about a given topic.',
      category: 'writing',
      tags: ['seo', 'blog'],
      content: 'Write a blog post about {{topic}} with a {{tone}} tone.',
      variables: [
        { name: 'topic', type: 'string', required: true, placeholder: 'e.g. AI' },
        { name: 'tone', type: 'select', options: ['Professional', 'Casual', 'Excited'], defaultValue: 'Professional' }
      ]
    }
  ];

  // 2. Handle Events
  const handleExecute = (content: string, variables: Record<string, any>) => {
    console.log('--- GENERATED PROMPT ---');
    console.log(content);
    console.log('Variables Used:', variables);
    alert('Check console for output!');
  };

  return (
    <div className="h-screen w-full bg-gray-50">
      <PromptRunner 
        templates={templates}
        onExecuteClick={handleExecute}
        layout="editor-only" // Default mode
      />
    </div>
  );
};

export default App;
```

### 2.2 What just happened?
1.  **Templates**: The component rendered a list of available templates.
2.  **Selection**: Clicking a template populated the editor with its content.
3.  **Execution**: Clicking "Generate Prompt" (or the Drawer button) triggered `onExecuteClick`.
4.  **Injection**: The component replaced `{{topic}}` and `{{tone}}` in the editor content string with the values from the form.

---

## 🎛 Chapter 3: Deep Dive: Configuration

`PromptRunner` is highly configurable. This chapter explains the core props used to shape its behavior.

### 3.1 Template Data (`templates`)
The component does not manage your list of templates; it is **controlled** by the parent. You must pass an array of objects matching the `PromptTemplate` interface.

**Required Fields:**
- `id`: Unique identifier.
- `title`: Display name.
- `category`: Used for filtering/grouping in the Template Selector.
- `content`: The prompt template (supports `{{variableName}}` syntax).
- `variables`: Array of input definitions (see Section 3.2).

**Understanding `Variable`:**
| Property | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Key to match in content | `task_name` |
| `type` | `'string' | 'number' | 'boolean' | 'select' | 'code'` | Input field type | `'select'` |
| `required` | `boolean` | Forces validation | `true` |
| `defaultValue` | `any` | Pre-filled value | `'Hello World'` |
| `group` | `string` | Organizes form sections | `'System'` |
| `showIf` | `Function` | Conditional visibility | `(d) => d.showSecret` |
| `locked` | `boolean` | Read-only state | `true` |

### 3.2 Layout Control (`layout`)
The `layout` prop determines the physical arrangement of the editor, variables, and analytics panels. There are **14+ available modes**:

| Layout Mode | Visual Description | Best For... |
| :--- | :--- | :--- |
| `editor-only` | Clean, centered editor. | Focused writing. |
| `split-horizontal` | Editor Left | Output Right. | Comparing source vs result. |
| `split-vertical` | Editor Top | Output Bottom. | Long prompts with code blocks. |
| `dual-sidebar` | Variables (Left) | Editor (Center) | Analytics (Right). | "Power User" setup. |
| `sidebar-left` | Persistent sidebar on the left. | Apps with configuration. |
| `sidebar-right` | Persistent sidebar on the right. | Apps with history/logs. |
| `layout-top` | Horizontal drawer at top. | "Settings panel" style. |
| `layout-bottom` | Horizontal drawer at bottom. | "Terminal" style. |
| `preview-left` | Preview (Left) | Editor (Right). | Visual-heavy writing. |
| `preview-right` | Editor (Left) | Preview (Right). | Standard "IDE" feel. |
| `bento-grid` | 2x2 Dashboard Grid. | Dashboard views. |
| `focus` | Minimalist layout. | Concentration mode. |
| `presentation` | Full-screen typography. | Reading mode. |
| `zen` | Distraction-free. | "Focus mode". |

### 3.3 Sidebar Control (`variableSidebar`)
Determines how the Variable Form interacts with the main view.
- **`drawer`** (Default): Hidden in a modal until triggered by the "Generate" or "Configure" button.
- **`sidebar-left`**: Docks the form to the left edge (persistent).
- **`sidebar-right`**: Docks the form to the right edge.

### 3.4 Visual Customization
You can brand the component to match your app identity.

**A. `categoryIcons`**
Map your template categories to specific Lucide icons.
```tsx
<PromptRunner 
  categoryIcons={{
    'development': { name: 'Engineering', icon: Code },
    'marketing': { name: 'Promotions', icon: Megaphone }
  }}
/>
```

**B. `headerProps`**
Override the title, logo, or breadcrumbs.
```tsx
<PromptRunner 
  headerProps={{
    title: 'My Custom App',
    logoIcon: Cpu, // Your company logo
    subtitle: 'Powered by v4.0',
    showLogo: true
  }}
/>
```

**C. `editorProps`**
Change the editor's look and feel.
```tsx
<PromptRunner 
  editorProps={{
    fontSize: 18,          // Larger text
    fontFamily: 'Fira Code, monospace', // Custom font
    maxCharCount: 2000   // Enforce limit
    showCopyButton: true
  }}
/>
```

---

## 🧠 Chapter 4: Advanced Integration (The "Brain")

This chapter covers connecting your logic to `PromptRunner`.

### 4.1 Event Handling (`onExecuteClick`, `onFormSubmit`)
`PromptRunner` handles UI state (loading, errors), but it passes the final prompt data back to you.

**The Flow:**
1. User clicks "Generate".
2. Component validates variables (checks `required` fields).
3. Component fills `{{variables}}` into the `content` string.
4. `onExecuteClick(finalContent, formData)` is fired.

**Integration with OpenAI Example:**
```tsx
import { useState } from 'react';

const App = () => {
  const [output, setOutput] = useState('');
  
  const handleExecute = async (promptString: string, variables: Record<string, any>) => {
    setOutput('Thinking...');
    
    try {
      // Call your API here
      const response = await fetch('/api/openai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: promptString,
          model: 'gpt-4'
         }),
      });

      const data = await response.json();
      
      // Handle the response (data.choices[0].message.content)
      setOutput(data.text);
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  return <PromptRunner templates={myTemplates} onExecuteClick={handleExecute} />;
};
```

### 4.2 Streaming Support
`PromptRunner` supports streaming the output text in two ways.

**Option A: Internal Simulation (Visual Only)**
Useful if you just want to show the effect without a real backend.
```tsx
<PromptRunner 
  config={{
    simulationSpeed: 10 // 10ms per character (Typing effect)
  }}
/>
```

**Option B: Real-Time Streaming**
If your API returns chunks, handle them using `onOutputChange`.
```tsx
<PromptRunner 
  // Do NOT pass onExecuteClick to disable internal simulation
  onOutputChange={(chunk) => {
    setOutput(prev => prev + chunk); // Append chunks as they arrive
  }}
/>
```

### 4.3 State Management (Local vs. Global)
The component is controlled. You can manage state locally or globally.

**Pattern 1: Local State (`useState`)**
Parent passes state down.
```tsx
const App = () => {
  const [status, setStatus] = useState('active');
  
  return <PromptRunner status={status} onStatusChange={setStatus} />;
};
```

**Pattern 2: Global Store (Redux/Zustand)**
Parent dispatches actions.
```tsx
import { useSelector, useDispatch } from 'react-redux';
import { updateStatus } from './store/actions';

const App = () => {
  const status = useSelector(state => state.promptRunner.status);
  const dispatch = useDispatch();

  return (
    <PromptRunner 
      status={status}
      onStatusChange={(s) => dispatch(updateStatus(s))}
    />
  );
};
```

---

## 🛠️ Chapter 5: Developer Toolkit (Debugging & Tweaking)

This chapter focuses on tweaking internal behaviors and debugging issues.

### 5.1 The `config` Prop
You can pass a `config` object to `PromptRunner` to override internal defaults or tweak the simulation engine.

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enableManualEdit` | `boolean` | `false` | Allows typing in the main editor (default: read-only until variables are applied). |
| `simulationSpeed` | `number` | `10` | Controls typing speed in ms (0 = instant, 100 = very slow). |
| `drawerWidth` | `string` | `'sm:w-[420px]'` | Override sidebar width. |
| `debounceMs` | `number` | `300` | Delay before firing `onChange` events. |

**Usage Example:**
```tsx
<PromptRunner 
  config={{
    enableManualEdit: true,     // Allow typing directly in editor
    simulationSpeed: 0,       // 0 = Instant (no typing effect)
    drawerWidth: 'w-96',       // Wider sidebar
    debounceMs: 0,           // Immediate updates
  }}
/>
```

### 5.2 Debugging `onTagValueChange`
Use this prop to spy on form changes in real-time.
```tsx
<PromptRunner 
  onTagValueChange={(name, val) => {
    console.log(`Variable "${name}" changed to:`, val);
  }}
/>
```

### 5.3 Export & Import
You can grab the entire state of the runner (useful for saving sessions or debugging).

```tsx
import { PromptRunnerShowcaseV4 } from './showcase';

const App = () => {
  const handleExport = () => {
    // Showcase V4 logic example
    const state = {
      layout: 'editor-only',
      sidebar: 'drawer',
      favorites: [1, 2, 3],
      logs: [] // ...
    };
    
    const blob = new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-app-state.json`;
    a.click();
  };

  return (
    <div>
      <PromptRunnerShowcaseV4 onExportState={handleExport} />
    </div>
  );
};
```

---

## 🧪 Chapter 6: Troubleshooting & Best Practices

This chapter addresses common issues and defines best practices for a smooth integration.

### 6.1 Common Troubleshooting

**Issue: "Styles look broken / layout is squashed"**
*   **Cause**: The `PromptRunner` expects a parent container with `h-screen w-full overflow-hidden`. If your parent has different styles or `flex-col`, the components might collapse.
*   **Fix**: Wrap the component in a full-height container.
    ```tsx
    <div className="h-screen w-full bg-background text-foreground">
      <PromptRunner ... />
    </div>
    ```

**Issue: "Variables not filling in the prompt"**
*   **Cause**: Variable names in your `content` string must match the `name` property in your `variables` array exactly (case-sensitive).
*   **Fix**: Ensure case sensitivity.
    ```tsx
    // Correct
    variables: [{ name: 'task_name', ... }]
    content: "Do this task: {{task_name}}"
    
    // Wrong
    variables: [{ name: 'Task_Name', ... }]
    content: "Do this task: {{Task_Name}}"
    ```

**Issue: "Streaming isn't working"**
*   **Cause**: If you pass `onExecuteClick`, the internal simulation (typing effect) is disabled.
*   **Fix**: If you want real-time streaming, do NOT pass `onExecuteClick`. Instead, use `onOutputChange` to build the string.
    ```tsx
    // Real streaming
    <PromptRunner 
      onOutputChange={(chunk) => appendToOutput(chunk)} 
    />
    
    // Simulation
    <PromptRunner 
      config={{ simulationSpeed: 20 }} 
      onExecuteClick={(final) => setOutput(final)}
    />
    ```

### 6.2 Best Practices

**1. Control Props:**
Treat `PromptRunner` as a controlled component. Always pass `templates` and event handlers from your parent state. Do not rely on the component's internal state for anything persistent.

**2. Use Keys:**
Assign stable keys to list items (templates) to avoid rendering issues.
```tsx
{templates.map(t => <TemplateCard key={t.id} template={t} ... />)}
```

**3. Type Safety:**
Ensure the `Variable` array matches the `Variable` interface to prevent runtime errors.

**4. Debouncing:**
If you have expensive calculations in `onChange` handlers (like saving to a database), utilize the `debounceMs` prop (default 300ms) to rate-limit the calls.

---

## 📌 Conclusion

You now have everything you need to build a robust Prompt Engineering IDE. Start with the "Hello World" setup in Chapter 2, and progressively add features like Real-time Streaming and Layout Switching as your application grows.

For the most advanced implementation, refer to **`PromptRunnerShowcase`**, which demonstrates every prop and integration pattern discussed in this guide. Happy coding! 🚀
