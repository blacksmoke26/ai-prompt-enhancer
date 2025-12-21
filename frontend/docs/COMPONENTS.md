# AI Prompt Enhancer - Component Documentation

## Overview

This document provides detailed documentation for all major components in the AI Prompt Enhancer frontend application. Each component is described with its purpose, props, and implementation details.

## Core Components

### 1. Dashboard
**File**: `src/pages/Dashboard.tsx`

**Purpose**: Main application container that manages tab navigation and layout.

**Props**: None

**Features**:
- Tab-based navigation (Enhancer, History, Statistics, Settings)
- Responsive sidebar with collapsible functionality
- Theme switching controls
- Mobile-friendly navigation bar
- Loading and error states management

**Structure**:
```tsx
<Dashboard>
  <Sidebar>
    <NavigationTabs />
  </Sidebar>
  <MainContent>
    {activeTab === 'enhancer' && <PromptEnhancer />}
    {activeTab === 'history' && <HistoryPanel />}
    {activeTab === 'stats' && <StatsPanel />}
    {activeTab === 'settings' && <SettingsPanel />}
  </MainContent>
</Dashboard>
```

### 2. PromptEnhancer
**File**: `src/components/PromptEnhancer/index.tsx`

**Purpose**: Main interface for prompt enhancement with rich text editing capabilities.

**Props**: None

**Features**:
- Rich text editor with real-time statistics
- Enhancement controls (enhance, reset)
- Error handling with dismissible alerts
- Quick statistics display
- Keyboard shortcuts (Ctrl/Cmd + Enter)
- Integration with API services

### 3. AdvancedPromptEditor
**File**: `src/components/AdvancedPromptEditor/index.tsx`

**Purpose**: Enhanced text editor component with additional features for prompt creation.

**Props**:
```typescript
interface AdvancedPromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  response?: PromptResponse;
  showStats?: boolean;
  maxLength?: number;
  showTemplates?: boolean;
  showFormatting?: boolean;
  autoSave?: boolean;
  showWordCloud?: boolean;
  showPreview?: boolean;
  onEnhance?: () => void;
  className?: string;
}
```

**Features**:
- Markdown support
- Word count and character limit
- Real-time statistics
- Template insertion
- Formatting toolbar
- Auto-save functionality
- Preview mode
- Word cloud visualization

### 4. HistoryPanel
**File**: `src/components/HistoryPanel/index.tsx`

**Purpose**: Component for displaying and managing prompt history.

**Props**:
```typescript
interface HistoryPanelProps {
  history: PromptHistory[];
  loading: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<PromptHistory>) => void;
  onExport: () => void;
  onClear: () => void;
  onRefresh: () => void;
}
```

**Features**:
- History item listing with timestamps
- Filtering and search capabilities
- Editable history entries
- Export functionality
- Clear history option
- Refresh button for updating data
- Loading indicators

### 5. StatsPanel
**File**: `src/components/StatsPanel/index.tsx`

**Purpose**: Displays statistics and usage metrics for prompt enhancement.

**Props**: None

**Features**:
- Visual charts and graphs using Recharts
- Usage statistics
- Performance metrics
- Prompt enhancement trends
- Responsive data visualization

### 6. ModelSelector
**File**: `src/components/ModelSelector/index.tsx`

**Purpose**: Component for selecting AI models and providers for prompt enhancement.

**Props**: None

**Features**:
- Model selection dropdown
- Provider selection
- Model information display
- Health status indicators
- Integration with API services

### 7. SettingsPanel
**File**: `src/components/SettingsPanel/index.tsx`

**Purpose**: Configuration interface for application preferences.

**Props**: None

**Features**:
- Theme selection (light, dark, system)
- Configuration settings
- User preference management
- API key management
- Customization options

## UI Components

### 1. Sidebar
**File**: `src/components/Sidebar.tsx`

**Purpose**: Navigation sidebar with theme controls.

**Props**:
```typescript
interface SidebarProps {
  children: React.ReactNode;
}
```

**Features**:
- Collapsible navigation
- Mobile overlay
- Theme selector
- Responsive design

### 2. ThemeProvider
**File**: `src/components/ThemeProvider.tsx`

**Purpose**: Context provider for managing application theme.

**Props**:
```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
}
```

