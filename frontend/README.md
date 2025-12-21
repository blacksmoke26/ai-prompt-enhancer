# AI Prompt Enhancer

> **AI Prompt Enhancer** is a modern web application designed to help users improve their AI prompts through intelligent enhancement techniques, providing better results from AI models with minimal effort.

## 🚀 Features

- **Prompt Enhancement**: Transform your prompts into more effective versions
- **Multi-Provider Support**: Works with various AI providers (OpenAI, Anthropic, etc.)
- **Rich Text Editor**: Markdown support with real-time statistics
- **History Management**: Track and review your prompt enhancement history
- **Statistics Dashboard**: Visualize your prompt usage and performance metrics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Support**: Light, dark, and system themes
- **Keyboard Shortcuts**: Quick enhancement with Ctrl/Cmd + Enter

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
│   └── COMPONENTS.md         # Component documentation
├── public/                   # Static assets
└── ROADMAP.md                # Development roadmap
```

## 📖 Documentation

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Component Documentation](docs/COMPONENTS.md)
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

### PromptEnhancer
Core interface for:
- Rich text editing with markdown support
- Real-time statistics and word count
- Enhancement controls and action buttons
- Error handling and user feedback

### HistoryPanel
Prompt history management with:
- Filtering and search capabilities
- Editable history entries
- Export and clear functionality
- Refresh capabilities

### StatsPanel
Data visualization with:
- Usage statistics charts
- Performance metrics
- Prompt enhancement trends

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

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root with:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=AI Prompt Enhancer
```

### Application Settings

The application allows customization of:
- AI model selection
- Provider configuration
- Enhancement types
- User roles
- Temperature and token limits
- Default system prompts

## 📈 Roadmap

See [ROADMAP.md](ROADMAP.md) for current status and planned features.

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
