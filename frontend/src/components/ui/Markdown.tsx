/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import * as React from 'react';
import MarkdownPreview, { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import { getCodeString } from 'rehype-rewrite';
import mermaid, { MermaidConfig as MConfig } from 'mermaid';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// ============================================================================
// 1. Configuration & Types
// ============================================================================

/**
 * Advanced configuration for Mermaid diagrams.
 */
export interface MermaidConfig {
  /** Mermaid theme (e.g., 'default', 'dark', 'forest', 'neutral') */
  theme?: MConfig['theme'];
  /** Security level for mermaid (loose, strict) */
  securityLevel?: 'loose' | 'strict';
  /** Start On Load */
  startOnLoad?: boolean;
  /** Custom font family for diagrams */
  fontFamily?: string;
}

/**
 * Configuration for code block enhancements.
 */
export interface CodeBlockConfig {
  /** Enable "Copy to Clipboard" button on code blocks */
  enableCopyButton?: boolean;
  /** Text to display when code is copied */
  copyButtonText?: string;
  /** Duration in ms to show "Copied!" feedback */
  copyButtonFeedbackDuration?: number;
  /** Show line numbers */
  lineNumbers?: boolean;
  /** Enable detection of code file names (e.g., via comments) */
  enableFileName?: boolean;
}

/**
 * Configuration for Image handling.
 */
export interface ImageConfig {
  /** Enable lightbox modal when clicking images */
  enableLightbox?: boolean;
  /** Custom component to render images */
  component?: React.FC<React.ImgHTMLAttributes<HTMLImageElement>>;
  /** Enable lazy loading */
  lazy?: boolean;
}

/**
 * Configuration for Math/KaTeX support.
 */
export interface MathConfig {
  /** Enable KaTeX rendering */
  enable?: boolean;
  /** Throw errors on parse failure */
  throwOnError?: boolean;
  /** KaTeX display mode (block vs inline) */
  displayMode?: boolean;
  /** Custom error color */
  errorColor?: string;
  /** Custom delimiters for inline math (default: ['$', '$']) */
  inlineDelimiters?: [string, string];
}

/**
 * Configuration for Heading/Anchor features.
 */
export interface HeadingConfig {
  /** Enable anchor link generation */
  enableAnchorLink?: boolean;
  /** Custom anchor component */
  anchorComponent?: React.FC<{ id: string; children: React.ReactNode }>;
  /** Callback when heading is parsed */
  onHeadingParsed?: (heading: { level: number; id: string; text: string }) => void;
}

/**
 * Configuration for Link handling.
 */
export interface LinkConfig {
  /** Force external links to open in new tab */
  externalLinksNewTab?: boolean;
  /** Add rel="noopener noreferrer" to external links */
  noReferrer?: boolean;
}

/**
 * Extended Props interface for the Advanced Markdown Component.
 */
export interface MarkdownProps extends Omit<MarkdownPreviewProps, 'components' | 'rehypePlugins'> {
  /** Specific Mermaid Configuration */
  mermaidConfig?: MermaidConfig;
  /** Code block features */
  codeBlockConfig?: CodeBlockConfig;
  /** Image features */
  imageConfig?: ImageConfig;
  /** Math/KaTeX features */
  mathConfig?: MathConfig;
  /** Heading features */
  headingConfig?: HeadingConfig;
  /** Link features */
  linkConfig?: LinkConfig;

  /** Extra wrapper class name */
  className?: string;

  /** Element to sync scroll with (usually the source textarea) */
  scrollElement?: HTMLElement | null;
  /** Debounce time for scroll sync (ms) */
  scrollDebounce?: number;

  /**
   * Custom component overrides.
   * These are merged intelligently with the default advanced components.
   */
  components?: MarkdownPreviewProps['components'];
}

// ============================================================================
// 2. Utilities
// ============================================================================

/**
 * Generates a unique ID for elements, useful for Mermaid and Code blocks.
 */
const useUniqueId = (prefix: string = 'id') => {
  return React.useId() || `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Simple slugifier for generating valid IDs from text.
 */
const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/&/g, '-and-')   // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-');  // Replace multiple - with single -
};

// ============================================================================
// 3. Main Component
// ============================================================================

/**
 * Advanced Markdown Component
 *
 * Features:
 * - Mermaid Diagrams (Dynamic, Theme-able, Error Handling)
 * - KaTeX Math Support (Block & Inline)
 * - Copy to Clipboard on Code Blocks (with Line Numbers)
 * - Image Lightbox/Preview + Lazy Loading
 * - Scroll Synchronization (Debounced)
 * - Smart Heading Anchor Links
 * - External Link Safety
 * - Comprehensive Null/Undefined safety
 */
const Markdown = React.forwardRef<HTMLDivElement, MarkdownProps>((props, ref) => {
  // -- 3.1 Props Destructuring & Defaults --
  const {
    source = '',
    mermaidConfig = { theme: 'default', securityLevel: 'loose', startOnLoad: false },
    codeBlockConfig = {
      enableCopyButton: true,
      copyButtonText: 'Copy',
      copyButtonFeedbackDuration: 2000,
      lineNumbers: false
    },
    imageConfig = { enableLightbox: true, lazy: true },
    mathConfig = { enable: true, throwOnError: false, errorColor: '#cc0000' },
    headingConfig = { enableAnchorLink: true },
    linkConfig = { externalLinksNewTab: true, noReferrer: true },
    scrollElement,
    scrollDebounce = 50,
    className = '',
    components: userComponents = {},
    ...rest
  } = props;

  // -- 3.2 State Management --
  const [lightboxImage, setLightboxImage] = React.useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = React.useState<string | null>(null);
  const [copiedAnchorId, setCopiedAnchorId] = React.useState<string | null>(null);

  const scrollTimer = React.useRef<NodeJS.Timeout | undefined>(undefined);

  // -- 3.3 Mermaid Initialization --
  React.useEffect(() => {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: mermaidConfig.theme || 'default',
        securityLevel: mermaidConfig.securityLevel || 'loose',
        fontFamily: mermaidConfig.fontFamily || 'inherit',
        logLevel: mermaidConfig.theme === 'dark' ? 1 : 3,
        flowchart: { useMaxWidth: true, htmlLabels: true },
        themeVariables: {
          darkMode: mermaidConfig.theme === 'dark',
        },
      });
    } catch (e) {
      console.warn('Mermaid initialization failed', e);
    }
  }, [mermaidConfig]);

  // -- 3.4 Scroll Sync Logic --
  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (!scrollElement || !scrollDebounce) return;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    scrollTimer.current = setTimeout(() => {
      const target = e.currentTarget;
      const percentage = target.scrollTop / (target.scrollHeight - target.clientHeight);

      // Safety check for infinity/NaN
      if (Number.isFinite(percentage)) {
        scrollElement.scrollTop = percentage * (scrollElement.scrollHeight - scrollElement.clientHeight);
      }
    }, scrollDebounce);
  }, [scrollElement, scrollDebounce]);

  // -- 3.5 Clipboard Helpers --
  const handleCopyCode = React.useCallback(async (code: string, id: string) => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), codeBlockConfig.copyButtonFeedbackDuration);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  }, [codeBlockConfig]);

  const handleCopyAnchor = React.useCallback((id: string) => {
    if (!navigator.clipboard) return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedAnchorId(id);
      setTimeout(() => setCopiedAnchorId(null), 2000);
    });
  }, []);

  // -- 3.6 Component: Mermaid --
  const MermaidComponent = React.useCallback(({ node, inline, className, ...pProps }: any) => {
    const id = useUniqueId('mermaid');
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [error, setError] = React.useState<string | null>(null);
    const isMermaid = className && /^language-mermaid/i.test(className);

    // Extract code string safely
    const code = (pProps.node && pProps.node.children)
      ? getCodeString(pProps.node.children)
      : (Array.isArray(pProps.children) ? pProps.children[0] : pProps.children) || '';

    const renderDiagram = React.useCallback(async () => {
      if (!containerRef.current || !isMermaid || !code) return;

      try {
        // Reset content
        containerRef.current.innerHTML = '';

        // Dynamic ID for mermaid render
        const { svg } = await mermaid.render(id, code);

        // Ensure component is still mounted before update
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (err: any) {
        // Mermaid sometimes throws Syntax errors as strings
        console.error(err);
        if (containerRef.current) {
          setError(err?.str || err?.message || 'Mermaid syntax error');
        }
      }
    }, [code, isMermaid, id]);

    React.useEffect(() => {
      renderDiagram();
      // Cleanup function to prevent memory leaks if render is pending
      return () => {
        // Mermaid render doesn't have a direct cancel,
        // but we rely on the containerRef check in renderDiagram
      };
    }, [renderDiagram]);

    // Fallback/Default code block
    if (inline || !isMermaid) {
      return <code className={String(className)}>{pProps.children}</code>;
    }

    // Error State
    if (error) {
      return (
        <div style={{
          padding: '1rem',
          color: '#d32f2f',
          background: '#ffebee',
          border: '1px solid #ef9a9a',
          borderRadius: '4px',
          whiteSpace: 'pre-wrap'
        }}>
          <strong>Diagram Error:</strong>
          <br />{error}
          <details style={{ marginTop: '0.5rem' }}>
            <summary style={{ cursor: 'pointer' }}>View Source</summary>
            <pre style={{ marginTop: '0.5rem', background: 'rgba(0,0,0,0.05)', padding: '0.5rem' }}>
              {code}
            </pre>
          </details>
        </div>
      );
    }

    // Render State
    return <div ref={containerRef} className="mermaid-wrapper" style={{ display: 'flex', justifyContent: 'center' }} />;
  }, []);

  // -- 3.7 Component: Code Block --
  const CodeBlockComponent = React.useCallback(({ inline, className, children, node, ...pProps }: any) => {
    const isMermaid = className && /^language-mermaid/i.test(className);

    if (isMermaid) {
      return <MermaidComponent node={node} inline={inline} className={className} {...pProps} />;
    }

    if (inline) {
      return <code className={String(className)}>{children}</code>;
    }

    const id = useUniqueId('code');
    const codeText = getCodeString(node?.children || children) || '';

    // Handle Line Numbers
    let content = children;
    if (codeBlockConfig.lineNumbers && typeof children === 'string') {
      const lines = children.split('\n');
      content = lines.map((line: string, i: number) => (
        <React.Fragment key={i}>
          <span className="line-number" style={{ display: 'inline-block', width: '2em', userSelect: 'none', opacity: 0.5, textAlign: 'right', marginRight: '1em' }}>
            {i + 1}
          </span>
          {line}
          {'\n'}
        </React.Fragment>
      ));
    }

    return (
      <div className="code-block-wrapper" style={{ position: 'relative', marginBottom: '1.5rem' }}>
        {codeBlockConfig.enableCopyButton && (
          <button
            onClick={() => handleCopyCode(codeText, id)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              zIndex: 10,
              background: 'var(--color-bg-secondary, #f0f0f0)',
              border: '1px solid var(--color-border, #ddd)',
              borderRadius: '0 0 0 6px',
              padding: '4px 12px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              color: 'var(--color-text-primary, #333)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-hover, #e0e0e0)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-secondary, #f0f0f0)'}
          >
            {copiedCodeId === id ? '✓ Copied!' : (codeBlockConfig.copyButtonText || 'Copy')}
          </button>
        )}
        <pre className={String(className)} style={{ overflowX: 'auto' }}>
          <code className={String(className)}>{content}</code>
        </pre>
      </div>
    );
  }, [codeBlockConfig, copiedCodeId, handleCopyCode, MermaidComponent]);

  // -- 3.8 Component: Math (KaTeX) --
  const MathComponent = React.useCallback(({ inline, children }: any) => {
    const mathContent = Array.isArray(children) ? children[0] : children;

    if (!mathConfig.enable) {
      return <code className="math-fallback">{mathContent}</code>;
    }

    try {
      const html = katex.renderToString(mathContent, {
        displayMode: !inline,
        throwOnError: mathConfig.throwOnError || false,
        output: 'html', // Faster than mathml, browser renders it fine
      });

      return (
        <span
          dangerouslySetInnerHTML={{ __html: html }}
          style={{
            display: inline ? 'inline-block' : 'block',
            overflowX: 'auto',
            overflowY: 'hidden',
            margin: inline ? '0 2px' : '1em 0'
          }}
        />
      );
    } catch (error) {
      return (
        <span style={{ color: mathConfig.errorColor, borderBottom: `1px solid ${mathConfig.errorColor}` }}>
          {mathContent}
        </span>
      );
    }
  }, [mathConfig]);

  // -- 3.9 Component: Image (Lightbox + Lazy) --
  const ImageComponent = React.useCallback((imgProps: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt, ...rest } = imgProps;

    if (!src) return null;

    if (!imageConfig.enableLightbox) {
      return <img src={src} alt={alt ?? ''} loading={imageConfig.lazy ? 'lazy' : undefined} {...rest} />;
    }

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setLightboxImage(src);
    };

    return (
      <img
        src={src}
        alt={alt ?? ''}
        onClick={handleClick}
        loading={imageConfig.lazy ? 'lazy' : undefined}
        style={{
          cursor: 'zoom-in',
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '1rem auto'
        }}
        {...rest}
      />
    );
  }, [imageConfig]);

  // -- 3.10 Component: Headings (Anchor Links + Callbacks) --
  const HeadingComponent = React.useCallback(({ level, children, node, ...pProps }: any) => {
    // Extract text for ID generation
    const text = getCodeString(node?.children || children);
    const id = slugify(text);

    // Notify parent component for TOC generation
    React.useEffect(() => {
      if (text && headingConfig.onHeadingParsed) {
        headingConfig.onHeadingParsed({ level, id, text });
      }
    }, [text, level, id]);

    const handleAnchorClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleCopyAnchor(id);
    };

    // FIX FOR TS2604: Explicitly cast user component to React.ComponentType
    const UserHeading = userComponents?.[`h${level}`] as React.ComponentType<any> | undefined;

    if (UserHeading) {
      return <UserHeading level={level} children={children} {...pProps} id={id} />;
    }

    return (
      <React.Fragment>
        {headingConfig.enableAnchorLink && (
          <a
            href={`#${id}`}
            aria-label="Anchor"
            onClick={handleAnchorClick}
            style={{
              float: 'left',
              paddingRight: '4px',
              marginLeft: '-20px',
              lineHeight: '1',
              visibility: 'hidden', // Visible on hover via CSS ideally, but inline style for snippet
              color: 'inherit',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => e.currentTarget.style.visibility = 'visible'}
            onMouseLeave={(e) => e.currentTarget.style.visibility = 'hidden'}
          >
            {copiedAnchorId === id ? '🔗' : '🔗'}
          </a>
        )}
        {React.createElement(
          `h${level}`,
          {
            id,
            className: 'md-heading',
            style: { cursor: 'pointer', position: 'relative' },
            ...pProps
          },
          children
        )}
      </React.Fragment>
    );
  }, [headingConfig, handleCopyAnchor, copiedAnchorId, userComponents]);

  // -- 3.11 Component: Links (Security) --
  const LinkComponent = React.useCallback(({ href, children, ...pProps }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

    // FIX FOR TS2604: Explicitly cast user component to React.ComponentType
    const UserLink = userComponents?.a as React.ComponentType<any> | undefined;

    if (UserLink) {
      return <UserLink href={href} children={children} {...pProps} />;
    }

    const additionalProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {};
    if (isExternal) {
      if (linkConfig.externalLinksNewTab) additionalProps.target = '_blank';
      if (linkConfig.noReferrer) additionalProps.rel = 'noopener noreferrer';
    }

    return (
      <a href={href} {...additionalProps} {...pProps}>
        {children}
      </a>
    );
  }, [linkConfig, userComponents]);

  // -- 3.12 Merging Components --
  const mergedComponents = React.useMemo(() => {
    const base: any = {
      code: CodeBlockComponent,
      math: MathComponent,
      img: ImageComponent,
      a: LinkComponent,
    };

    // Add heading overrides
    [1, 2, 3, 4, 5, 6].forEach((level) => {
      base[`h${level}`] = (p: any) => <HeadingComponent level={level} {...p} />;
    });

    return {
      ...base,
      // Spread user components LAST to allow them to override tags explicitly if needed
      ...userComponents,
    };
  }, [CodeBlockComponent, MathComponent, ImageComponent, LinkComponent, HeadingComponent, userComponents]);

  return (
    <React.Fragment>
      <div
        ref={ref}
        className={`markdown-body ${className}`}
        onScroll={handleScroll}
      >
        <MarkdownPreview
          source={source}
          components={mergedComponents}
          {...rest}
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          role="presentation"
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
            backdropFilter: 'blur(5px)'
          }}
          onClick={() => setLightboxImage(null)}
          onKeyDown={(e) => e.key === 'Escape' && setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Zoomed Preview"
            style={{
              maxWidth: '95%',
              maxHeight: '95%',
              boxShadow: '0 0 50px rgba(0,0,0,0.5)',
              borderRadius: '8px',
              objectFit: 'contain'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer' }}
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </React.Fragment>
  );
});

Markdown.displayName = 'AdvancedMarkdown';

export default Markdown;
