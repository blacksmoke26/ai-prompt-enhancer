/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Heart,
  Image as ImageIcon,
  MoreHorizontal,
  Music,
  Play,
  Star,
  User,
  XCircle,
} from 'lucide-react';

// components
import ItemsNavigator from './index'; // Adjust path to your component location

// ==========================================
// MOCK DATA & REUSABLE CHILDREN
// ==========================================

const StandardCard = ({title, sub, icon: Icon, color}: any) => (
  <div
    className="h-40 w-64 rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-800 relative overflow-hidden group">
    <div className={`p-3 rounded-lg w-fit ${color} group-hover:scale-110 transition-transform`}>
      <Icon className="w-6 h-6 text-white"/>
    </div>
    <div>
      <h4 className="font-bold text-slate-800 dark:text-white">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub}</p>
    </div>
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <MoreHorizontal className="w-5 h-5 text-slate-400"/>
    </div>
  </div>
);

const AlbumCard = ({index}: { index: number }) => (
  <div className="relative aspect-square w-48 rounded-lg overflow-hidden group cursor-pointer shadow-lg">
    <img
      src={`https://picsum.photos/300/300?random=${index + 20}`}
      alt="Album"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div
      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
      <button className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform shadow-xl">
        <Heart className="w-5 h-5 fill-none"/>
      </button>
      <button className="p-4 bg-blue-500 rounded-full text-white hover:scale-110 transition-transform shadow-xl">
        <Play className="w-6 h-6 fill-white ml-1"/>
      </button>
    </div>
    <div className="absolute bottom-2 left-2 text-white font-medium text-sm drop-shadow-md">
      Album {index}
    </div>
  </div>
);

const UserChip = ({name, role}: { name: string, role: string }) => (
  <div className="flex flex-col items-center gap-2 min-w-[80px] group cursor-pointer">
    <div
      className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-600 overflow-hidden relative">
      <img src={`https://i.pravatar.cc/150?u=${name}`} alt={name} className="w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <div className="text-center">
      <span className="block text-xs font-bold text-slate-700 dark:text-slate-200">{name}</span>
      <span className="block text-[10px] text-slate-500 uppercase tracking-wider">{role}</span>
    </div>
  </div>
);

// ==========================================
// COMPONENT: ACTION LOGGER (Visualizes Callbacks)
// ==========================================

