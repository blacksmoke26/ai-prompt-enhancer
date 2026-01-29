/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';
import {
  Save,
  Trash2,
  Filter,
  X,
  Search,
  Settings,
  User,
  Check,
  Globe,
  Tag,
  RotateCcw,
  AlertTriangle,
  FileText,
  MoreVertical
} from 'lucide-react';
import {Popover} from '~/components/ui/Popover'; // Import the component created previously
import {Button} from '~/components/ui/Button';

// --- Mock Data for Long Lists ---
const TIMEZONES = [
  "UTC (Coordinated Universal Time)",
  "EST (Eastern Standard Time)",
  "PST (Pacific Standard Time)",
  "CET (Central European Time)",
  "IST (Indian Standard Time)",
  "JST (Japan Standard Time)",
  "AEST (Australian Eastern Standard Time)",
  "CST (China Standard Time)",
  "GMT (Greenwich Mean Time)",
  "MST (Mountain Standard Time)",
  "HST (Hawaii-Aleutian Standard Time)",
  "AKST (Alaska Standard Time)",
  "ECT (European Central Time)",
  "EET (Eastern European Time)",
  "ART (Argentina Time)",
  "BRT (Brasilia Time)",
  "CAT (Central Africa Time)",
  "EAT (Eastern Africa Time)",
  "NET (Near East Time)",
  "PLT (Pakistan Lahore Time)",
  "IST (India Standard Time)",
  "BST (Bangladesh Standard Time)",
  "VST (Vietnam Standard Time)",
  "CTT (China Taiwan Time)",
  "JST (Japan Standard Time)",
  "ACT (Australia Central Time)",
  "AET (Australia Eastern Time)",
  "SST (Solomon Standard Time)",
  "NST (New Zealand Standard Time)",
  "MIT (Midway Islands Time)",
  "HST (Hawaii Standard Time)",
  "AST (Alaska Standard Time)",
  "PST (Pacific Standard Time)",
  "PNT (Phoenix Standard Time)",
  "MST (Mountain Standard Time)",
  "CST (Central Standard Time)",
  "EST (Eastern Standard Time)",
  "IET (Indiana Eastern Standard Time)",
  "PRT (Puerto Rico and US Virgin Islands Time)",
  "CNT (Canada Newfoundland Time)",
  "AGT (Argentina Standard Time)",
  "BET (Brazil Eastern Time)",
  "CAT (Central African Time)",
];

// --- 1. Quick Form Example ---
const QuickFormExample = () => {
  const [status, setStatus] = useState('Active');

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Quick Form (Async)</h4>
      <Popover
        title="Update Status"
        triggerIcon={User}
        triggerVariant="outline"
        triggerTooltip="Update User Status"
        showReset={true}
        resetText="Revert"
        resetIcon={RotateCcw}
        onReset={() => setStatus('Active')}
        onConfirm={async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          console.log(`Status updated to: ${status}`);
        }}
        confirmText="Save Changes"
        confirmIcon={Save}
      >
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Current Status</label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </div>
          <p className="text-xs text-muted-foreground">
            Changing the status will notify the user via email immediately.
          </p>
        </div>
      </Popover>
    </div>
  );
};

// --- 2. Scrollable List Example ---
const ScrollableListExample = () => {
  const [selected, setSelected] = useState('');

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Long List (Scrollbar)</h4>
      <Popover
        title="Select Timezone"
        triggerIcon={Globe}
        triggerVariant="secondary"
        width="w-80"
        maxHeight="h-64" // Triggers the scrollbar
        showFooter={false} // Minimalist look
      >
        <div className="space-y-1">
          <div className="relative">
            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search timezone..."
              className="w-full rounded-sm border border-input bg-background pl-8 pr-3 py-1.5 text-sm outline-none focus:border-ring"
            />
          </div>
          <div className="mt-2 space-y-1">
            {TIMEZONES.map((tz) => (
              <button
                key={tz}
                onClick={() => setSelected(tz)}
                className={`
                  flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-left transition-colors
                  ${selected === tz ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/50'}
                `}
              >
                <div className={`h-2 w-2 rounded-full ${selected === tz ? 'bg-primary' : 'border border-muted-foreground'}`} />
                <span className="truncate">{tz}</span>
              </button>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
};

// --- 3. Large Text Preview Example ---
const LargeTextExample = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Large Text / Article</h4>
      <Popover
        title="Privacy Policy"
        triggerIcon={FileText}
        triggerTooltip="Read Policy"
        width="w-[500px]" // Wide content
        maxHeight="h-[400px]"
        align="start"
        showCloseButton={true}
        showFooter={false}
        variant="ghost"
      >
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="leading-relaxed text-muted-foreground">
            <strong>1. Introduction</strong><br/>
            Welcome to our service. By using our platform, you agree to comply with and be bound by the following terms and conditions of use.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            <strong>2. Privacy</strong><br/>
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            <strong>3. License</strong><br/>
            Unless otherwise stated, we own the intellectual property rights for all material on this platform. All intellectual property rights are reserved.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>
      </Popover>
    </div>
  );
};

// --- 4. Destructive / Danger Zone Example ---
const DestructiveExample = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Destructive Action</h4>
      <Popover
        variant="destructive"
        title="Delete Project"
        description="This action cannot be undone."
        trigger={() => <Button variant="destructive" size="sm">Delete Project</Button>}
        confirmText="Yes, Delete"
        confirmIcon={Trash2}
        cancelText="Cancel"
        closeOnConfirm={true}
        onConfirm={() => alert('Project deleted!')}
        radius="md"
      >
        <div className="py-2">
          <p className="text-sm text-destructive/90 font-medium">
            Are you sure you want to delete "Project Alpha"? All associated data, including files and team history, will be permanently removed.
          </p>
        </div>
      </Popover>
    </div>
  );
};

