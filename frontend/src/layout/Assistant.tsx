/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useRef, useState} from 'react';
import FileSaver from 'file-saver';

// services
import HistoryService from '~/services/HistoryService';

// hooks
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';
import useGenerateSteam from '~/hooks/useGenerateSteam';

// utils
import {copyToClipboard, decodeHtml} from '~/utils/helpers';

// components
import PromptEditor from '~/components/assistant/PromptEditor';
import ResponseArea, {type ChatMessage} from '~/components/assistant/ResponseArea';

// types
import type {PromptHistory, UserRole} from '~/types';

export interface AssistantProps {
  /**
   * Optional configuration object for the Assistant component.
   * Extend this interface to pass custom settings or overrides.
   */
  [key: string]: any; // Allow any additional properties
}

/**
 * Assistant Component
 *
 * Renders a chat-like interface for interacting with an AI model.
 * Handles user input processing, simulated AI response streaming,
 * response display with various display modes (wide/fullscreen),
 * and utilities for copying or downloading responses.
 *
 * Developer Notes:
 * - Simulates AI response using a timeout and text streaming mechanism.
 * - Uses FileSaver for downloading response content as markdown files.
 * - Manages fullscreen states for both input and response areas.
 */
const Assistant: React.FC<AssistantProps> = (props) => {
  const {setListByRoles, listByRoles, userRoles} = useDataStore();
  const {config, setConfig} = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const {content, isStreaming, stopStream, startStream, clearError} = useGenerateSteam();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWide, setIsWide] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false); // Response Full Screen
  const [isInputFullScreen, setIsInputFullScreen] = useState<boolean>(false); // Input Full Screen

  const intervalRef = useRef<number>(null);

  useEffect(() => {
    setMessages(normalizeMessages());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !isStreaming && setIsLoading(isStreaming);
  }, [isStreaming]);

  // Handle Escape key for both Full Screens
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (isInputFullScreen) setIsInputFullScreen(false);
        if (isFullScreen) setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullScreen, isInputFullScreen]);
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleOnSend = (userPrompt) => {
    setIsLoading(true);
    setIsInputFullScreen(false); // Exit input full screen when submitting
    setIsFullScreen(false);

    const message = {
      aiPrompt: userPrompt,
      role: 'user',
      id: 'user_' + Math.random(),
    } as ChatMessage;

    setMessages(x => x.concat(message));

    clearError();
    startStream(userPrompt);
  };


  const handleCopy = (text) => {
    copyToClipboard(text);
  };

  const handleDownload = (text) => {
    var blob = new Blob([text], {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(blob, `response-${new Date().getTime()}.md`);
  };

  const handleUserChange = async (role: UserRole) => {
    await setConfig({userRole: role.id}, true);
    const historyMessages = await HistoryService.getListByRole(role.key);
    setListByRoles(role.key, historyMessages);
    setMessages(normalizeMessages(historyMessages));
  };

  // Mutually exclusive logic: If Input is Full Screen, hide Response. If Response is Full Screen, hide Input.
  const showResponseArea = !isInputFullScreen;
  const showInputArea = !isFullScreen;

  const normalizeMessages = (messagesList: PromptHistory[] | undefined = undefined): ChatMessage[] => {
    const messages: ChatMessage[] = [];
    const role = userRoles.find(x => x.id === config.userRole)?.key!;

    const rawMessages = messagesList ?? listByRoles?.[role] ?? [];

    if (!rawMessages.length) return messages;

    for (const rawMessage of rawMessages) {
      messages.push({
        role: 'user',
        ...rawMessage,
        id: `${rawMessage.id}_user`,
        aiPrompt: decodeHtml(rawMessage.originalPrompt),
      });

      messages.push({
        role: 'assistant',
        ...rawMessage,
        id: `${rawMessage.id}_assistant`,
        aiPrompt: decodeHtml(rawMessage.enhancedPrompt),
      });
    }

    return messages;
  };

  return (
    <div className="flex flex-col h-screen w-full font-sans antialiased bg-background text-foreground">
      <div className="flex flex-col flex-1 overflow-hidden relative">
        {/* AI Response Area */}
        {showResponseArea && (
          <ResponseArea
            onStopStream={stopStream}
            content={content}
            isLoading={isLoading}
            messages={messages}
            isStreaming={isStreaming}
            isWide={isWide}
            toggleWidth={() => setIsWide(!isWide)}
            isFullScreen={isFullScreen}
            toggleFullScreen={() => setIsFullScreen(!isFullScreen)}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onUserChange={handleUserChange}
          />
        )}
      </div>
      {showInputArea && (
        <PromptEditor
          stopStreaming={stopStream}
          isStreaming={isStreaming}
          onSend={handleOnSend}
          isLoading={isLoading}
          isFullScreen={isInputFullScreen}
          toggleFullScreen={() => setIsInputFullScreen(!isInputFullScreen)}
        />
      )}
    </div>
  );
};

export default Assistant;
