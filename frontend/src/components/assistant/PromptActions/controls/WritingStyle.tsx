/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import {AdvancedInput} from '~/components/ui/AdvancedInput';

export interface WritingStyleProps {
}

const WritingStyle: React.FC<WritingStyleProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['writingStyle'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Writing Style</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The writing style of the output.</p>
      </label>
      <AdvancedInput
        className="mt-2"
        value={config.writingStyle}
        suggestions={[
          'formal', 'casual', 'academic', 'technical', 'creative', 'analytical', 'persuasive',
          'descriptive', 'narrative', 'expository', 'argumentative', 'journalistic', 'poetic', 'conversational',
          'humorous', 'satirical', 'dramatic', 'objective', 'subjective', 'scientific', 'legal', 'medical',
          'business', 'marketing', 'copywriting', 'storytelling', 'scriptwriting', 'blogging', 'essay writing',
          'report writing', 'speech writing', 'ghostwriting', 'editing', 'proofreading', 'researching',
          'translating', 'interpreting', 'summarizing', 'paraphrasing', 'outlining', 'brainstorming', 'critiquing',
          'reviewing', 'commenting', 'feedback', 'mentoring', 'teaching', 'public speaking', 'presentation',
          'negotiation', 'persuasion', 'debate', 'rhetoric', 'linguistics', 'grammar', 'syntax', 'vocabulary',
          'spelling', 'punctuation', 'style', 'tone', 'voice', 'clarity', 'conciseness', 'coherence', 'consistency',
          'flow', 'structure', 'organization', 'formatting', 'citations', 'referencing', 'plagiarism checking',
          'fact-checking', 'source evaluation', 'content creation', 'content strategy', 'content marketing',
          'seo writing', 'social media writing', 'email writing', 'newsletter writing', 'whitepaper writing',
          'case study writing', 'press release writing', 'advertising copy', 'product description',
          'UX writing', 'technical writing', 'grant writing', 'proposal writing', 'manual writing',
          'documentation', 'sop writing', 'policy writing', 'fiction writing', 'non-fiction writing',
          'memoir writing', 'biography writing', 'autobiography writing', 'travel writing', 'food writing',
          'fashion writing', 'lifestyle writing', 'health writing', 'fitness writing', 'finance writing',
          'investment writing', 'cryptocurrency writing', 'gaming writing', 'sports writing', 'music writing',
          'art writing', 'film writing', 'book writing', 'theater writing', 'comedy writing', 'horror writing',
          'romance writing', 'thriller writing', 'mystery writing', 'fantasy writing', 'sci-fi writing', 'historical writing',
          'crime writing', 'western writing', 'adventure writing', 'dystopian writing', 'utopian writing', 'magical realism',
          'surrealism', 'absurdist', 'experimental', 'avant-garde', 'minimalist', 'maximalist', 'stream of consciousness',
          'flash fiction', 'microfiction', 'short story', 'novella', 'novel', 'screenplay', 'teleplay', 'playwriting',
          'radio drama', 'podcast script', 'youtube script', 'tiktok script', 'instagram caption', 'twitter thread',
          'linkedin post', 'facebook post', 'reddit post', 'medium article', 'substack post', 'ghost post', 'wordpress post',
          'squarespace page', 'shopify product page', 'landing page', 'sales page', 'squeeze page', 'thank you page', 'about us page',
          'faq page', 'help center article', 'knowledge base article', 'tutorial', 'how-to guide', 'walkthrough', 'troubleshooting guide',
          'user manual', 'quick start guide', 'installation guide', 'configuration guide', 'api documentation', 'sdk documentation',
          'release notes', 'changelog', 'roadmap', 'vision statement', 'mission statement', 'value proposition', 'elevator pitch', 'tagline',
          'slogan', 'headline', 'subheadline', 'call to action', 'subject line', 'preview text', 'body copy', 'footer copy', 'disclaimer',
          'terms of service', 'privacy policy', 'cookie policy', 'refund policy', 'shipping policy', 'return policy', 'affiliate disclaimer',
          'copyright notice', 'legal disclaimer', 'medical disclaimer', 'financial disclaimer',
        ]}
        size="sm"
        allowClear
        onClearClick={() => setConfig({writingStyle: ''}, true)}
        maxLength={50}
        debounceMs={500}
        onChange={e => setConfig({writingStyle: e.target.value}, true)}/>
    </div>
  );
};

export default WritingStyle;