// --- 5. Advanced Filter Example ---
const AdvancedFilterExample = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Advanced Filter</h4>
      <Popover
        title="Filter Results"
        triggerIcon={Filter}
        triggerVariant="outline"
        width="w-72"
        radius="xl"
        shadow="2xl"
        showReset={true}
        showCancel={false} // Only apply/close
        confirmText="Apply Filters"
        confirmIcon={Check}
      >
        <div className="space-y-4">
          {/* Filter Group 1 */}
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Date Range</label>
            <div className="mt-2 space-y-2">
              <input type="date" className="w-full rounded-md border border-input bg-transparent px-2 py-1 text-xs" />
              <input type="date" className="w-full rounded-md border border-input bg-transparent px-2 py-1 text-xs" />
            </div>
          </div>

          {/* Filter Group 2 */}
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Tags</label>
            <div className="mt-2 flex flex-wrap gap-1">
              {['Design', 'Dev', 'Marketing'].map(tag => (
                <span key={tag} className="flex items-center gap-1 rounded-full border bg-secondary px-2 py-0.5 text-xs">
                  <Tag className="h-2.5 w-2.5" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

// --- 6. Profile Menu (Custom Header Actions) ---
const ProfileMenuExample = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Profile Menu</h4>
      <Popover
        showHeader={false} // Hide default header
        showFooter={false}
        width="w-56"
        align="end"
        variant="ghost"
        trigger={() => (
          <Button variant="ghost" size="sm" className="h-9 gap-2 px-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              JD
            </div>
            <span className="hidden md:inline">John Doe</span>
          </Button>
        )}
      >
        <div className="p-1">
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Account</div>
          <button className="w-full flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent">
            <User className="h-4 w-4" /> Profile
          </button>
          <button className="w-full flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent">
            <Settings className="h-4 w-4" /> Settings
          </button>
          <div className="my-1 h-px bg-border" />
          <button className="w-full flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10">
            <X className="h-4 w-4" /> Log out
          </button>
        </div>
      </Popover>
    </div>
  );
};

// --- 7. Glassmorphism & Inset Example ---
const GlassmorphismExample = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Glassmorphism</h4>
      <Popover
        title="Notifications"
        trigger={() => (
          <Button variant="outline"><MoreVertical className="h-4 w-4"/></Button>
        )}
        backdrop={true}
        variant="warning"
        headerIcon={AlertTriangle}
        width="w-64"
        align="end"
      >
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
            <div>
              <p className="text-sm font-medium">Server Maintenance</p>
              <p className="text-xs text-muted-foreground">Scheduled in 2 hours.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm font-medium">New Update</p>
              <p className="text-xs text-muted-foreground">Version 2.0 is live.</p>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

// --- Main Showcase Grid ---
export const PopoverShowcase: React.FC = () => {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Popover Component Showcase</h1>
        <p className="text-muted-foreground mt-2">A collection of real-world examples using the advanced Popover component.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        <QuickFormExample />
        <ScrollableListExample />
        <LargeTextExample />
        <DestructiveExample />
        <AdvancedFilterExample />
        <ProfileMenuExample />
        <GlassmorphismExample />
      </div>
    </div>
  );
};

export default PopoverShowcase;
