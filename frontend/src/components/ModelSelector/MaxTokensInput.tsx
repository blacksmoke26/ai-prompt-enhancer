/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Hash} from 'lucide-react';
import {useAppStore} from '~/stores/appStore';
import {Input} from '~/components/ui/Input';

interface MaxTokensInputProps {
  className?: string;
}

const MaxTokensInput: React.FC<MaxTokensInputProps> = ({className = ''}) => {
  const {
    config,
    setConfig,
  } = useAppStore();

  return (
    <div className={className}>
      <label className="text-sm font-medium"><Hash size="16" className="display-inline"/> Max Tokens</label>
      <div className="space-x-3 pt-2">
        <Input
          type="number"
          value={config.maxTokens ?? 256}
          onChange={(e) => setConfig({maxTokens: parseInt(e.target.value, 10) || 0})}
          min={1}
          aria-label="Maximum number of tokens"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default MaxTokensInput;
