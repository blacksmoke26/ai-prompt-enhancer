/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Hourglass, OctagonX} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import SmartSelector from '~/components/ui/SmartSelector';
import {providerIcons} from '~/components/assistant/utils.ts';

/**
 * Tone input component for AI configuration
 * @component
 */
const EconomicDetailInput: React.FC = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['economicDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><Icon className="inline-flex display-inline" size="16"/> Economic Detail</strong>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of economic detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.economicDetail}
        options={[
          {label: '(unset)', value: '', description: 'Select an economic detail level'},
          {label: 'None', value: 'none', icon: Icon, description: 'No economic detail included'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'High-level economic concepts'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Basic economic overview'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Comprehensive economic breakdown'},
          {label: 'Micro', value: 'micro', icon: Icon, description: 'Individual and business-level economics'},
          {label: 'Macro', value: 'macro', icon: Icon, description: 'National and global economic systems'},
          {label: 'Developmental', value: 'developmental', icon: Icon, description: 'Economic growth and progress'},
          {label: 'International', value: 'international', icon: Icon, description: 'Cross-border economic activities'},
          {label: 'Monetary', value: 'monetary', icon: Icon, description: 'Money supply and financial systems'},
          {label: 'Fiscal', value: 'fiscal', icon: Icon, description: 'Government revenue and spending'},
          {label: 'Trade', value: 'trade', icon: Icon, description: 'Exchange of goods and services'},
          {label: 'Industrial', value: 'industrial', icon: Icon, description: 'Manufacturing and production sectors'},
          {label: 'Financial', value: 'financial', icon: Icon, description: 'Banking and investment activities'},
          {label: 'Labor', value: 'labor', icon: Icon, description: 'Workforce and employment dynamics'},
          {label: 'Resource', value: 'resource', icon: Icon, description: 'Natural and economic resources'},
          {label: 'Environmental', value: 'environmental', icon: Icon, description: 'Ecological economic factors'},
          {label: 'Public', value: 'public', icon: Icon, description: 'Public sector economics'},
          {
            label: 'Public works',
            value: 'public-works',
            icon: Icon,
            description: 'Infrastructure projects and services',
          },
          {label: 'Urban', value: 'urban', icon: Icon, description: 'City and metropolitan economics'},
          {label: 'Rural', value: 'rural', icon: Icon, description: 'Countryside and agricultural economics'},
          {label: 'Agricultural', value: 'agricultural', icon: Icon, description: 'Farming and food production'},
          {label: 'Market', value: 'market', icon: Icon, description: 'Market dynamics and competition'},
          {label: 'Capital', value: 'capital', icon: Icon, description: 'Financial assets and investment'},
          {
            label: 'Entrepreneurship',
            value: 'entrepreneurship',
            icon: Icon,
            description: 'Business creation and innovation',
          },
          {label: 'Innovation', value: 'innovation', icon: Icon, description: 'Technological and process advances'},
          {label: 'Digital', value: 'digital', icon: Icon, description: 'Digital economy and online activities'},
          {label: 'Knowledge', value: 'knowledge', icon: Icon, description: 'Information and intellectual capital'},
          {label: 'Global', value: 'global', icon: Icon, description: 'Worldwide economic integration'},
          {label: 'Regional', value: 'regional', icon: Icon, description: 'Geographic economic areas'},
          {label: 'Local', value: 'local', icon: Icon, description: 'Community-level economics'},
          {label: 'Sectoral', value: 'sectoral', icon: Icon, description: 'Industry-specific economics'},
          {
            label: 'Financial institutions',
            value: 'financial-institutions',
            icon: Icon,
            description: 'Banks and financial entities',
          },
          {
            label: 'Central banking',
            value: 'central-banking',
            icon: Icon,
            description: 'Monetary authority operations',
          },
          {label: 'Monetary policy', value: 'monetary-policy', icon: Icon, description: 'Money supply management'},
          {label: 'Fiscal policy', value: 'fiscal-policy', icon: Icon, description: 'Government financial decisions'},
        ]}
        onChange={(value) => {
          setConfig({economicDetail: value}, true);
        }}
      />
    </div>
  );
};

export default EconomicDetailInput;
