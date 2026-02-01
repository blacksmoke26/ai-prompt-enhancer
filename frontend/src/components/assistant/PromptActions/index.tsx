/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useMemo, useRef, useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Flex, ScrollArea, Separator, Text} from '@radix-ui/themes';
import {Check, Download, Eye, EyeOff, Layers, RotateCcw, Search, Settings, Upload} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {
  providerIcons,
  CATEGORIZED_COMPONENTS,
  COMPONENT_CATEGORIES,
  VISIBILITY_PROFILES, componentsMaps,
} from '~/components/assistant/utils';

// ui components
import {Input} from '~/components/ui/Input';
import {Button} from '~/components/ui/Button';
import {Switch} from '~/components/ui/Switch';
import Popover from '~/components/ui/Popover';
import ItemsNavigator from '~/components/ui/ItemsNavigator';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '~/components/ui/Accordion';

// types
import type {VisibleComponents} from '~/types';

const PromptActions: React.FC = () => {
  const {visibleComponents, setVisibleComponents, config} = useAppStore();

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>('power');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleToggle = (componentId: string) => {
    // Create the new state object manually
    const newConfig = {
      ...visibleComponents,
      [componentId]: !visibleComponents[componentId],
    };

    // Pass the new object directly (not a function)
    setVisibleComponents(newConfig);

    // Optional: Mark profile as 'custom' since manual settings changed
    if (selectedProfile !== 'custom') {
      setSelectedProfile('custom');
    }
  };

  const handleApplyProfile = (profileKey: string) => {
    const profile = VISIBILITY_PROFILES?.[profileKey] ?? undefined;
    if (profile) {
      setVisibleComponents(profile.config);
      setSelectedProfile(profileKey);
    }
  };

  const handleBulkToggle = (state: boolean) => {
    const newConfig = Object.keys(visibleComponents).reduce((acc, key) => {
      acc[key] = state;
      return acc;
    }, {} as VisibleComponents);
    setVisibleComponents(newConfig);
  };

  const handleExportConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(visibleComponents, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'prompt-config.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (typeof json === 'object') {
          setVisibleComponents(json as VisibleComponents);
          setSelectedProfile('custom');
        }
      } catch (err) {
        console.error('Failed to import config', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // --- Derived State ---

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return CATEGORIZED_COMPONENTS;

    const lowerQuery = searchQuery.toLowerCase();
    const filtered: Record<string, string[]> = {};

    Object.entries(CATEGORIZED_COMPONENTS).forEach(([catId, components]) => {
      const matches = components.filter(compId =>
        compId.toLowerCase().includes(lowerQuery),
      );
      if (matches.length > 0) {
        filtered[catId] = matches;
      }
    });

    return filtered;
  }, [searchQuery]);

  // --- Render Helpers ---

  const renderPopover = (component: React.ReactNode, componentId: string, title: string) => {
    const Icon = providerIcons[componentId];
    const isVisible = visibleComponents[componentId];

    if (!isVisible) return null;

    return (
      <Popover
        key={componentId}
        closeOnOutsideClick={true}
        closeOnEscape={true}
        showHeader={false}
        showFooter={false}
        side="right"
        triggerTooltip={title}
        confirmDisabled={true}
        triggerIcon={Icon}
        triggerIconSize={17}
        triggerClassName={config[componentId] ? 'text-muted-foreground' : 'text-muted-foreground opacity-50'}
      >
        <div className="px-3 py-4 min-w-[300px]">
          {component}
        </div>
      </Popover>
    );
  };

  const renderActivePopovers = () => {
    const entries = Object.entries(visibleComponents);
    return entries.map(([componentId, isVisible]) => {
      if (!isVisible) return null;

      const item = componentsMaps[componentId];
      if (!item?.component) return null;

      const Component = item.component as React.FC;
      return renderPopover(<Component/>, componentId, item.title);
    }).filter(Boolean);
  };

  return (
    <Flex align="center" gap="1">
      <Popover
        triggerIcon={Layers}
        triggerTooltip="Visibility Profiles"
        side="bottom"
        align="start"
        showFooter={false}
        title="Visibility Profiles"
      >
        <div className="min-w-[220px]">
          {Object.entries(VISIBILITY_PROFILES).map(([key, profile]) => (
            <button
              key={key}
              onClick={() => handleApplyProfile(key)}
              className={`w-full text-left px-3 py-2 text-xs rounded-md flex flex-col gap-1 transition-colors ${
                selectedProfile === key ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
              }`}
            >
              <Flex justify="between" align="center">
                <span>{profile.label}</span>
                {selectedProfile === key && <Check size={12}/>}
              </Flex>
              <Text size="1" color="gray">{profile.desc}</Text>
            </button>
          ))}
        </div>
      </Popover>
      <div className="w-[7px]">{''}</div>
      {/* Main Settings Dialog */}
      <Dialog.Root open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <Dialog.Trigger asChild>
          <Button
            leftIcon={<Settings size={16}/>} variant="plain" size="xs"
            className="text-muted-foreground hover:text-foreground">{''}
          </Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"/>
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            <Dialog.Title className="flex items-center gap-2 text-lg font-semibold">
              <Settings size={18}/> Interface Configuration
            </Dialog.Title>

            {/* Top Actions Bar */}
            <Flex gap="2" mt="2" justify="between" align="center">
              <Input
                showFooter={false}
                leftIcon={<Search size={14}/>}
                placeholder="Search settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1" size="sm"
              />

              <Flex gap="1">
                <Button variant="plain" size="sm" onClick={() => handleBulkToggle(true)} title="Show All">
                  <Eye size={14}/>
                </Button>
                <Button variant="plain" size="sm" onClick={() => handleBulkToggle(false)} title="Hide All">
                  <EyeOff size={14}/>
                </Button>
                <Button variant="plain" size="sm" onClick={handleExportConfig} title="Export Config">
                  <Download size={14}/>
                </Button>
                <Button variant="plain" size="sm" onClick={handleImportClick} title="Import Config">
                  <Upload size={14}/>
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".json"
                  onChange={handleFileChange}
                />
              </Flex>
            </Flex>

            {/* Categorized List using Standalone Accordion */}
            <ScrollArea className="h-[400px] mt-2 pr-4">
              <Accordion type="multiple" defaultValue={Object.keys(filteredCategories)} className="w-full">
                {Object.entries(filteredCategories).map(([catId, componentIds]) => {
                  const categoryInfo = COMPONENT_CATEGORIES[catId];
                  if (!categoryInfo || componentIds.length === 0) return null;

                  return (
                    <AccordionItem value={catId} key={catId}>
                      <AccordionTrigger>
                        <Flex align="center" gap="2">
                          <categoryInfo.icon size={14} className="text-muted-foreground mr-2"/>
                          <span>{categoryInfo.label}</span>
                          <Text size="1" color="gray" className="ml-1">({componentIds.length})</Text>
                        </Flex>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {componentIds.map((componentId) => {
                            const Icon = providerIcons[componentId];
                            return (
                              <Flex key={componentId} align="center" justify="between"
                                    className="p-2 rounded hover:bg-muted/50 transition-colors">
                                <Switch
                                  label={(
                                    <>
                                      <Icon size={16} className="display-inline mr-1"/>
                                      <Text size="2" as="label" className="cursor-pointer flex-1 select-none">
                                        {componentId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                      </Text>
                                    </>
                                  )}
                                  checked={visibleComponents[componentId]}
                                  onCheckedChange={() => handleToggle(componentId)}
                                />
                              </Flex>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </ScrollArea>

            <Flex gap="3" mt="4" justify="end" pt="4" style={{borderTop: '1px solid var(--color-border)'}}>
              <Button variant="plain" leftIcon={<RotateCcw size={14} className="mr-1"/>} color="red" onClick={() => {
                handleApplyProfile('power');
                setIsSettingsOpen(false);
              }}>
                Reset All
              </Button>
              <Dialog.Close asChild>
                <Button size="sm">Close</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Separator orientation="vertical" className="h-4 ml-1 mx-1"/>

      <div className="max-w-[800px]">
        <ItemsNavigator hideScrollbar={true}
                        showTitle={false} size="sm"
                        bgTransparent={true} showProgress={false}>
          {/* Visibility Profiles Selector */}

          {/* Render Active Component Triggers */}
          {renderActivePopovers()}
        </ItemsNavigator>
      </div>
    </Flex>
  );
};

export default PromptActions;
