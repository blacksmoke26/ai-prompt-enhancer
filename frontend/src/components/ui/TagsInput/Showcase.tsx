/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useEffect } from 'react';
import TagsInput from './index';

const PRESETS = {
  tech: [
    'React',
    'Vue',
    'Angular',
    'Svelte',
    'Next.js',
    'Nuxt',
    'Remix',
    'Node.js',
    'TypeScript',
    'Tailwind',
    'Vite',
    'Webpack',
    'GraphQL',
    'tRPC',
    'Prisma',
  ],
  fruits: [
    'Apple',
    'Apricot',
    'Avocado',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Coconut',
    'Date',
    'Dragonfruit',
    'Elderberry',
    'Fig',
    'Grape',
    'Guava',
    'Honeydew',
    'Kiwi',
    'Lemon',
    'Lime',
    'Mango',
    'Melon',
  ],
  roles: [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Engineer',
    'UI/UX Designer',
    'Product Manager',
    'DevOps Engineer',
    'QA Engineer',
    'Engineering Manager',
  ],
};

const Showcase: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTab, setTab] = useState<'baseline' | 'variants' | 'sizes' | 'advanced'>('baseline');

  const baselineState = useState(['React', 'TypeScript']);
  const variantState = useState<string[]>([]);
  const sizeState = useState<string[]>([]);
  const advancedState = useState<string[]>([]);

  // Simple icon components for demo
  const TagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );

  const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 flex justify-center">
      <main className="w-full max-w-3xl space-y-10">
        <header className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2.5">
              <span className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-indigo-400 bg-clip-text text-transparent">
                Super Tags Input
              </span>
              <span className="text-xl md:text-2xl text-muted-foreground font-normal">
                Demo
              </span>
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Highly configurable React tags input built with Tailwind.
            </p>
          </div>
          <button
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            className="p-2.5 rounded-full bg-accent hover:bg-accent/80 text-foreground shadow-sm hover:shadow transition-all"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </header>

        {/* TABS */}
        <section className="rounded-xl border border-border bg-card p-1 flex flex-wrap gap-1">
          {(['baseline', 'variants', 'sizes', 'advanced'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                activeTab === t
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </section>

        {/* BASELINE */}
        {activeTab === 'baseline' && (
          <section className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Baseline form integration
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  Common props
                </span>
              </div>
              <TagsInput
                id="baseline-tags"
                name="tags"
                label="Technologies"
                description="Choose technologies you are comfortable with."
                helperText="Press Enter to add, Backspace to remove the last tag."
                value={baselineState[0]}
                onChange={baselineState[1]}
                suggestions={PRESETS.tech}
                icon={<TagIcon />}
                iconPosition="left"
                radius="md"
                maxItems={8}
                maxLength={24}
                onValidate={(tag) => /^[A-Za-z0-9.\-+# ]+$/.test(tag)}
                onAddTag={(tag) => console.log('Added:', tag)}
                onRemoveTag={(tag) => console.log('Removed:', tag)}
              />
              <div className="text-[11px] text-muted-foreground bg-muted/50 rounded px-2.5 py-1.5 font-mono">
                State: {JSON.stringify(baselineState[0])}
              </div>
            </div>
          </section>
        )}

        {/* VARIANTS */}
        {activeTab === 'variants' && (
          <section className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Variants</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  outline | filled | ghost | plain
                </span>
              </div>

              {(['outline', 'filled', 'ghost', 'plain'] as const).map(
                (variant) => (
                  <div key={variant} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {variant}
                      </span>
                    </div>
                    <TagsInput
                      size="md"
                      variant={variant}
                      radius="md"
                      value={variantState[0]}
                      onChange={variantState[1]}
                      placeholder={`Variant: ${variant}`}
                      suggestions={PRESETS.roles}
                    />
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* SIZES */}
        {activeTab === 'sizes' && (
          <section className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Sizes & radius</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  xs | sm | md | lg | xl
                </span>
              </div>

              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {size}
                    </span>
                  </div>
                  <TagsInput
                    size={size}
                    variant="outline"
                    radius="md"
                    value={sizeState[0]}
                    onChange={sizeState[1]}
                    placeholder={`Size: ${size}`}
                    suggestions={PRESETS.fruits}
                  />
                </div>
              ))}

              <div className="pt-2">
                <p className="text-xs text-muted-foreground mb-2">
                  Radius examples (size md):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['none', 'sm', 'md', 'lg', 'full'] as const).map(
                    (r) => (
                      <TagsInput
                        key={r}
                        size="md"
                        variant="outline"
                        radius={r}
                        value={[]}
                        onChange={() => {}}
                        placeholder={r}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ADVANCED */}
        {activeTab === 'advanced' && (
          <section className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Advanced playground
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  Many props, live state
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <TagsInput
                  id="adv-tags"
                  name="advanced"
                  label="Skills"
                  description="Select up to 8 skills. Each tag max 20 characters."
                  helperText="Use keyboard arrows to choose suggestions."
                  value={advancedState[0]}
                  onChange={advancedState[1]}
                  suggestions={PRESETS.tech}
                  placeholder="Start typing..."
                  icon={<SparklesIcon />}
                  iconPosition="left"
                  size="lg"
                  variant="outline"
                  radius="md"
                  maxItems={8}
                  maxLength={20}
                  allowDuplicates={false}
                  allowEdit
                  loading={false}
                  error={undefined}
                  required
                  autoFocus={false}
                  full
                  onValidate={(tag) => tag.length >= 2}
                  onAddTag={(tag) => console.log('Added:', tag)}
                  onRemoveTag={(tag) => console.log('Removed:', tag)}
                />
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    You can:
                  </p>
                  <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                    <li>Type to see suggestions (auto-complete)</li>
                    <li>Press Enter to add current input</li>
                    <li>Press Arrow keys to navigate suggestions</li>
                    <li>Tab to select highlighted suggestion</li>
                    <li>Backspace to remove last tag</li>
                    <li>Double-click a tag to edit it</li>
                    <li>Clear all tags via trash icon at right</li>
                  </ul>
                  <div className="text-[11px] text-muted-foreground bg-muted/50 rounded px-2.5 py-1.5 font-mono mt-2">
                    State: {JSON.stringify(advancedState[0])}
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-medium">
                  Variations using the same component
                </h3>
                <TagsInput
                  label="Loading state"
                  description="Simulating an async operation."
                  placeholder="Type something…"
                  loading
                  value={[]}
                  onChange={() => {}}
                  size="sm"
                  variant="filled"
                />
                <TagsInput
                  label="Error state"
                  description="Validation will fail for short tags."
                  helperText="Tags must be at least 3 characters."
                  placeholder="Try short tag (error)"
                  value={[]}
                  onChange={() => {}}
                  suggestions={PRESETS.fruits}
                  size="md"
                  variant="outline"
                  onValidate={(tag) => tag.length >= 3}
                />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Showcase;
