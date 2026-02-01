/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {SaveOff} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import {Switch} from '~/components/ui/Switch';

const HeadingHierarchy: React.FC = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['headingHierarchy'];

  const handleChange = (checked: boolean) => {
    // Update the config in store
    setConfig({headingHierarchy: checked}, true);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Heading Hierarchy</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">Whether to include a hierarchical structure of headings in the output.</p>
      </label>
      <div className="flex items-center space-x-2 pt-2">
        <Switch label="Include a hierarchical structure "
          checked={config.headingHierarchy}
          onCheckedChange={handleChange}
          id="heading-hierarchy"
        />
      </div>
    </div>
  );
};

export default HeadingHierarchy;
