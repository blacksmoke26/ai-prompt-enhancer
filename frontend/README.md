# AI Prompt Enhancer

> **AI Prompt Enhancer** is a modern web application designed to help users improve their AI prompts through intelligent enhancement techniques, providing better results from AI models with minimal effort.

## 📋 Application Overview

The AI Prompt Enhancer is a comprehensive tool that transforms how users interact with AI models. By providing intelligent prompt enhancement capabilities, it helps users craft more effective prompts that yield better results from AI systems. The application offers a rich, intuitive interface with advanced features for prompt engineering, history management, and performance analytics.

## 🎯 Key Benefits

- **Improved AI Results**: Transform vague or ineffective prompts into precise, actionable ones
- **Time Efficiency**: Save time by automating prompt refinement processes
- **Consistent Quality**: Maintain consistent prompt quality across different use cases
- **Learning Tool**: Understand what makes prompts effective through statistics and analytics
- **Multi-Provider Support**: Work with various AI providers (OpenAI, Anthropic, etc.)
- **Customizable Workflows**: Adapt the tool to your specific needs with user roles and templates

## 🎯 Target Users

- **Content Creators**: Writers, marketers, and researchers looking to improve AI-generated content
- **Developers**: Building AI applications who need effective prompt engineering
- **Students & Researchers**: Enhancing their AI research and writing processes
- **Professionals**: Anyone using AI tools who wants better results with less effort

## 🚀 Features

- **Prompt Enhancement**: Transform your prompts into more effective versions
- **Multi-Provider Support**: Works with various AI providers (OpenAI, Anthropic, etc.)
- **Rich Text Editor**: Markdown support with real-time statistics
- **History Management**: Track and review your prompt enhancement history
- **Statistics Dashboard**: Visualize your prompt usage and performance metrics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Support**: Light, dark, and system themes
- **Keyboard Shortcuts**: Quick enhancement with Ctrl/Cmd + Enter
- **Template System**: Predefined prompt templates for common use cases
- **Export Functionality**: Export history and enhanced prompts
- **Role-Based Customization**: Different enhancement approaches based on user roles
- **Advanced Prompt Editor**: Enhanced text editor with word cloud visualization and preview mode
- **Drag and Drop Layout**: Customizable dashboard layout with drag and drop functionality
- **Real-time Feedback**: Instant statistics and performance metrics
- **Local Storage Persistence**: Automatic saving of history and settings
- **Advanced Configuration**: Fine-tune AI prompt parameters including system prompts, target audiences, tone, response length, and more
- **Parameter Controls**: Configure advanced sampling parameters like Top-P, Top-K, stop sequences, and penalty settings

## 🛠️ Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **UI Library**: Radix UI Themes with custom components
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Markdown Rendering**: @uiw/react-markdown-preview
- **Rich Text Editor**: @mdxeditor/editor
- **Drag and Drop**: @dnd-kit
- **HTTP Client**: Axios
- **Testing**: Jest and React Testing Library
- **End-to-End Testing**: Playwright

## 📁 Project Structure

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
│   ├── COMPONENTS.md         # Component documentation
│   └── TESTING.md            # Testing documentation
├── tests/                    # Test files
│   └── __mocks__/            # Mock files for testing
├── public/                   # Static assets
└── ROADMAP.md                # Development roadmap
```

## 📖 Documentation

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Component Documentation](docs/COMPONENTS.md)
- [Testing Documentation](docs/TESTING.md)
- [Development Roadmap](ROADMAP.md)

## 🚀 Getting Started

### Prerequisites

- Node.js v22 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/blacksmoke26/ai-prompt-enhancer.git

# Navigate to frontend directory
cd ai-prompt-enhancer/frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run linting with auto-fix
npm run lint:fix

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e
```

## 📊 Usage

1. **Enter your prompt**: Type or paste your AI prompt in the editor
2. **Select AI model**: Choose from available AI models and providers
3. **Enhance**: Click the "Enhance" button or press Ctrl/Cmd + Enter
4. **Review results**: View enhanced prompt with statistics
5. **Save to history**: All enhancements are automatically saved for future reference

