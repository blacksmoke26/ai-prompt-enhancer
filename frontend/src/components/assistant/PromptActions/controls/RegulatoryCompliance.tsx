/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';
import {Tag} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import TagsInput from '~/components/ui/TagsInput';

export interface RegulatoryComplianceProps {
}

const RegulatoryCompliance: React.FC<RegulatoryComplianceProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['regulatoryCompliance'];

  const [values, setValues] = useState<string[]>(Array.isArray(config?.regulatoryCompliance) ? config.regulatoryCompliance : []);

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Regulatory Compliance</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">Regulatory compliance requirements for the
          output.</p>
      </label>
      <TagsInput
        placeholder="Add a regulatory compliance"
        icon={<Tag size={17}/>}
        suggestions={[
          'GDPR',
          'HIPAA',
          'SOX',
          'PCI-DSS',
          'FERPA',
          'GLBA',
          'COPPA',
          'CCPA',
          'LGPD',
          'POPIA',
          'NYDFS Cybersecurity',
          'ISO 27001',
          'ISO 27701',
          'NIST SP 800-53',
          'NIST CSF',
          'CIS Controls',
          'SOC 1',
          'SOC 2',
          'SOC 3',
          'HITRUST CSF',
          'FISMA',
          'DFARS',
          'ITAR',
          'EAR',
          'GDPR Article 30',
          'HIPAA HITECH',
          '21 CFR Part 11',
          'EU AI Act',
          'Algorithmic Accountability Act',
          'ePrivacy Directive',
          'CalOPPA',
          'PIPEDA',
          'DPDP Act 2023',
          'PDPA',
          'PDPO',
          'LDPD',
          'FADP',
          'KGSC',
          'APPI',
          'PPPA',
        ]}
        value={values} onChange={value => {
        setValues(value);
        setConfig({regulatoryCompliance: value}, true);
      }} className="mt-2"/>
    </div>
  );
};

export default RegulatoryCompliance;
