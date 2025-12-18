/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import * as React from 'react';
import MarkdownPreview, {MarkdownPreviewProps} from '@uiw/react-markdown-preview';

/**
 * Interface extending `MarkdownPreviewProps` from `@uiw/react-markdown-preview`.
 * Provides additional props for customizing the Markdown rendering behavior.
 */
export interface MarkdownProps extends MarkdownPreviewProps {
}

/**
 * A wrapper component for rendering Markdown content using `@uiw/react-markdown-preview`.
 * Forwards all props from `MarkdownPreviewProps` to the underlying Markdown preview component.
 * @example
 * <Markdown source="# Hello World" theme="dark" />
 * // Renders a dark-themed Markdown preview with "Hello World" as the content.
 * @note
 * - This component acts as a thin wrapper and does not add any new functionality.
 * - All props are forwarded to the underlying MarkdownPreview component.
 * - Ensure `@uiw/react-markdown-preview` is installed for this component to work.
 */
const Markdown: React.FC<MarkdownProps> = (props) => {
  return <MarkdownPreview {...props} />;
};

export default Markdown;
