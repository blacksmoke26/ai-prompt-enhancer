import React, { useState } from 'react';
import { Play, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { PromptEditor } from './PromptEditor';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Alert, AlertDescription } from './ui/Alert';
import { usePromptEnhancer } from '../hooks/usePromptEnhancer';
import { useAppStore } from '../stores/appStore';
import { PromptResponse } from '../types';

export const PromptEnhancer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<PromptResponse | null>(null);
  
  const { enhancePrompt, loading, error, clearError } = usePromptEnhancer();
  const { selectedModel } = useAppStore();

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    
    clearError();
    const result = await enhancePrompt(prompt);
    
    if (result) {
      setResponse(result);
    }
  };

  const handleReset = () => {
    setPrompt('');
    setResponse(null);
    clearError();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleEnhance();
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Editor */}
      <PromptEditor
        value={prompt}
        onChange={setPrompt}
        label="Enter Your Prompt"
        placeholder="Type your prompt here and press Ctrl+Enter to enhance..."
        error={error || undefined}
        disabled={loading}
        response={response}
        onKeyPress={handleKeyPress}
      />

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={handleEnhance}
          disabled={!prompt.trim() || !selectedModel || loading}
          size="lg"
          className="min-w-32"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Enhance Prompt
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={loading}
          size="lg"
        >
          Reset
        </Button>
      </div>

      {/* Quick Stats */}
      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enhancement Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {response.processingTime}ms
                </div>
                <div className="text-sm text-muted-foreground">Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {response.tokensUsed || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">Tokens Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {response.originalPrompt.length}
                </div>
                <div className="text-sm text-muted-foreground">Original Length</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {response.enhancedPrompt.length}
                </div>
                <div className="text-sm text-muted-foreground">Enhanced Length</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};