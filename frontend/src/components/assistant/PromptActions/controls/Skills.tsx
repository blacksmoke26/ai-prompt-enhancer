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

export interface SkillsProps {
}

const Skills: React.FC<SkillsProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['skills'];

  const [skills, setSkills] = useState<string[]>(Array.isArray(config?.skills) ? config.skills : []);

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Skills</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">Specific skills or capabilities that define the
          persona's expertise.</p>
      </label>
      <TagsInput
        placeholder="Add a skill"
        icon={<Tag size={17}/>}
        suggestions={[
          'data_analysis', 'machine_learning', 'statistics', 'web_development', 'software_engineering',
          'mobile_development', 'cloud_computing', 'devops', 'cybersecurity', 'network_security',
          'artificial_intelligence', 'deep_learning', 'natural_language_processing', 'computer_vision',
          'data_science', 'big_data', 'database_management', 'sql', 'nosql', 'data_visualization',
          'project_management', 'agile', 'scrum', 'leadership', 'communication', 'problem_solving',
          'critical_thinking', 'creativity', 'innovation', 'research', 'writing', 'public_speaking',
          'foreign_languages', 'time_management', 'teamwork', 'collaboration', 'negotiation',
          'customer_service', 'sales', 'marketing', 'digital_marketing', 'seo', 'content_creation',
          'social_media', 'graphic_design', 'ui_ux_design', 'product_design', 'user_research',
          'frontend_development', 'backend_development', 'full_stack_development', 'api_design',
          'system_design', 'microservices', 'blockchain', 'game_development', 'ar_vr',
          'robotics', 'iot', 'embedded_systems', 'algorithms', 'data_structures', 'operating_systems',
          'compilers', 'distributed_systems', 'concurrency', 'testing', 'quality_assurance',
          'debugging', 'version_control', 'git', 'ci_cd', 'containers', 'kubernetes', 'docker',
          'aws', 'azure', 'gcp', 'linux', 'unix', 'scripting', 'automation', 'technical_writing',
          'plumbing', 'carpentry', 'electrical_wiring', 'welding', 'automotive_repair',
          'cooking', 'baking', 'gardening', 'landscaping', 'farming', 'animal_husbandry',
          'accounting', 'bookkeeping', 'financial_planning', 'real_estate', 'insurance',
          'teaching', 'tutoring', 'counseling', 'social_work', 'nursing', 'caregiving',
          'driving', 'logistics', 'warehousing', 'construction', 'painting', 'cleaning'
        ]}
        value={skills} onChange={value => {
        setSkills(value);
        setConfig({skills: value}, true);
      }} className="mt-2"/>
    </div>
  );
};

export default Skills;
