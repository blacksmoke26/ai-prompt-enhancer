# AI Prompt Enhancer - Frontend Architecture

## Overview

The AI Prompt Enhancer is a modern React-based web application designed to help users improve their AI prompts through intelligent enhancement techniques. The frontend provides a rich user interface with real-time feedback, history management, and customization options.

## Architecture Components

### 1. Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand (for application and history state)
- **UI Library**: Radix UI Themes with custom components
- **Styling**: Tailwind CSS with CSS variables for theming
- **HTTP Client**: Axios
- **Data Visualization**: Recharts
- **Markdown Rendering**: @uiw/react-markdown-preview
- **Rich Text Editor**: @mdxeditor/editor
- **Drag and Drop**: @dnd-kit

### 2. Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page-level components
│   ├── services/             # API service layer
│   ├── stores/               # Zustand state management
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── constants/            # Constant values
│   ├── App.tsx               # Main application component
│   └── main.tsx              # Entry point
├── public/                   # Static assets
└── docs/                     # Documentation
```

### 3. State Management

#### Application Store (useAppStore)
- Manages global application configuration and settings
- Handles theme preferences (light, dark, system)
- Stores selected model, provider, enhancement type, and user role
- Manages sidebar visibility
- Handles dashboard layout configuration with drag-and-drop support

#### History Store (useHistoryStore)
- Manages prompt history data
- Handles loading and error states
- Provides CRUD operations for history items
- Stores statistics about prompt usage

### 4. Core Components

#### Dashboard
- Main application container with sidebar navigation
- Tab-based interface for different views (Enhancer, History, Statistics, Settings)
- Responsive design with mobile-friendly navigation

#### PromptEnhancer
- Main prompt enhancement interface
- Rich text editor with real-time statistics
- Enhancement controls and action buttons
- Error handling and user feedback

#### HistoryPanel
- Displays prompt history with filtering and search capabilities
- Allows viewing, editing, and deleting history items
- Provides export and clear functionality

#### StatsPanel
- Visualizes prompt usage statistics
- Shows performance metrics and usage patterns

#### ModelSelector
- Allows users to select AI models for prompt enhancement
- Integrates with available providers

#### SettingsPanel
- Configuration interface for application preferences
- Theme settings and customization options

### 5. Services Layer

#### PromptService
- API client for communicating with the backend
- Handles prompt enhancement requests
- Manages model and provider retrieval
- Implements health checks for AI providers

### 6. Data Flow

1. **User Interaction**: User interacts with UI components (e.g., enters prompt)
2. **State Management**: Components update Zustand stores with relevant data
3. **API Communication**: Services layer makes HTTP requests to backend
4. **Response Handling**: Backend returns data that updates application state
5. **UI Update**: Components re-render with new data

### 7. Responsive Design

The application follows
 a mobile-first approach with:
- Responsive grid layouts
- Collapsible sidebar for mobile devices
- Adaptive components that work across screen sizes
- Touch-friendly controls

### 8. Theming System

- Light, dark, and system theme options
- Context-based theme provider
- CSS variable-based theming for consistent styling
- Automatic system preference detection

### 9. Performance Considerations

- Lazy loading of components
- Memoization of expensive calculations
- Debounced input handling
- Efficient state updates with Zustand
- Code splitting for large components

### 10. Security

- Input validation and sanitization
- Proper error handling to avoid information leakage
- Secure API communication with Axios
- Role-based access control where applicable

## Development Workflow

### Build Process
1. TypeScript compilation
2. Vite build with optimization
3. CSS processing with Tailwind
4. Asset optimization

### Testing Strategy
- Unit tests for components and hooks
- Integration tests for service layers
- E2E tests for core user flows

### Deployment
- Single-page application deployment
- Static asset optimization
- CDN support for faster loading
```
