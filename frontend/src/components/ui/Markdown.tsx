/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import * as React from 'react';
import MarkdownPreview, {MarkdownPreviewProps} from '@uiw/react-markdown-preview';
import {getCodeString} from 'rehype-rewrite';
import mermaid from 'mermaid';

/**
 * Interface extending `MarkdownPreviewProps` from `@uiw/react-markdown-preview`.
 * Provides additional props for customizing the Markdown rendering behavior.
 */
export interface MarkdownProps extends MarkdownPreviewProps {
}

/**
 * A wrapper component for rendering Markdown content using `@uiw/react-markdown-preview`.
 * Forwards all props from `MarkdownPreviewProps` to the underlying Markdown preview component.
 * Includes support for Custom Mermaid Preview.
 * @example
 * <Markdown source="# Hello World" theme="dark" />
 * // Renders a dark-themed Markdown preview with "Hello World" as the content.
 * @note
 * - This component acts as a thin wrapper and does not add any new functionality.
 * - All props are forwarded to the underlying MarkdownPreview component.
 * - Ensure `@uiw/react-markdown-preview` is installed for this component to work.
 * - Mermaid support is included for rendering diagrams in markdown.
 */
const Markdown: React.FC<MarkdownProps> = (props) => {
  // Initialize mermaid
  React.useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true,
        bottomMarginAdj: 1,
        useMaxWidth: true,
        rightAngles: false,
        showSequenceNumbers: false,
      },
    });
  }, []);

  // Custom component to handle mermaid diagrams
  const CodeComponent = ({ inline, children = [], className, ...props }: any) => {
    const demoid = React.useRef(`dome${parseInt(String(Math.random() * 1e15), 10).toString(36)}`);
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    const isMermaid = className && /^language-mermaid/.test(className.toLocaleLowerCase());
    const code = props.node && props.node.children ? getCodeString(props.node.children) : children[0] || '';

    const reRender = React.useCallback(async () => {
      if (container && isMermaid) {
        try {
          const str = await mermaid.render(demoid.current, code);
          container.innerHTML = str.svg;
        } catch (error) {
          container.innerHTML = `<pre>${error}</pre>`;
        }
      }
    }, [container, isMermaid, code, demoid]);

    React.useEffect(() => {
      reRender();
    }, [reRender]);

    const refElement = React.useCallback((node: HTMLDivElement | null) => {
      if (node !== null) {
        setContainer(node);
      }
    }, []);

    if (isMermaid) {
      return (
        <React.Fragment>
          <code id={demoid.current} style={{ display: "none" }} />
          <code ref={refElement} data-name="mermaid" className="mermaid-diagram" />
        </React.Fragment>
      );
    }
    return <code className={String(className)}>{children}</code>;
  };

  // Merge the custom components with existing props
  const components = {
    ...props.components,
    code: CodeComponent,
  };

  return <MarkdownPreview {...props} components={components} />;
};

export default Markdown;
