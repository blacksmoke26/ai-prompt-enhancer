/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import ISO6391 from 'iso-639-1';
import {OctagonX} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import SmartSelector from '~/components/ui/SmartSelector';

export interface LanguageProps {
}

const Language: React.FC<LanguageProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['language'];

  const languages = ISO6391.getAllCodes().map(code => ({
    label: `${ISO6391.getName(code)} (${ISO6391.getNativeName(code)})`, value: code, icon: Icon
  }))

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Language</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The language code for the output (ISO 639-1 standard).</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.language}
        options={[
          {label: '(unset)', value: '', icon: OctagonX},
        ].concat(languages)}
        onChange={(value) => {
          setConfig({language: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default Language;
