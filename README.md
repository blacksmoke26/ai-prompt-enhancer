# AI Prompt Enhancer v1.3

AI Prompt Enhancer is a powerful dual-platform application that helps users improve their AI prompts through intelligent enhancement techniques, providing better results from AI models with minimal effort.

## 🚀 Features

### Backend Features
- **Multi-Provider Support**: Works with various AI providers (OpenAI, Ollama, Gemini, Anthropic, etc.)
- **Prompt Enhancement**: Transform prompts into more effective versions with different enhancement types
- **History Tracking**: Complete history of all prompt interactions with database persistence
- **Real-time Updates**: WebSocket support for real-time notifications
- **Security**: Built-in rate limiting and security features
- **Configurable**: Environment-based configuration with database persistence
- **API Endpoints**: Comprehensive REST API for prompt enhancement and management

### Frontend Features
- **Rich Text Editor**: Markdown support with real-time statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Support**: Light, dark, and system themes
- **Keyboard Shortcuts**: Quick enhancement with Ctrl/Cmd + Enter
- **Statistics Dashboard**: Visualize usage metrics and performance
- **History Management**: Track and review your prompt enhancement history

## 🛠️ Technology Stack

### Backend
- **Framework**: Fastify (high-performance Node.js web framework)
- **Language**: TypeScript
- **Database**: SQLite with Sequelize ORM
- **API**: RESTful API with WebSocket support
- **Security**: Fastify CORS, Helmet, and rate limiting

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **UI Library**: Radix UI Themes with custom components
- **Styling**: Tailwind CSS
- **Data Visualization**: Recharts
- **Rich Text Editor**: @mdxeditor/editor
- **HTTP Client**: Axios

## 📁 Project Structure

```
ai-prompt-enhancer/
├── backend/              # Node.js backend API
│   ├── src/              # Source code
│   ├── database/         # Database models and migrations
│   ├── docs/             # Documentation
│   └── package.json      # Backend dependencies
├── frontend/             # React frontend application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── package.json          # Root package.json with scripts
└── README.md             # This file
```

## 📖 Documentation

- [Backend Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)
- [Architecture Overview](frontend/docs/ARCHITECTURE.md)
- [Component Documentation](frontend/docs/COMPONENTS.md)

## 🚀 Getting Started

### Prerequisites

- Node.js v22 or higher
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/blacksmoke26/ai-prompt-enhancer.git

# Navigate to project directory
cd ai-prompt-enhancer

# Install all dependencies
npm run install:all
```

### Development

```bash
# Start both frontend and backend in development mode
npm run dev

# Or start backend only
npm run dev:backend

# Or start frontend only
npm run dev:frontend
```

### Production

```bash
# Build frontend
npm run build

# Start backend server
npm run start
```

## 📊 Usage

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Access the frontend**:
   - Open your browser and navigate to `http://localhost:5173`

3. **Enter your prompt**: Type or paste your AI prompt in the editor

4. **Select AI model**: Choose from available AI models and providers

5. **Enhance**: Click the "Enhance" button or press Ctrl/Cmd + Enter

6. **Review results**: View enhanced prompt with statistics

7. **Save to history**: All enhancements are automatically saved for future reference

## 📁 Key Components

### Backend Components
- **API Routes**: REST endpoints for prompt enhancement, history management, and configuration
- **Providers**: Implementation for multiple AI providers (OpenAI, Ollama, etc.)
- **Database**: SQLite with Sequelize ORM for storing history and configurations
- **Services**: Business logic for prompt enhancement and management
- **WebSocket**: Real-time communication for updates

### Frontend Components
- **Dashboard**: Main application container with tab navigation
- **PromptEnhancer**: Core interface for prompt editing and enhancement
- **HistoryPanel**: Prompt history management with filtering and search
- **StatsPanel**: Data visualization with charts and metrics
- **Settings**: Configuration panel for application preferences

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

## 📖 Supported AI Providers

The AI Prompt Enhancer supports the following AI providers:
- Ollama
- OpenAI
- OpenRouter
- Deepseek
- Coze
- Qianfan (Baidu)
- Gemini (Google)
- Kimi (Moonshot)
- Groq
- Anthropic
- Mistral
- Nvidia
- Cohere
- Cody (Sourcegraph)
- XAI
- HuggingFace
- SiliconFlow
- Zhipu
- Qwen (Aliyun)
- LM Studio

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

- Built with Fastify and React 19
- Utilizes modern full-stack development practices
- Inspired by the need for better AI prompt engineering tools

## Copyright ©️

Developed with ❤️ by Junaid Atari
