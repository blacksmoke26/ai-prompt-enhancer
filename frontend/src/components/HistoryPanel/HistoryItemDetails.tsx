/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {
  AlignLeft,
  Copy,
  Edit3,
  FileCode,
  GitFork,
  Hash,
  PieChart as PieChartIcon,
  Sparkles,
  Trash2,
  Type,
  X,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';

// ui components
import {Button} from '~/components/ui/Button';
import {Label} from '~/components/ui/Label';
import MarkdownPreview from '~/components/ui/Markdown';

// components
import DiffViewer from './DiffViewer';
import RatingStars from './RatingStars';

// types
import type {PromptHistory} from '~/types';
import {decodeHtml} from '~/utils/helpers.ts';

/**
 * Props interface for the HistoryItemDetails component, used to display detailed information about a selected history item.
 * Includes data visualization, analytics, copy, rating, and editing functionality.
 */
export interface HistoryItemDetailsProps {
  /**
   * The selected prompt history item to display detailed information for.
   */
  selectedItem: PromptHistory;

  /**
   * Whether a copy operation (e.g., enhanced prompt or JSON) has been successfully completed.
   */
  copied: boolean;

  /**
   * The current color mode for data visualization (light, dark, or system default).
   */
  dataColorMode: 'light' | 'dark' | 'system';

  /**
   * The value to display in the main content area (e.g., the enhanced prompt text).
   */
  value: string;

  /**
   * Handler function called when the user changes the rating of the selected item.
   * @param r The new rating value (e.g., 1 to 5).
   */
  onRatingChange(r: number): void;

  /**
   * Handler function called when the user clicks to copy the JSON representation of the selected item.
   */
  onJsonCopyClick(): void;

  /**
   * Handler function called when the user clicks to copy the enhanced prompt text.
   */
  onEnhancedPromptCopyClick(): void;

  /**
   * Handler function called when the user changes the note text in the note editor.
   * @param e The React change event from the input field.
   */
  onNoteChange(e: React.ChangeEvent<any>): void;

  /**
   * Handler function called when the user clicks to save the edited note.
   */
  onSaveNoteClick(): void;

  /**
   * Handler function called when the user clicks to fork the selected item.
   */
  onForkClick(): void;

  /**
   * Handler function called when the user clicks to delete the selected item.
   */
  onDeleteClick(): void;

  /**
   * Custom rendering function for chart or analytics entries.
   * @param entry The current data entry being rendered.
   * @param index The index of the entry in the array.
   * @returns A React JSX element representing the entry.
   */
  element(entry: any, index: number): React.JSX.Element;

  /**
   * Handler function called when the dialog is closed.
   */
  onDialogClose?(): void;
}

/**
 * A component that displays detailed information about a selected history item, including analytics, copy options, rating, and note editing.
 * Supports data visualization, enhanced prompt display, and interactive actions like fork and delete.
 * @example
 * <HistoryItemDetails
 *   selectedItem={selectedItem}
 *   copied={false}
 *   dataColorMode="light"
 *   analyticsData={{
 *     textData: [
 *       { name: 'Word Count', value: 150 },
 *       { name: 'Character Count', value: 900 }
 *     ],
 *     tokenStats: [
 *       { name: 'Input Tokens', value: 200, fill: '#3B82F6' },
 *       { name: 'Output Tokens', value: 300, fill: '#6366F1' }
 *     ]
 *   }}
 *   value="Enhanced prompt text here..."
 *   onRatingChange={(r) => console.log('New rating:', r)}
 *   onJsonCopyClick={() => console.log('Copied JSON')}
 *   onEnhancedPromptCopyClick={() => console.log('Copied enhanced prompt')}
 *   onNoteChange={(e) => setNote(e.target.value)}
 *   onSaveNoteClick={() => console.log('Saved note')}
 *   onForkClick={() => console.log('Forked item')}
 *   onDeleteClick={() => console.log('Deleted item')}
 *   element={(entry, index) => <div key={index}>{entry.name}: {entry.value}</div>}
 * />
 * @developerNotes
 * - Assumes the presence of a charting library (e.g., `recharts`, `chart.js`) for rendering analytics.
 * - The `element` function is intended for custom rendering of chart entries (e.g., tooltips, labels).
 * - The `analyticsData` structure supports both typed and generic data for flexibility.
 * - The `copied` flag is used to show/hide a success message after a copy operation.
 * - Designed to be used in conjunction with the HistoryView and Modals components.
 * - The `onRatingChange`, `onForkClick`, and `onDeleteClick` handlers should update the backend or state accordingly.
 */
const HistoryItemDetails: React.FC<HistoryItemDetailsProps> = (props) => {
  return (
    <>
      <div
        className="flex items-center justify-between p-6 border-b bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
        <div>
          <Dialog.Title
            className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2"><Sparkles
            className="h-5 w-5 text-purple-500"/> Prompt Details</Dialog.Title>
          <Dialog.Description
            className="text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {props.selectedItem.id}</Dialog.Description>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline" size="sm" onClick={props.onEnhancedPromptCopyClick}
            className="gap-2"><Copy className="h-4 w-4"/>{props.copied ? 'Copied!' : 'Copy'}</Button>
          <Button
            variant="outline" size="sm"
            onClick={props.onJsonCopyClick}
            className="gap-2"><FileCode className="h-4 w-4"/> JSON</Button>
          <Button onClick={props?.onDialogClose || (() => {})} variant="ghost" size="icon"><X
            className="h-4 w-4"/></Button>
        </div>
      </div>
      <div className="max-h-[70vh] p-6 overflow-y-auto bg-white dark:bg-gray-900">
        <Tabs.Root defaultValue="content" className="w-full">
          <Tabs.List
            className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full mt-4 mb-2 dark:bg-gray-800">
            <Tabs.Trigger
              value="content"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:text-white">Content</Tabs.Trigger>
            <Tabs.Trigger
              value="diff"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:text-white"><AlignLeft
              className="h-4 w-4 mr-2"/> Diff View</Tabs.Trigger>
            <Tabs.Trigger
              value="analytics"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:text-white"><PieChartIcon
              className="h-4 w-4 mr-2"/> Analytics</Tabs.Trigger>
            <Tabs.Trigger
              value="meta"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:text-white">Meta
              & Params</Tabs.Trigger>
            <Tabs.Trigger
              value="actions"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:text-white">Actions</Tabs.Trigger>
          </Tabs.List>
          <div className="p-6">
            <Tabs.Content value="content" className="space-y-6 mt-2">
              <div className="space-y-2"><Label
                className="text-gray-500 text-xs uppercase tracking-wider font-semibold dark:text-gray-400">Original
                Prompt</Label>
                <div
                  className="p-4 bg-slate-50 dark:bg-gray-800 rounded-lg text-sm text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700 font-mono">{props.selectedItem.originalPrompt ?? ''}</div>
              </div>
              <div className="space-y-2"><Label
                className="text-purple-600 text-xs uppercase tracking-wider font-bold dark:text-purple-400">Enhanced
                Output</Label>
                <div
                  className="rounded-lg border border-indigo-100 dark:border-gray-700 shadow-sm min-h-[200px]">
                  <MarkdownPreview
                    source={decodeHtml(props.selectedItem.enhancedPrompt ?? '')}
                    data-color-mode={props.dataColorMode}
                    style={{
                      color: props.dataColorMode === 'dark' ? '#e5e7eb' : '#1f2937',
                    }} className="p-4 min-h-[200px]"/></div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="diff" className="mt-2">
              <div
                className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4"><Label
                  className="text-gray-700 dark:text-gray-200 font-bold flex items-center gap-2"><AlignLeft
                  className="h-4 w-4 text-indigo-500"/>Line-by-Line Comparison</Label></div>
                <DiffViewer original={decodeHtml(props.selectedItem.originalPrompt ?? '')}
                            enhanced={decodeHtml(props.selectedItem.enhancedPrompt ?? '')}/>
              </div>
            </Tabs.Content>

            <Tabs.Content value="analytics" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-6">
                  <h3
                    className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Type className="h-4 w-4 text-indigo-500"/>Text Composition</h3><
                  ResponsiveContainer width="100%" height={200}><PieChart><Pie
                  data={props.selectedItem?.stats?.textData} cx="50%" cy="50%" innerRadius={30} outerRadius={80}
                  paddingAngle={5} dataKey="value" label>
                  {props.selectedItem?.stats?.textData?.map?.(props.element)}</Pie><Tooltip
                  contentStyle={{
                    backgroundColor: props.dataColorMode === 'dark' ? '#1f2937' : '#fff',
                    borderColor: props.dataColorMode === 'dark' ? '#374151' : '#e5e7eb',
                    borderRadius: '8px',
                  }}/><Legend/></PieChart></ResponsiveContainer></div>
                <div
                  className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg p-6">
                  <h3
                    className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Hash className="h-4 w-4 text-indigo-500"/>Token Usage vs Avg</h3>
                  <ResponsiveContainer width="100%" height={200}><BarChart
                    data={props.selectedItem?.stats?.tokenStats}><CartesianGrid
                    strokeDasharray="3 3" vertical={false}
                    className="stroke-gray-200 dark:stroke-gray-700"/><XAxis dataKey="name"
                                                                             className="text-xs text-gray-500 dark:text-gray-400"/><YAxis
                    className="text-xs text-gray-500 dark:text-gray-400"/><Tooltip contentStyle={{
                    backgroundColor: props.dataColorMode === 'dark' ? '#1f2937' : '#fff',
                    borderColor: props.dataColorMode === 'dark' ? '#374151' : '#e5e7eb',
                    borderRadius: '8px',
                  }}/><Bar dataKey="value" fill="#8b5cf6"
                           radius={[4, 4, 0, 0]}/></BarChart></ResponsiveContainer></div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="meta" className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Temperature</Label>
                  <div className="font-mono font-medium">{props.selectedItem.temperature ?? 'Default'}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Max Tokens</Label>
                  <div className="font-mono font-medium">{props.selectedItem.maxTokens ?? 'Default'}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Format</Label>
                  <div className="font-mono font-medium">{props.selectedItem.format || 'Text'}</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                  <Label className="text-xs text-gray-500 dark:text-gray-400">Tone</Label>
                  <div className="font-mono font-medium">{props.selectedItem.tone || 'N/A'}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rating</Label><RatingStars
                rating={props.selectedItem.rating ?? 0}
                onRatingChange={props.onRatingChange}/>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">Notes <Popover.Root>
                  <Popover.Trigger asChild><Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2"><
                    Edit3 className="h-3 w-3"/></Button>
                  </Popover.Trigger><Popover.Portal>
                  <Popover.Content
                    className="z-50 w-80 rounded-md border bg-white p-4 text-slate-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out dark:border-gray-700 dark:bg-gray-800 dark:text-slate-50">
                    <div className="space-y-2"><Label className="text-xs">Update Notes</Label>
                      <div className="space-y-2"><textarea
                        className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-indigo-400"
                        value={props.value} onChange={props.onNoteChange}/>
                        <div className="flex justify-end gap-2">
                          <Popover.Close asChild>
                            <Button size="sm" variant="ghost">Cancel</Button>
                          </Popover.Close>
                          <Button size="sm" onClick={props.onSaveNoteClick}>Save</Button>
                        </div>
                      </div>
                    </div>
                  </Popover.Content></Popover.Portal></Popover.Root></Label>
                <div
                  className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 rounded-lg text-sm text-yellow-800 dark:text-yellow-200 min-h-[80px]">{props.selectedItem.notes ??
                  <span
                    className="italic text-yellow-600 dark:text-yellow-400">No notes added.</span>}</div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="actions" className="space-y-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline"
                        className="h-20 flex-col gap-2 justify-center border-dashed border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={props.onForkClick}><GitFork
                  className="h-6 w-6"/><span>Fork / Reuse Prompt</span></Button>
              </div>
              <div
                className="p-4 bg-red-50 rounded-lg border border-red-100 dark:bg-red-900/10 dark:border-red-900/20">
                <Label className="text-red-700 dark:text-red-400">Danger Zone</Label>
              <p><Button
                variant="destructive" size="sm" className="mt-2" onClick={props.onDeleteClick}><Trash2
                className="h-4 w-4 mr-2"/> Delete Entry</Button></p></div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </div>
      <div
        className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
        <Button onClick={props?.onDialogClose || (() => {})} variant="plain">Close</Button>
      </div>
    </>
  );
};

export default HistoryItemDetails;
