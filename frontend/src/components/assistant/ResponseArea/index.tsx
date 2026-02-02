/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 *
 * @description
 * ResponseArea is a high-level React component responsible for displaying the AI's
 * response, chat history, and interactive controls within the main application interface.
 *
 * It handles:
 * - Content rendering (markdown, plain text, streaming state)
 * - Chat history management and filtering
 * - User interactions (copy, download, regenerate, rate, pin, edit)
 * - UI state management (full screen, wide mode, font size)
 * - Scroll behavior (auto-scroll on streaming, manual navigation)
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Streamdown} from 'streamdown';
import {removeMarkdown} from '@excalidraw/markdown-to-text';
import {
  ArrowDown,
  ArrowUp,
  BrushCleaning,
  Check,
  FoldHorizontal,
  Info,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Square,
  UnfoldHorizontal,
  X,
} from 'lucide-react';

// utils
import {cn} from '~/utils/helpers';
import {styles, THEME_COLORS} from './utils';

// hooks
import {useDataStore} from '~/stores/dataStore';
import {useAppStore} from '~/stores/appStore';
import {useTheme} from '~/components/ThemeProvider';

// ui components
import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';
import {TooltipMini} from '~/components/ui/Tooltip';

// components
import RoleSelector, {RoleSelectorConfig} from '~/components/ModelSelector/RoleSelector';

// relative component
import MessageBubble from './MessageBubble';

// types
import type {PromptHistoryByRole, UserRole} from '~/types';

/**
 * Extended ChatMessage interface.
 * Adds specific role types and variant support.
 */
export interface ChatMessage extends PromptHistoryByRole {
  /** The role of the message sender. */
  role: 'user' | 'assistant' | 'system';
  internalPrompt?: string;
  /** Optional index for message variants. */
  variantIndex?: number;
}

/**
 * Props interface for the ResponseArea component.
 */
export interface ResponseAreaProps {
  /** The raw content string to be rendered (markdown supported). */
  content: string;
  /** Array of chat history messages. */
  messages?: ChatMessage[];
  /** Indicates if content is currently loading. */
  isLoading: boolean;
  /** Indicates if the response is being streamed. */
  isStreaming: boolean;
  /** If true, the view is in a wider layout mode. */
  isWide: boolean;
  /** If true, the view occupies the full screen. */
  isFullScreen: boolean;

  /** Callback invoked when the user role is changed. */
  onUserChange?(user: UserRole): void;

  /** Callback invoked when content is copied. */
  onCopy(content: string): void;

  /** Callback invoked to download the content. */
  onDownload(content: string): void;

  /** Callback to toggle wide mode. */
  toggleWidth(): void;

  /** Callback to toggle full screen mode. */
  toggleFullScreen(): void;

  /** Optional callback to stop the stream. */
  onStopStream?(): void;

  /** Optional callback to regenerate response. */
  onRegenerate?(): void;

  /** Optional callback to edit a message. */
  onEditMessage?(id: string, newContent: string): void;

  /** Optional callback to delete a message. */
  onDeleteMessage?(id: string): void;

  /** Optional callback to switch message variants. */
  onSwitchVariant?(msgId: string, newIndex: number): void;

  /** Optional callback to rate a message. */
  onRateMessage?(id: string, rating: number): void;

  /** Optional callback to pin/unpin a message. */
  onPinMessage?(id: string, isPinned: boolean): void;

  /** Optional callback to clear chat history. */
  onClearHistory?(): void;
}