**Features**:
- Theme switching (light, dark, system)
- System preference detection
- CSS class management
- Context-based theme state

## Hooks

### 1. usePromptEnhancer
**File**: `src/hooks/usePromptEnhancer.ts`

**Purpose**: Custom hook for managing prompt enhancement functionality.

**Returns**:
```typescript
{
  enhancePrompt: (text: string) => Promise<PromptResponse | null>;
  refinePrompt: (enhancedText: string, additionalContext: string) => Promise<PromptResponse | null>;
  combinePrompts: (prompts: string[]) => Promise<PromptResponse | null>;
  revertPrompt: (historyId: number) => string | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}
```

### 2. useAppData
**File**: `src/hooks/useAppData.ts`

**Purpose**: Hook for managing application-wide data loading and state.

### 3. useHistory
**File**: `src/hooks/useHistory.ts`

**Purpose**: Hook for managing history data operations.

## Services

### 1. PromptService
**File**: `src/services/PromptService.ts`

**Purpose**: API service layer for prompt enhancement operations.

**Methods**:
- `enhancePrompt(request: PromptRequest)`: Enhance a prompt
- `getModels()`: Retrieve available AI models
- `getProviders()`: Retrieve available AI providers
- `testProvider(providerName: string, config: ProviderConfig)`: Test provider availability

## State Management

### 1. useAppStore
**File**: `src/stores/appStore.ts`

**Purpose**: Zustand store for global application state.

**Features**:
- Configuration management
- Theme preferences
- Selected model/provider tracking
- Sidebar state
- Dashboard layout management

### 2. useHistoryStore
**File**: `src/stores/historyStore.ts`

**Purpose**: Zustand store for prompt history management.

**Features**:
- History item CRUD operations
- Statistics management
- Loading and error states
- Persistence through localStorage

## Utility Components

### 1. ActionButtons
**File**: `src/components/PromptEnhancer/ActionButtons.tsx`

**Purpose**: Container for action buttons in the prompt enhancer.

**Props**:
```typescript
interface ActionButtonsProps {
  onEnhance: () => void;
  onReset: () => void;
  isLoading: boolean;
  isEnhancementAvailable: boolean;
}
```

### 2. ErrorAlert
**File**: `src/components/PromptEnhancer/ErrorAlert.tsx`

**Purpose**: Displays error messages in a user-friendly format.

**Props**:
```typescript
interface ErrorAlertProps {
  error: string | null;
}
```

### 3. QuickStats
**File**: `src/components/PromptEnhancer/QuickStats.tsx`

**Purpose**: Displays quick statistics about the current prompt.

**Props**:
```typescript
interface QuickStatsProps {
  response: PromptResponse | null;
}
```

## Data Models

### PromptRequest
```typescript
interface PromptRequest {
  text: string;
  model: string;
  provider: string;
  enhancementType: string;
  userRole: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
}
```

### PromptResponse
```typescript
interface PromptResponse {
  enhancedPrompt: string;
  processingTime: number;
  tokensUsed: number;
  originalPrompt: string;
  timestamp: string;
}
```

### PromptHistory
```typescript
interface PromptHistory {
  id: string;
  prompt: string;
  enhancedPrompt: string;
  provider: string;
  model: string;
  enhancementType: string;
  userRole: string;
  timestamp: string;
  processingTime: number;
  tokensUsed: number;
  rating?: number;
  notes?: string;
}
```

### AppConfig
```typescript
interface AppConfig {
  provider: string;
  model: string;
  enhancementType: string;
  userRole: string;
  temperature: number;
  maxTokens: number;
  defaultSystemPrompt: string;
}
```

## Development Guidelines

### Component Structure
- Each component should have clear separation of concerns
- Props should be well-typed with TypeScript
- Component should be reusable and composable
- Proper error handling should be implemented

### State Management
- Use Zustand for application state management
- Keep state flat and predictable
- Persist critical state to localStorage
- Use proper middleware for persistence

### Styling
- Use Tailwind CSS for styling
- Follow atomic design principles
- Maintain consistent design tokens
- Ensure responsive behavior across devices

### Performance
- Implement proper memoization where needed
- Use lazy loading for heavy components
- Optimize rendering with React.memo
- Debounce input handling for better performance