const ActionLogger = () => {
  const [logs, setLogs] = useState<string[]>([]);

  // Expose logger function globally for the demo
  (window as any).demoLogger = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 5));
  };

  return (
    <div
      className="fixed bottom-4 right-4 w-80 bg-slate-900/90 backdrop-blur text-white p-4 rounded-xl shadow-2xl border border-slate-700 z-50 font-mono text-xs">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-700">
        <span className="font-bold text-green-400">Event Log</span>
        <button onClick={() => setLogs([])} className="text-slate-400 hover:text-white">Clear</button>
      </div>
      <div className="space-y-1 max-h-32 overflow-y-auto no-scrollbar">
        {logs.length === 0 && <span className="text-slate-500 italic">Waiting for interaction...</span>}
        {logs.map((log, i) => (
          <div key={i} className="border-l-2 border-green-500 pl-2 opacity-80">{log}</div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// MAIN DEMO COMPONENT
// ==========================================

export const ItemsNavigatorShowcase = () => {

  // We need to attach the logger to window so we can pass it as a prop easily without complex context
  // In a real app, you'd pass the function directly.
  const handleLog = (msg: string) => (window as any).demoLogger?.(msg);

  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900 pb-20">

      <ActionLogger/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            ItemsNavigator
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A fully-featured, accessible horizontal scroll container. Check the bottom-right log box to see callbacks in
            action.
          </p>
        </div>

        {/* --- SECTION 1: SIZES & VARIANTS --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">1. Sizes & Variants</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Solid / Large */}
            <div className="space-y-2">
              <p className="text-sm font-mono text-slate-400">size="lg" | variant="solid"</p>
              <ItemsNavigator
                size="lg"
                variant="solid"
                title="Large Solid Cards"
                options={<span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Standard</span>}
              >
                {[1, 2, 3].map(i => <StandardCard key={i} title={`Large Card ${i}`} sub="Big content" icon={Music}
                                                  color="bg-blue-500"/>)}
              </ItemsNavigator>
            </div>

            {/* Glass / Medium */}
            <div className="space-y-2">
              <p className="text-sm font-mono text-slate-400">size="md" | variant="glass"</p>
              <ItemsNavigator
                size="md"
                variant="glass"
                title="Glassmorphism"
                bgTransparent={true} // Also demonstrating legacy prop
                rounded="full"
              >
                {[1, 2, 3].map(i => <StandardCard key={i} title={`Glass ${i}`} sub="Frosted effect" icon={Star}
                                                  color="bg-purple-500"/>)}
              </ItemsNavigator>
            </div>

            {/* Ghost / Small */}
            <div className="col-span-1 lg:col-span-2 space-y-2">
              <p className="text-sm font-mono text-slate-400">size="sm" | variant="ghost"</p>
              <ItemsNavigator
                size="sm"
                variant="ghost"
                title="Compact List"
                showProgress={false}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <StandardCard key={i} title={`Item ${i}`} sub="Compact"
                                                                 icon={ImageIcon} color="bg-emerald-500"/>)}
              </ItemsNavigator>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: ARROW CUSTOMIZATION --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">2. Navigation Controls</h2>
          </div>

          {/* Custom Icons */}
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
            <p className="text-sm font-mono text-slate-400 mb-4">Custom Arrow Icons & Rounded Buttons</p>
            <ItemsNavigator
              size="md"
              variant="solid"
              rounded="lg"
              arrowLeftIcon={<ArrowLeft className="w-5 h-5"/>}
              arrowRightIcon={<ArrowRight className="w-5 h-5"/>}
              title="Square Buttons"
              progressColor="bg-purple-500"
            >
              {[1, 2, 3].map(i => <StandardCard key={i} title={`Custom Nav ${i}`} sub="Square style" icon={Play}
                                                color="bg-orange-500"/>)}
            </ItemsNavigator>
          </div>

          {/* Hidden Arrows (Native Scroll) */}
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
            <p className="text-sm font-mono text-slate-400 mb-4">hideArrows={true} (Drag to scroll)</p>
            <ItemsNavigator
              size="md"
              variant="ghost"
              hideArrows={true}
              showProgress={false}
              title="Drag to Scroll Area"
            >
              {[1, 2, 3, 4, 5].map(i => <AlbumCard key={i} index={i}/>)}
            </ItemsNavigator>
          </div>
        </section>

        {/* --- SECTION 3: SCROLL BEHAVIOR --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-pink-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">3. Scroll Behavior</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visible Scrollbar */}
            <div className="space-y-2">
              <p className="text-sm font-mono text-slate-400">hideScrollbar={false} | snapType="proximity"</p>
              <ItemsNavigator
                size="md"
                variant="solid"
                hideScrollbar={false}
                snapType="proximity"
                title="Visible Scrollbar"
              >
                {[1, 2, 3, 4].map(i => <StandardCard key={i} title={`Scroll ${i}`} sub="Native bar visible"
                                                     icon={MoreHorizontal} color="bg-pink-500"/>)}
              </ItemsNavigator>
            </div>

            {/* Page Scrolling */}
            <div className="space-y-2">
              <p className="text-sm font-mono text-slate-400">scrollStepPercentage={1.0} (Full Page)</p>
              <ItemsNavigator
                size="md"
                variant="solid"
                scrollStepPercentage={1.0}
                title="Page Scrolling"
                progressColor="bg-pink-500"
                onBackClick={() => handleLog('Back Clicked')}
                onNextClick={() => handleLog('Next Clicked')}
              >
                {[1, 2, 3, 4, 5, 6].map(i => <StandardCard key={i} title={`Page ${i}`} sub="Jumps full width"
                                                           icon={CheckCircle} color="bg-indigo-500"/>)}
              </ItemsNavigator>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: LAYOUT & DIMENSIONS --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">4. Layout Dimensions</h2>
          </div>

          {/* Auto Width (Avatars) */}
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
            <p className="text-sm font-mono text-slate-400 mb-4">itemWidth="auto" | gap="1rem"</p>
            <ItemsNavigator
              size="sm"
              variant="ghost"
              itemWidth="auto"
              gap="1rem"
              title="Suggested For You"
              showProgress={false}
            >
              {['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi'].map(name => (
                <UserChip key={name} name={name} role="Creator"/>
              ))}
            </ItemsNavigator>
          </div>

          {/* Tight Gap / Fixed Width */}
          <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50">
            <p className="text-sm font-mono text-slate-400 mb-4">itemWidth="200px" | gap="0.5rem"</p>
            <ItemsNavigator
              size="md"
              variant="solid"
              itemWidth="200px"
              gap="0.5rem"
              title="Tight Grid"
              animation="slide-up"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <div key={i}
                     className="h-24 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center font-mono text-slate-400">
                  200px
                </div>
              ))}
            </ItemsNavigator>
          </div>
        </section>

        {/* --- SECTION 5: INTERACTIVE CALLBACKS --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-red-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">5. Interactions (See Log)</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-2xl text-white">
            <p className="text-sm font-mono text-slate-400 mb-4">onSelect callback demonstration</p>
            <ItemsNavigator
              size="lg"
              variant="glass"
              title="Click an Item"
              showProgress={false}
              onSelect={(index) => handleLog(`User selected item index: ${index}`)}
              arrowLeftIcon={<XCircle className="text-red-400"/>}
              arrowRightIcon={<CheckCircle className="text-green-400"/>}
            >
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i}
                     className="h-48 w-48 bg-white/10 rounded-xl border border-white/10 flex flex-col items-center justify-center hover:bg-white/20 transition-colors cursor-pointer group">
                  <User className="w-12 h-12 text-slate-300 group-hover:text-white mb-2 transition-colors"/>
                  <span className="font-medium">Profile {i}</span>
                  <span className="text-xs text-slate-400 mt-1">Click Me</span>
                </div>
              ))}
            </ItemsNavigator>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ItemsNavigatorShowcase;