const ResponseArea: React.FC<ResponseAreaProps> = (props) => {
  const {
    content, messages = [], isLoading, isFullScreen, isStreaming, onCopy, onDownload,
    isWide, toggleWidth, toggleFullScreen, onStopStream, onRegenerate, onEditMessage,
    onDeleteMessage, onSwitchVariant, onRateMessage, onPinMessage, onClearHistory, onUserChange,
  } = props;

  const {resolvedTheme, isDarkTheme} = useTheme();
  const colors = THEME_COLORS[resolvedTheme];

  const {config} = useAppStore();
  const {userRoles} = useDataStore();
  const userRole = userRoles?.find(x => x.id === config.userRole) ?? userRoles?.find(x => x.key === 'general')!;

  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State
  const [fontSize, setFontSize] = useState(16);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [pendingContent, setPendingContent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState<{ message: string, type: 'success' | 'info' } | null>(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const isChatMode = messages.length > 0 || isStreaming;
  const plainContent = removeMarkdown(content ?? '').trim();
  const hasContent = !!plainContent;

  const filteredMessages = messages.filter(m => {
    if (!searchQuery) return true;
    return m.aiPrompt.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCopy = useCallback((id: string, text: string) => {
    onCopy(text);
    setCopiedId(id);
    setShowToast({message: 'Content copied!', type: 'success'});
    setTimeout(() => setShowToast(null), 2000);
  }, [onCopy]);

  const adjustFontSize = (delta: number) => {
    setFontSize(prev => Math.max(10, Math.min(34, prev + delta)));
  };
  const resetFontSize = () => setFontSize(16);

  const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({top: 0, behavior});
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior,
      });
      setIsUserScrolledUp(false);
    }
  };

  const handleEditStart = (msg: ChatMessage) => {
    setEditingId(msg.id);
    setEditContent(msg.aiPrompt);
  };
  const handleEditSave = (id: string) => {
    if (onEditMessage) {
      onEditMessage(id, editContent);
    }
    setEditingId(null);
    setEditContent('');
  };
  const handleEditCancel = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleRate = (id: string, rating: number) => {
    if (onRateMessage) onRateMessage(id, rating);
    setShowToast({message: `Rated ${rating}/5 stars`, type: 'info'});
    setTimeout(() => setShowToast(null), 2000);
  };

  const handlePin = (id: string, isPinned: boolean) => {
    if (onPinMessage) onPinMessage(id, isPinned);
    setShowToast({message: isPinned ? 'Pinned to Top' : 'Unpinned', type: 'info'});
    setTimeout(() => setShowToast(null), 2000);
  };

  useEffect(() => {
    if (isStreaming) {
      setPendingContent(null);
    } else if (content && !isStreaming) {
      setPendingContent(content);
    }
  }, [isStreaming, content]);

  useEffect(() => {
    if (!pendingContent) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.aiPrompt === pendingContent) {
      setPendingContent(null);
    }
  }, [messages, pendingContent]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const {scrollTop, scrollHeight, clientHeight} = container;
      const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

      // Show Bottom button if not near bottom
      setShowScrollBottom(distanceToBottom > 100);

      // Show Top button if scrolled down significantly
      setShowScrollTop(scrollTop > 300);

      if (distanceToBottom > 150) {
        setIsUserScrolledUp(true);
      } else {
        setIsUserScrolledUp(false);
      }
    };
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isStreaming && !isUserScrolledUp) {
      requestAnimationFrame(() => {
        const container = scrollContainerRef.current;
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'auto',
          });
        }
      });
    }
  }, [content, isStreaming, isUserScrolledUp]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      setEditingId(null);
      if (e.key === 'Escape') {
        setSearchQuery('');
        setIsSearchExpanded(false);
        if (isFullScreen) toggleFullScreen();
      }
    };

    // Handle Cmd/Ctrl + K for search
    const handleSearchShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchExpanded(true);
      }
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleSearchShortcut);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleSearchShortcut);
    };
  }, [isFullScreen, toggleFullScreen]);

  // --- Render Helpers ---

  const renderTopBar = () => (
    <div className="glass-header px-4 py-3 z-50 flex items-center justify-between transition-all duration-300"
         style={{'--border-color': colors.border} as React.CSSProperties}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span
              className={cn('w-2.5 h-2.5 rounded-full transition-colors duration-500', isStreaming ? 'bg-red-500 animate-pulse' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]')}></span>
            <RoleSelector
              config={{} as RoleSelectorConfig}
              data={userRoles}
              initialValue={userRoles.find(x => x.key === userRole.key)}
              onSelect={(role) => onUserChange?.(role)}
            />
          </h2>
          {isStreaming && onStopStream && (
            <Button
              size="sm" variant="plain" onClick={onStopStream}
              className="h-7 px-3 text-[10px] font-bold text-red-400 border border-red-500/30 hover:bg-red-500/10 relative top-[1px] rounded-full animate-pulse-glow">
              <Square size={10} className="fill-current"/>
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search Bar (Integrated) */}
        <div
          className={cn('flex items-center bg-background/50 rounded-full border transition-all duration-300 overflow-hidden', isSearchExpanded ? 'w-72 px-3' : 'w-10 justify-center hover:bg-background/80')}
          style={{borderColor: colors.border}}>
          {isSearchExpanded ? (
            <>
              <Input
                noVisibleRing
                leftIcon={<Search size={16}
                                  className={cn('text-muted-foreground shrink-0', searchQuery && 'text-blue-400')}/>}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages... (Ctrl+K)"
                className="bg-transparent hover:border-none border-none hover:outline-none outline-none focus-visible:ring-offset-0 text-xs ml-2 w-full text-foreground placeholder-muted-foreground"
                autoFocus
              />
              <button onClick={() => {
                setSearchQuery('');
                setIsSearchExpanded(false);
              }} className="text-muted-foreground hover:text-foreground">
                <X size={14}/>
              </button>
            </>
          ) : (
            <button onClick={() => setIsSearchExpanded(true)}
                    className="text-muted-foreground hover:text-foreground p-1 h-[41px]">
              <Search size={16}/>
            </button>
          )}
        </div>

        <div className="w-px h-4 bg-white/10 mx-1 hidden md:block"
             style={{backgroundColor: 'rgba(var(--fg-rgb), 0.1)'}}/>

        {/* Zoom Controls */}
        <div className="hidden md:flex items-center rounded-full p-1 border backdrop-blur-sm mr-2"
             style={{borderColor: 'rgba(var(--fg-rgb), 0.1)'}}>
          <TooltipMini title="Decrease Font Size">
            <Button
              size="xs" variant="plain" onClick={() => adjustFontSize(-2)} disabled={fontSize <= 10}
              className="h-6 w-6 p-0 hover:text-white" style={{color: colors.foreground}}>
              <Minus size={16}/>
            </Button>
          </TooltipMini>
          <span className={cn('text-[12px] font-mono w-6 text-center')}
                style={{color: colors.foreground}}>{fontSize}</span>
          <TooltipMini title="Increase Font Size">
            <Button
              size="xs" variant="plain" onClick={() => adjustFontSize(2)} disabled={fontSize >= 34}
              className="h-6 w-6 p-0 hover:text-white" style={{color: colors.foreground}}>
              <Plus size={16}/>
            </Button>
          </TooltipMini>
          <TooltipMini title="Reset Font Size">
            <Button
              size="xs" variant="plain" onClick={() => resetFontSize()} disabled={fontSize == 16}
              className="h-6 w-6 p-0 hover:text-white" style={{color: colors.foreground}}>
              <RefreshCw size={14}/>
            </Button>
          </TooltipMini>
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <TooltipMini title="Toggle Width">
            <Button size="xs" variant="plain" onClick={toggleWidth} style={{color: colors.muted}}>
              {isWide ? <FoldHorizontal size={18}/> : <UnfoldHorizontal size={18}/>}
            </Button>
          </TooltipMini>
          <TooltipMini title="Full Screen">
            <Button size="xs" variant="plain" onClick={toggleFullScreen} style={{color: colors.muted}}>
              {isFullScreen ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}
            </Button>
          </TooltipMini>
          {onClearHistory && (
            <TooltipMini title="Clear History">
              <Button size="xs" variant="plain" onClick={onClearHistory} style={{color: colors.muted}}
                      className="text-red-400 hover:text-red-300">
                <BrushCleaning size={16}/>
              </Button>
            </TooltipMini>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      {/* Main Container */}
      <div
        className={cn(
          'relative h-full w-full flex flex-col transition-colors duration-300 overflow-hidden',
          isFullScreen ? 'fixed inset-0 z-50' : '',
        )}
        style={{
          backgroundColor: colors.background,
          color: colors.foreground,
          '--bg-rgb': colors.backgroundRgb,
          '--fg-rgb': colors.foregroundRgb,
        } as React.CSSProperties}
      >
        {/*
            FIXED HEADER LAYOUT:
            Using absolute positioning for the topbar ensures it never scrolls away
            regardless of flex layout quirks.
        */}
        <div className="absolute top-0 left-0 right-0 z-40 w-full">
          {renderTopBar()}
        </div>

        {/* Scrollable Area: FLEX-1 with TOP PADDING to clear the fixed header */}
        <div ref={scrollContainerRef}
             className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar scroll-smooth relative pt-20">
          <div
            className={`mx-auto flex flex-col transition-all duration-500 min-h-full pb-20 ${isWide ? 'max-w-[90%]' : 'max-w-4xl'} ${isFullScreen ? 'px-8 py-6' : 'px-4 py-6'}`}>

            {/* Main Chat / Content */}
            <div className="flex-1 flex flex-col min-h-0">
              {isLoading && !isChatMode ? (
                <div className="flex flex-col gap-4 mt-12 animate-pulse">
                  {[1, 2, 3].map(i => (
                    <div key={i}
                         className={cn('h-3 rounded-full w-full', i === 2 ? 'w-full' : i === 1 ? 'w-3/4' : 'w-5/6')}
                         style={{backgroundColor: 'rgba(var(--fg-rgb), 0.1)'}}/>
                  ))}
                </div>
              ) : isChatMode ? (
                <div className="flex flex-col">
                  {filteredMessages.map(msg => (
                    <MessageBubble
                      key={msg.id}
                      msg={msg}
                      isStreamingActive={false}
                      content={content}
                      userRole={userRole}
                      fontSize={fontSize}
                      editContent={editContent}
                      setEditContent={setEditContent}
                      handleEditStart={handleEditStart}
                      handleEditSave={handleEditSave}
                      handleEditCancel={handleEditCancel}
                      copiedId={copiedId}
                      handleCopy={handleCopy}
                      onDownload={onDownload}
                      onRegenerate={onRegenerate}
                      onEditMessage={onEditMessage}
                      onDeleteMessage={onDeleteMessage}
                      onSwitchVariant={onSwitchVariant}
                      onToggleDetails={() => {
                      }}
                      isDetailsExpanded={true}
                      onRate={handleRate}
                      onPinMessage={handlePin}
                      setEditingId={setEditingId}
                      searchQuery={searchQuery}
                    />
                  ))}

                  {(isStreaming || pendingContent) && (
                    <MessageBubble
                      key="streaming-buffer"
                      msg={{
                        id: 'streaming',
                        role: 'assistant',
                        aiPrompt: '',
                        originalPrompt: '',
                        enhancedPrompt: '',
                        model: config.model || 'AI',
                        enhancementType: '',
                        userRole: 'system',
                        timestamp: new Date(),
                        processingTime: 0,
                        rating: 0,
                        notes: null,
                        stats: {textData: [], tokenStats: []},
                      } as ChatMessage}
                      isStreamingActive={true}
                      content={content}
                      userRole={userRole}
                      fontSize={fontSize}
                      editContent={editContent}
                      setEditContent={setEditContent}
                      handleEditStart={handleEditStart}
                      handleEditSave={handleEditSave}
                      handleEditCancel={handleEditCancel}
                      copiedId={copiedId}
                      handleCopy={handleCopy}
                      onDownload={onDownload}
                      onRegenerate={onRegenerate}
                      onEditMessage={onEditMessage}
                      onDeleteMessage={onDeleteMessage}
                      onSwitchVariant={onSwitchVariant}
                      onToggleDetails={() => {
                      }}
                      isDetailsExpanded={false}
                      onRate={handleRate}
                      onPinMessage={handlePin}
                      setEditingId={setEditingId}
                      searchQuery={searchQuery}
                    />
                  )}
                  {/* Removed scrollEndRef, using scrollTop logic directly */}
                </div>
              ) : hasContent ? (
                <div className="prose prose-invert max-w-none flex-1 transition-all duration-200 overflow-hidden"
                     style={{fontSize: `${fontSize}px`, lineHeight: '1.7', color: colors.foreground}}>
                  <div className="animate-fade-in relative h-full overflow-y-auto custom-scrollbar">
                    <Streamdown
                      shikiTheme={isDarkTheme ? ['github-dark', 'github-dark'] : ['github-light', 'github-light']}
                      isAnimating={isStreaming}>{content}</Streamdown>
                    {isStreaming &&
                      <span className="inline-block w-2 h-4 bg-blue-400 ml-1 align-middle animate-blink"></span>}
                  </div>
                </div>
              ) : (
                <div
                  className="h-[50vh] flex flex-col items-center justify-center text-muted-foreground border border-white/5 rounded-3xl bg-gradient-to-b from-gray-900 to-black animate-fade-in backdrop-blur-md mx-4"
                  style={{
                    background: `linear-gradient(to bottom, ${colors.card}, ${colors.background})`,
                    borderColor: colors.border,
                  }}>
                  <div
                    className="p-8 rounded-full bg-black/40 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.2)] mb-6 animate-bounce">
                    <Sparkles size={48} className="text-blue-400"/>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight" style={{color: colors.foreground}}>Ready to
                    Create</h3>
                  <p className="text-lg max-w-md text-center leading-relaxed">Enter a prompt in editor below. The AI
                    will generate a comprehensive response here.</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Floating Scroll Controls (Top & Bottom) */}
        <div className="absolute bottom-20 right-8 flex flex-col items-end gap-3 z-20 transition-all duration-300">
          {showScrollTop && (
            <div className="animate-slide-up">
              <Button
                size="sm"
                onClick={() => scrollToTop('smooth')}
                className="rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-card/80 hover:bg-card text-foreground border border-border backdrop-blur-md w-10 h-10 p-0 flex items-center justify-center transition-transform hover:scale-110"
              >
                <ArrowUp size={18} strokeWidth={2.5}/>
              </Button>
            </div>
          )}

          {showScrollBottom && (
            <div className="animate-slide-up">
              <Button
                size="sm"
                onClick={() => scrollToBottom('smooth')}
                className="rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-blue-600 hover:bg-blue-500 text-white border-none w-10 h-10 p-0 flex items-center justify-center transition-transform hover:scale-110"
              >
                <ArrowDown size={18} strokeWidth={2.5}/>
              </Button>
            </div>
          )}
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div
            className={cn('absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 backdrop-blur-md border border-white/10',
              showToast.type === 'success' ? 'bg-green-600/90 text-white' : 'bg-blue-600/90 text-white',
            )}>
            {showToast.type === 'success' ? <Check size={20} className="text-white drop-shadow-md"/> :
              <Info size={20} className="text-white drop-shadow-md"/>}
            <span className="text-sm font-medium tracking-wide">{showToast.message}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ResponseArea;
