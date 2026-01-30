/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useCallback, useState} from 'react';
import {AdvancedInput} from './index'; // Assuming component is in the same directory
import {Bug, CheckCircle, Code, DollarSign, Layers, Lock, Search, Zap} from 'lucide-react';
import {cn} from '~/utils/helpers';

// --- Mock cn utility if not present ---
// const cn = (...classes: (string | undefined | boolean | null)[]) => {
//   return classes.filter(Boolean).join(' ');
// };

// --- Helper Components ---

const SectionHeader: React.FC<{icon: React.ElementType; title: string; description?: string}> = ({icon: Icon, title, description}) => (
  <div className="flex items-center gap-3 mb-6 border-b pb-4 border-gray-200 dark:border-gray-800">
    <div className="p-2 bg-primary/10 rounded-lg text-primary">
      <Icon className="w-5 h-5"/>
    </div>
    <div>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  </div>
);

const Card: React.FC<{title: string; children: React.ReactNode; className?: string}> = ({title, children, className}) => (
  <div className={cn('border rounded-xl p-6 bg-card shadow-sm space-y-4', className)}>
    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{title}</h3>
    {children}
  </div>
);

// --- 1. Stress Test Section ---

const StressTestSection: React.FC = () => {
  const [bulkValues, setBulkValues] = useState<Record<string, string>>({});
  const [isRerendering, setIsRerendering] = useState(false);

  // Initialize 50 inputs
  const inputs = Array.from({length: 50}, (_, i) => `input-${i}`);

  const handleChange = useCallback((id: string) => (val: string) => {
    setBulkValues(prev => ({...prev, [id]: val}));
  }, []);

  const triggerRerender = () => {
    setIsRerendering(true);
    // Force a large state update
    const updates = inputs.reduce((acc, id) => {
      acc[id] = Math.random().toString(36).substring(7);
      return acc;
    }, {} as Record<string, string>);
    setBulkValues(updates);
    setTimeout(() => setIsRerendering(false), 500);
  };

  return (
    <section>
      <SectionHeader icon={Zap} title="Stress & Performance Test" description="Rendering 50 complex inputs simultaneously."/>

      <div className="mb-4 flex gap-3">
        <button
          onClick={triggerRerender}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 active:scale-95 transition-transform"
        >
          Mass Update Value (Rerender All)
        </button>
        <div className="flex items-center text-sm text-muted-foreground">
          {isRerendering ? "Updating..." : "Ready"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2 border rounded-lg bg-muted/20">
        {inputs.map((id) => (
          <AdvancedInput
            key={id}
            label={`Input #${id.split('-')[1]}`}
            value={bulkValues[id]}
            onValueChange={handleChange(id)}
            size="sm"
            allowClear
            leftIcon={<Search className="w-3 h-3"/>}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        * Rendering 50 interactive components with internal state, refs, and event handlers.
      </p>
    </section>
  );
};

// --- 2. Debug & Monitoring Section ---

const DebugSection: React.FC = () => {
  const [debouncedValue, setDebouncedValue] = useState('');
  const [log, setLog] = useState<string[]>([]);

  // --- Debounce Test ---
  // We track how many times onValueChange actually fires
  const [debounceFireCount, setDebounceFireCount] = useState(0);

  const handleDebouncedChange = (val: string) => {
    setDebouncedValue(val);
    setDebounceFireCount(c => c + 1);
  };

  // --- Event Log Test ---
  const addLog = (msg: string) => {
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  return (
    <section>
      <SectionHeader icon={Bug} title="Debugging & Validation" description="Monitoring internal behavior, events, and edge cases."/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Debounce Monitor */}
        <Card title="Debounce Logic (500ms)">
          <AdvancedInput
            label="Type rapidly here..."
            onValueChange={handleDebouncedChange}
            debounceMs={500}
            helperText="Value updates only after 500ms of silence"
          />
          <div className="mt-2 text-xs font-mono bg-muted p-2 rounded">
            <div>Current Value: {debouncedValue || <span className="opacity-50">Empty</span>}</div>
            <div className="mt-1 text-blue-600">Callback Fires: {debounceFireCount} times</div>
          </div>
        </Card>

        {/* Edge Cases */}
        <Card title="Constraints & Limits">
          <AdvancedInput
            label="Max Length: 10"
            maxLength={10}
            showCharCount
            shakeOnLimitReach
            defaultValue="01234567890" // Exceeds limit on load
            helperText="Shakes animation when limit reached"
          />
          <div className="mt-4 pt-4 border-t">
            <AdvancedInput
              label="Numeric Only"
              allowNumericOnly
              placeholder="Try typing letters..."
              inputRegex={/^[a-z]*$/} // Lowercase only test
              uppercase // Conflict test: Uppercase vs Regex (Regex usually wins in implementation, lets see)
            />
          </div>
        </Card>

        {/* Event Logger */}
        <Card title="Event Stream Logger" className="md:col-span-2">
          <div className="flex gap-4">
            <AdvancedInput
              label="Log Events"
              onFocus={() => addLog('Focus')}
              onBlur={() => addLog('Blur')}
              onChange={() => addLog('Change (Raw)')}
              onValueChange={(v) => addLog(`Value Change: ${v}`)}
              onEnterPress={() => addLog('Enter Pressed')}
              placeholder="Focus, Type, Blur..."
            />
          </div>
          <div className="h-32 bg-black text-green-400 font-mono text-xs p-2 rounded overflow-y-auto mt-2">
            {log.length === 0 && <span className="opacity-50">// Waiting for events...</span>}
            {log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </Card>
      </div>
    </section>
  );
};

// --- 3. Features Showcase ---

const PlaygroundSection: React.FC = () => {
  // States for various demos
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('');
  const [tags, setTags] = useState(['React', 'Tailwind']);
  const [cardNum, setCardNum] = useState('');
  const [dateVal, setDateVal] = useState('');
  const [ssnVal, setSsnVal] = useState('');

  return (
    <section>
      <SectionHeader icon={Layers} title="Feature Showcase" description="Exploring modes, formats, and visual variants."/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Variants */}
        <Card title="Visual Variants">
          <div className="space-y-3">
            <AdvancedInput variant="outline" label="Outline (Default)" />
            <AdvancedInput variant="filled" label="Filled" />
            <AdvancedInput variant="ghost" label="Ghost" />
            <AdvancedInput variant="ghost" label="Ghost Active" defaultValue="Active" />
          </div>
        </Card>

        {/* Sizes & Radius */}
        <Card title="Sizes & Shapes">
          <div className="space-y-3">
            <AdvancedInput size="sm" label="Small Input" />
            <AdvancedInput size="md" label="Medium Input" />
            <AdvancedInput size="lg" label="Large Input" />
            <AdvancedInput radius="full" variant="filled" label="Full Radius" />
          </div>
        </Card>

        {/* Interactions */}
        <Card title="Interactive Actions">
          <div className="space-y-3">
            <AdvancedInput
              label="Password"
              type="password"
              showPasswordToggle
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <AdvancedInput
              label="Clear & Copy"
              defaultValue="Secret Data"
              allowClear
              allowCopy
            />
            <AdvancedInput
              label="Loading State"
              loading
              defaultValue="Wait for it..."
            />
          </div>
        </Card>

        {/* Prefix / Suffix */}
        <Card title="Prefix & Suffix">
          <div className="space-y-3">
            <AdvancedInput
              label="URL Input"
              prefix="https://"
              suffix=".com"
            />
            <AdvancedInput
              label="Search"
              leftIcon={<Search className="w-4 h-4"/>}
              placeholder="Type to search..."
            />
            <AdvancedInput
              label="Price"
              leftIcon={<DollarSign className="w-4 h-4"/>}
              prefix="$"
              type="number"
            />
            <AdvancedInput
              label="Secure"
              leftIcon={<Lock className="w-4 h-4"/>}
              rightIcon={<CheckCircle className="w-4 h-4 text-green-500"/>}
            />
          </div>
        </Card>

        {/* State Feedback */}
        <Card title="States (Error/Success)">
          <div className="space-y-3">
            <AdvancedInput
              label="Success State"
              success
              defaultValue="All good!"
            />
            <AdvancedInput
              label="Error State"
              error="This email is already taken"
              defaultValue="taken@email.com"
            />
            <AdvancedInput
              label="Disabled"
              disabled
              defaultValue="Cannot edit"
            />
          </div>
        </Card>

        {/* Auto-complete */}
        <Card title="Native Autocomplete">
          <AdvancedInput
            label="Programming Language"
            suggestions={['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'C++']}
            list="langs"
          />
          <AdvancedInput
            label="Countries"
            suggestions={['USA', 'Canada', 'UK', 'Germany', 'France']}
          />
        </Card>

        {/* Formatters (Grid) */}
        <Card title="Formatters & Masks" className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold">Phone Format</label>
              <AdvancedInput
                format="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                leftIcon={<Lock className="w-4 h-4"/>}
                placeholder="(555) 000-0000"
              />
              <div className="text-xs text-muted-foreground">Output: {phone}</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold">Credit Card</label>
              <AdvancedInput
                format="credit-card"
                value={cardNum}
                onChange={e => setCardNum(e.target.value)}
                placeholder="0000 0000 0000 0000"
              />
              <div className="text-xs text-muted-foreground">Output: {cardNum}</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold">Currency</label>
              <AdvancedInput
                format="currency"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                placeholder="$0.00"
              />
              <div className="text-xs text-muted-foreground">Output: {currency}</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold">Date (MM/DD/YYYY)</label>
              <AdvancedInput
                format="date"
                value={dateVal}
                onChange={e => setDateVal(e.target.value)}
                placeholder="MM/DD/YYYY"
              />
              <div className="text-xs text-muted-foreground">Output: {dateVal}</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold">SSN</label>
              <AdvancedInput
                format="ssn"
                value={ssnVal}
                onChange={e => setSsnVal(e.target.value)}
                placeholder="000-00-0000"
              />
              <div className="text-xs text-muted-foreground">Output: {ssnVal}</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold">Uppercase Regex</label>
              <AdvancedInput
                inputRegex={/^[A-Z]*$/}
                uppercase
                placeholder="Only A-Z allowed"
                helperText="Regex: /^[A-Z]*$/"
              />
            </div>
          </div>
        </Card>

        {/* Tags Mode */}
        <Card title="Tags Mode (Complex)" className="lg:col-span-3">
          <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
            <AdvancedInput
              mode="tags"
              label="Tech Stack"
              placeholder="Add a tag (press Enter)..."
              helperText="Try adding tags, deleting them, or pasting a comma-separated list."
              value={tags}
              onChange={e => setTags(x => [...x, e.target.value])}
              onTagRemove={(idx, val) => console.log(`Removed ${val} at ${idx}`)}
              leftIcon={<Code className="w-4 h-4"/>}
              suggestions={['React', 'Vue', 'Angular', 'Svelte', 'Next.js']}
              showCharCount
              maxLength={50} // Limits total chars in all tags
            />
            <div className="mt-2 text-xs font-mono">
              Array State: {JSON.stringify(tags)}
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
};

// --- Main App Component ---

const Showcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 backdrop-blur bg-opacity-80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">AI</div>
            <h1 className="text-lg font-bold">Advanced Input Demo</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden sm:inline-block">React • TypeScript • Tailwind</span>
            <a
              href="#"
              className="text-sm font-medium text-primary hover:underline"
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              Back to Top
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* Intro */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">The Ultimate Input Component</h2>
          <p className="text-muted-foreground">
            A fully-featured input component handling text, tags, validation, formatting,
            masking, and visual states—all in one polymorphic interface.
          </p>
        </div>

        {/* Sections */}
        <PlaygroundSection />
        <DebugSection />
        <StressTestSection />

      </main>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 Advanced Input Component. Built for high-performance forms.</p>
      </footer>
    </div>
  );
};

export default Showcase;
