# Synapse - Frontend Architecture

## Overview

The Synapse is a modern React-based web application designed to help users improve their AI prompts through intelligent enhancement techniques. The frontend provides a rich user interface with real-time feedback, history management, and customization options.

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
- **Testing**: Jest, React Testing Library, and Playwright
- **End-to-End Testing**: Playwright

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
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # Architecture documentation
│   └── COMPONENTS.md         # Component documentation
├── public/                   # Static assets
└── tests/                    # Test files
    └── __mocks__/            # Mock files for testing
```

### 3. State Management

#### Application Store (useAppStore)
- Manages global application configuration and settings
- Handles theme preferences (light, dark, system)
- Stores selected model, provider, enhancement type, and user role
- Manages sidebar visibility
- Handles dashboard layout configuration with drag-and-drop support
- Stores auto-save preferences and user preferences
- Manages application loading states and error handling
- Stores dashboard layout preferences

#### History Store (useHistoryStore)
- Manages prompt history data
- Handles loading and error states
- Provides CRUD operations for history items
- Stores statistics about prompt usage
- Implements local storage persistence
- Manages history item ratings and notes
- Handles history item sorting and filtering

### 4. Core Components

#### Dashboard
- Main application container with sidebar navigation
- Tab-based interface for different views (Enhancer, History, Statistics, Settings)
- Responsive design with mobile-friendly navigation
- Theme switching controls
- Application loading states management
- Dashboard layout management with drag-and-drop support

#### PromptEnhancer
- Main prompt enhancement interface
- Rich text editor with real-time statistics
- Enhancement controls and action buttons
- Error handling and user feedback
- Template insertion capabilities
- Integration with API services
- Keyboard shortcuts support
- Advanced editor features (preview mode, word cloud visualization)

#### AdvancedPromptEditor
- Enhanced text editor with additional features for prompt creation
- Markdown support with real-time preview
- Word count and character limit validation
- Template insertion functionality
- Formatting toolbar with markdown support
- Auto-save functionality
- Preview mode with syntax highlighting
- Word cloud visualization
- Integration with prompt enhancement services

#### HistoryPanel
- Displays prompt history with filtering and search capabilities
- Allows viewing, editing, and deleting history items
- Provides export and clear functionality
- Rating and note system for history items
- Refresh button for updating data
- Loading indicators and error handling
- Sorting and filtering capabilities

#### StatsPanel
- Visualizes prompt usage statistics
- Shows performance metrics and usage patterns
- Prompt enhancement trends
- Interactive data visualizations with Recharts
- Responsive chart components
- Data filtering and sorting capabilities
- Export functionality for statistics

#### ModelSelector
- Allows users to select AI models for prompt enhancement
- Integrates with available providers
- Model information display with health status indicators
- Provider configuration management
- Integration with API services
- Model test functionality

#### SettingsPanel
- Configuration interface for application preferences
- Theme selection (light, dark, system)
- User preference management
- API key management
- Customization options
- Role-based configuration settings
- Auto-save behavior configuration
- Dashboard layout preferences

### 5. Services Layer

#### PromptService
- API client for communicating with the backend
- Handles prompt enhancement requests
- Manages model and provider retrieval
- Implements health checks for AI providers
- Error handling and retry mechanisms
- Request/response transformation utilities
- History management operations
- Statistics retrieval

### 6. Data Flow

1. **User Interaction**: User interacts with UI components (e.g., enters prompt, selects model)
2. **State Management**: Components update Zustand stores with relevant data
3. **API Communication**: Services layer makes HTTP requests to backend
4. **Response Handling**: Backend returns data that updates application state
5. **UI Update**: Components re-render with new data
6. **Persistence**: Critical state updates are persisted to localStorage

### 7. Responsive Design

The application follows a mobile-first approach with:
- Responsive grid layouts
- Collapsible sidebar for mobile devices
- Adaptive components that work across screen sizes
- Touch-friendly controls
- Optimized touch targets
- Mobile navigation bar

### 8. Theming System

- Light, dark, and system theme options
- Context-based theme provider
- CSS variable-based theming for consistent styling
- Automatic system preference detection
- Theme persistence across sessions
- Smooth theme transition animations

### 9. Performance Considerations

- Lazy loading of components
- Memoization of expensive calculations
- Debounced input handling
- Efficient state updates with Zustand
- Code splitting for large components
- Optimized rendering with React.memo
- Proper error boundaries for graceful degradation
- Loading states for async operations
- Local storage persistence for history and settings

### 10. Security

- Input validation and sanitization
- Proper error handling to avoid information leakage
- Secure API communication with Axios
- Role-based access control where applicable
- CSRF protection for API requests
- XSS prevention in rendered content
- Secure handling of API keys and credentials

### 11. Testing Strategy

- Unit tests for components and hooks using Jest
- Integration tests for service layers
- E2E tests for core user flows using Playwright
- Mocking of API services for isolated testing
- Snapshot testing for component consistency
- Test coverage reporting with Istanbul
- End-to-end testing with Playwright for comprehensive coverage

## Development Workflow

### Build Process
1. TypeScript compilation with strict type checking
2. Vite build with optimization
3. CSS processing with Tailwind
4. Asset optimization
5. Bundle analysis and optimization
6. Environment variable injection

### Testing Strategy
- Unit tests for individual components and hooks
- Integration tests for service layer interactions
- E2E tests for core user flows
- Mock-based testing for API dependencies
- Test coverage monitoring and reporting
- End-to-end testing with Playwright for comprehensive coverage

### Deployment
- Single-page application deployment
- Static asset optimization
- CDN support for faster loading
- Environment-specific configuration management
- Automated build and deployment pipeline
- End-to-end testing in CI pipeline