## 📁 Key Components

### Dashboard
Main application container with tab navigation for:
- **Enhancer**: Primary prompt enhancement interface
- **History**: View and manage prompt history
- **Statistics**: Visualize usage metrics
- **Settings**: Configure application preferences

### ModelSelector
AI model selection component with:
- Model information display
- Provider selection
- Health status indicators
- Integration with API services
- Advanced configuration controls for all PromptRequest properties

### PromptEnhancer
Core interface for:
- Rich text editing with markdown support
- Real-time statistics and word count
- Enhancement controls and action buttons
- Error handling and user feedback
- Template insertion capabilities
- Advanced editor features (preview mode, word cloud visualization)

### AdvancedPromptEditor
Enhanced text editor with:
- Markdown support with real-time preview
- Word count and character limit validation
- Template insertion functionality
- Formatting toolbar with markdown support
- Auto-save functionality
- Preview mode with syntax highlighting
- Word cloud visualization

### HistoryPanel
Prompt history management with:
- Filtering and search capabilities
- Editable history entries
- Export and clear functionality
- Refresh capabilities
- Rating and note system for history items

### StatsPanel
Data visualization with:
- Usage statistics charts
- Performance metrics
- Prompt enhancement trends
- Interactive data visualizations

### ModelSelector
AI model selection component with:
- Model information display
- Provider selection
- Health status indicators
- Integration with API services

### SettingsPanel
Configuration interface with:
- Theme selection (light, dark, system)
- User preference management
- API key management
- Customization options
- Role-based configuration settings
- Auto-save behavior configuration

## 🎨 Theming

The application supports three theme modes:
- **Light**: Traditional light theme
- **Dark**: Dark theme for comfortable nighttime usage
- **System**: Automatically follows your operating system theme

## 📱 Responsive Design

The application features a mobile-first responsive design:
- Collapsible sidebar on mobile devices
- Adaptive grid layouts
- Touch-friendly controls
- Optimized touch targets
- Mobile navigation bar

## 🔧 Configuration

### Environment Variables

Copy `.env.sample` as `.env` file in the project root directory.

### Application Settings

The application allows customization of:
- AI model selection
- Provider configuration
- Enhancement types
- User roles
- Temperature and token limits
- Default system prompts
- Theme preferences
- Auto-save behavior
- Dashboard layout preferences

## 📈 Roadmap

See [ROADMAP.md](ROADMAP.md) for current status and planned features.

## 📋 New Prompt Request Properties

The following new input controls have been added to the ModelSelector component to configure all PromptRequest properties:

- **System Prompt**: Custom system instructions for AI behavior
- **Target Audience**: Specifies the intended audience for the AI response
- **Tone**: Controls the emotional and stylistic approach of the response
- **Response Length**: Determines how detailed or concise the response should be
- **Custom Instructions**: Additional user instructions beyond standard options
- **Enhancement Parameters**: Configuration parameters for the enhancement type
- **Output Format**: Preferred format for the enhanced response (markdown, html, text, json)
- **Off-the-Record**: Toggle to exclude requests from history storage
- **Top-P Sampling**: Controls the nucleus sampling parameter
- **Top-K Sampling**: Controls the top-k sampling parameter
- **Stop Sequences**: Defines sequences that will stop generation
- **Frequency Penalty**: Controls repetition penalty for token frequency
- **Presence Penalty**: Controls repetition penalty for token presence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Follow the existing code style and documentation conventions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please open an issue on the [GitHub repository](https://github.com/blacksmoke26/ai-prompt-enhancer/issues).

## 🙏 Acknowledgments

- Built with React 19 and TypeScript
- Utilizes modern frontend development practices
- Inspired by the need for better AI prompt engineering tools
- Uses state-of-the-art UI components and design patterns

## Copyright ©️

Developed with ❤️ by Junaid Atari