import React, {useMemo} from 'react';
import {simpleMarkdownToHtml} from '~/components/TemplatesEditor/utils';
import {cn} from '~/utils/helpers';
import {Eye} from 'lucide-react';

/**
 * Props for the PreviewPanel component.
 */
export interface PreviewPanelProps {
  /** The markdown content to render. */
  content: string;
  /** Font size in pixels. */
  fontSize?: number;
  /** Additional CSS class names. */
  className?: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = (props) => {
  const {content, fontSize = 14, className} = props;

  const htmlContent = useMemo(() => simpleMarkdownToHtml(content), [content]);

  return (
    <div
      className={cn('flex-1 flex flex-col bg-background/50 border border-border rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5', className)}>
      <div className="h-10 border-b border-border bg-background/50 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <Eye size={14} className="text-primary"/>
          <span className="text-xs font-bold uppercase tracking-wide text-foreground">Preview</span>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto p-6 text-foreground leading-relaxed custom-scroll"
        style={{fontSize: `${fontSize}px`}}
        dangerouslySetInnerHTML={{__html: htmlContent}}
      />
    </div>
  );
};

export default PreviewPanel;
