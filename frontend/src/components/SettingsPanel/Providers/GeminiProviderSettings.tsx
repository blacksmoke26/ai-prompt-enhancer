/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// components
import GenericProviderSettings, {ProviderSettingsProps} from './GenericProviderSettings';

/**
 * Props interface for the GeminiProviderSettings component.
 *
 * This interface defines all the properties required to manage the Gemini provider
 * configuration, including API key management, connection testing, and UI state handling.
 * Each property is designed to provide full control over the provider's settings and
 * real-time feedback on connection status.
 */
export type GeminiProviderSettingsProps = ProviderSettingsProps;

/**
 * Gemini Provider Settings Component
 *
 * This component provides a comprehensive interface for configuring and managing
 * the Gemini AI provider settings. It includes functionality for:
 * - Secure API key input with toggle visibility
 * - Real-time connection testing with visual feedback
 * - Persistent configuration storage through the localConfig state
 *
 * The component maintains its own internal state for UI elements while
 * synchronizing all configuration changes with the parent through the provided
 * state management functions. It integrates with the broader application's
 * configuration system to ensure consistent settings across all providers.
 */
const GeminiProviderSettings: React.FC<GeminiProviderSettingsProps> = (props) => {
  return (
    <GenericProviderSettings
      baseUrlInputProps={{placeholder: 'https://generativelanguage.googleapis.com/v1beta'}}
      providerName="gemini" configKey="gemini" {...props}/>
  );
};

export default GeminiProviderSettings;
