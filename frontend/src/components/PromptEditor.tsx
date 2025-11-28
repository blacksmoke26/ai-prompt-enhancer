import React, { useState, useRef, useEffect } from 'react';
import { Copy, Download, Share2, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { Badge } from './ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { cn, copyToClipboard, downloadFile } from '../utils/helpers';
import { PromptResponse } from '../types';

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
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
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
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const words = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    setCharCount(value.length);
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
      } catch (error: any) {
        console.log('Error sharing:', error);
      }
    } else {
      await copyToClipboard(value);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Restore cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{label || 'Prompt Editor'}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {wordCount} words
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {charCount} chars
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            error={error}
            disabled={disabled}
            className={cn(
              'min-h-[200px] resize-none font-mono text-sm',
              isFocused && 'ring-2 ring-ring ring-offset-2',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onKeyDown={onKeyPress || handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          {/* Character count indicator */}
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background px-1 rounded">
            {charCount}/10000
          </div>
        </div>

        {/* Response Display */}
        {response && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Enhanced Prompt</h4>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {response.model}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {response.processingTime}ms
                </Badge>
                {response.tokensUsed && (
                  <Badge variant="outline" className="text-xs">
                    {response.tokensUsed} tokens
                  </Badge>
                )}
              </div>
            </div>
            <div className="bg-muted/50 rounded-md p-3">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {response.enhancedPrompt}
              </pre>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!value.trim()}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={!value.trim()}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                disabled={!value.trim()}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={!value.trim()}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
