import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Eye,
  EyeOff,
  Italic,
  List,
  ListOrdered,
  RefreshCw,
  Save,
  Share2,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Underline,
  Zap,
} from 'lucide-react';
import {Button} from './ui/Button';
import {Textarea} from './ui/Textarea';
import {Badge} from './ui/Badge';
import {Card, CardContent, CardHeader} from './ui/Card';
import {cn, copyToClipboard, downloadFile} from '~/utils/helpers';
import {PromptResponse} from '~/types';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  showActions?: boolean;
  response?: PromptResponse | null;
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  showStats?: boolean;
  maxLength?: number;
  showTemplates?: boolean;
  onEnhance?: (prompt: string) => void;
  showFormatting?: boolean;
  showPreview?: boolean;
  autoSave?: boolean;
  onAutoSave?: (prompt: string) => void;
}

export const AdvancedPromptEditor: React.FC<PromptEditorProps> = ({
                                                                    value,
                                                                    onChange,
                                                                    placeholder = 'Enter your prompt here...',
                                                                    label,
                                                                    error,
                                                                    disabled = false,
                                                                    showActions = true,
                                                                    response,
                                                                    className,
                                                                    onKeyPress,
                                                                    showStats = true,
                                                                    maxLength = 10000,
                                                                    showTemplates = false,
                                                                    onEnhance,
                                                                    showFormatting = false,
                                                                    showPreview = false,
                                                                    autoSave = false,
                                                                    onAutoSave,
                                                                  }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [tokenEstimate, setTokenEstimate] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWordCloud, setShowWordCloud] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [selectedText, setSelectedText] = useState('');
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    alignment: 'left',
    listType: 'none',
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const words = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = value.length;
    const lines = value.split('\n').length;

    setWordCount(words);
    setCharCount(chars);
    setLineCount(lines);

    const readingMinutes = Math.ceil(words / 200);
    setReadingTime(readingMinutes);

    const tokens = Math.ceil(chars / 4);
    setTokenEstimate(tokens);

    // Auto-save functionality
    if (autoSave && onAutoSave && value.trim()) {
      const now = new Date();
      if (value !== selectedText) {
        setAutoSaveStatus('saving');
        onAutoSave(value);
        setLastSaved(now);
        setTimeout(() => setAutoSaveStatus('saved'), 1000);
      }
      setSelectedText(value);
    }
  }, [value, autoSave, onAutoSave]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            setFormatting(prev => ({...prev, bold: !prev.bold}));
            break;
          case 'i':
            e.preventDefault();
            setFormatting(prev => ({...prev, italic: !prev.italic}));
            break;
          case 'u':
            e.preventDefault();
            setFormatting(prev => ({...prev, underline: !prev.underline}));
            break;
          case 'l':
            e.preventDefault();
            setFormatting(prev => ({...prev, alignment: 'left'}));
            break;
          case 'e':
            e.preventDefault();
            setFormatting(prev => ({...prev, alignment: 'center'}));
            break;
          case 'r':
            e.preventDefault();
            setFormatting(prev => ({...prev, alignment: 'right'}));
            break;
          case 'f11':
            e.preventDefault();
            setIsFullscreen(prev => !prev);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Word frequency analysis
  const getWordFrequency = useCallback(() => {
    const words = value.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    const frequency: Record<string, number> = {};

    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({word, count}));
  }, [value]);

  const handleCopy = async () => {
    await copyToClipboard(value);
  };

  const handleDownload = () => {
    const filename = `prompt-${new Date().toISOString().split('T')[0]}.txt`;
    downloadFile(value, filename);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Prompt',
          text: value,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await copyToClipboard(value);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const handleEnhance = () => {
    if (onEnhance) {
      onEnhance(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }

    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <Card className="border-2 border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">{label || 'Advanced Prompt Editor'}</h1>
              {autoSave && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {autoSaveStatus === 'saving' && <RefreshCw className="h-4 w-4 animate-spin text-blue-500"/>}
                    {autoSaveStatus === 'saved' && <CheckCircle className="h-4 w-4 text-green-500"/>}
                    {autoSaveStatus === 'idle' && <Save className="h-4 w-4"/>}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {autoSaveStatus === 'saving' && 'Auto-saving...'}
                    {autoSaveStatus === 'saved' && lastSaved && `Saved at ${lastSaved.toLocaleTimeString()}`}
                    {autoSaveStatus === 'idle' && 'Auto-save enabled'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {showFormatting && (
            <div className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg mb-4">
              <span className="text-sm font-medium">Formatting:</span>
              <div className="flex items-center space-x-1">
                <Button
                  variant={formatting.bold ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormatting(prev => ({...prev, bold: !prev.bold}))}
                >
                  <Bold className="h-4 w-4"/>
                </Button>
                <Button
                  variant={formatting.italic ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormatting(prev => ({...prev, italic: !prev.italic}))}
                >
                  <Italic className="h-4 w-4"/>
                </Button>
                <Button
                  variant={formatting.underline ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormatting(prev => ({...prev, underline: !prev.underline}))}
                >
                  <Underline className="h-4 w-4"/>
                </Button>
                <div className="h-px w-px bg-border mx-2"/>
                <Button
                  variant={formatting.alignment === 'left' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormatting(prev => ({...prev, alignment: 'left'}))}
                >
                  <AlignLeft className="h-4 w-4"/>
                </Button>
                <Button
                  variant={formatting.alignment === 'center' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormatting(prev => ({...prev, alignment: 'center'}))}
                >
                  <AlignCenter className="h-4 w-4"/>
                </Button>
                <Button
                  variant={formatting.alignment === 'right' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormatting(prev => ({...prev, alignment: 'right'}))}
                >
                  <AlignRight className="h-4 w-4"/>
                </Button>
                <div className="h-px w-px bg-border mx-2"/>
                <Button
                  variant={formatting.listType === 'bullet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormatting(prev => ({...prev, listType: 'bullet'}))}
                >
                  <List className="h-4 w-4"/>
                </Button>
                <Button
                  variant={formatting.listType === 'numbered' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFormatting(prev => ({...prev, listType: 'numbered'}))}
                >
                  <ListOrdered className="h-4 w-4"/>
                </Button>
              </div>
            </div>
          )}

          {showWordCloud && (
            <div className="p-4 bg-muted/30 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Word Frequency Analysis</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowWordCloud(false)}
                >
                  <EyeOff className="h-4 w-4"/>
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {getWordFrequency().map(({word, count}, index) => (
                  <div
                    key={word}
                    className="flex items-center justify-between p-2 bg-background rounded border border-border hover:bg-muted/50 transition-colors"
                    style={{fontSize: `${Math.max(12, Math.min(20, count * 2))}px`}}
                  >
                    <span className="font-medium">{word}</span>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={cn(
            'relative',
            isFullscreen && 'fixed inset-0 z-50 bg-background p-8',
          )}>
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              error={error}
              disabled={disabled}
              maxLength={maxLength}
              className={cn(
                'min-h-[400px] resize-none font-mono text-sm leading-relaxed transition-all duration-200',
                isFocused && 'ring-2 ring-ring ring-offset-2',
                disabled && 'opacity-50 cursor-not-allowed',
                isFullscreen && 'min-h-screen',
                formatting.bold && 'font-bold',
                formatting.italic && 'italic',
                formatting.underline && 'underline',
                formatting.alignment === 'center' && 'text-center',
                formatting.alignment === 'right' && 'text-right',
                formatting.listType === 'bullet' && 'list-disc',
                formatting.listType === 'numbered' && 'list-decimal',
              )}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={{
                textAlign: formatting.alignment as any,
                listStyleType: formatting.listType === 'numbered' ? 'decimal' : formatting.listType === 'bullet' ? 'disc' : 'none',
              }}
            />

            <div
              className="absolute bottom-4 right-4 flex items-center space-x-2 text-xs text-muted-foreground bg-background px-2 rounded">
              <span>{charCount}</span>
              <span className="text-muted-foreground">/</span>
              <span>{maxLength}</span>
              <div className="w-px h-px bg-muted-foreground mx-2 rounded"/>
              <span>•</span>
              <span>{tokenEstimate} tokens</span>
              <div className="w-px h-px bg-muted-foreground mx-2 rounded"/>
              <div className="flex items-center space-x-1">
                {autoSaveStatus === 'saving' && <RefreshCw className="h-3 w-3 animate-spin"/>}
                {autoSaveStatus === 'saved' && <CheckCircle className="h-3 w-3 text-green-500"/>}
                {autoSaveStatus === 'idle' && <Save className="h-3 w-3"/>}
              </div>
            </div>
          </div>

          {response && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2"/>
                  Enhanced Prompt
                </h4>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    <Target className="h-3 w-3 mr-1"/>
                    {response.model}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1"/>
                    {response.processingTime}ms
                  </Badge>
                  {response.tokensUsed && (
                    <Badge variant="outline" className="text-xs">
                      <Zap className="h-3 w-3 mr-1"/>
                      {response.tokensUsed} tokens
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1"/>
                    +{Math.round(((response.enhancedPrompt.length - value.length) / value.length) * 100)}%
                  </Badge>
                </div>
              </div>
              <div className="bg-muted/50 rounded-md p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed max-h-96 overflow-y-auto">
                    {response.enhancedPrompt}
                  </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div>Original: {value.length} chars</div>
                <div>Enhanced: {response.enhancedPrompt.length} chars</div>
                <div>Efficiency: {Math.round((response.enhancedPrompt.length / value.length) * 100)}%</div>
                <div>Time: {response.processingTime}ms</div>
                {response.tokensUsed && <div>Tokens: {response.tokensUsed}</div>}
              </div>
            </div>
          )}
        </CardContent>

        {showActions && (
          <div className="flex items-center justify-between py-6 px-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!value.trim()}
              >
                <Copy className="h-4 w-4 mr-2"/>
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!value.trim()}
              >
                <Download className="h-4 w-4 mr-2"/>
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                disabled={!value.trim()}
              >
                <Share2 className="h-4 w-4 mr-2"/>
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedText(value)}
                disabled={!value.trim()}
              >
                <Eye className="h-4 w-4 mr-2"/>
                Select
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClear}
                disabled={!value.trim()}
              >
                <Trash2 className="h-4 w-4 mr-2"/>
                Clear
              </Button>

              {onEnhance && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleEnhance}
                  disabled={!value.trim() || disabled}
                >
                  <Zap className="h-4 w-4 mr-2"/>
                  Enhance
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
