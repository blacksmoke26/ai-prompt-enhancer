/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState } from 'react';
import { EyeOff, TrendingUp, Filter, ChevronDown } from 'lucide-react';

// ui components
import { Button } from '~/components/ui/Button';
import { Badge } from '~/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';

/**
 * @interface WordCloudProps
 * @description Props for the WordCloud component displaying word frequency analysis
 * @example
 * ```tsx
 * <WordCloud
 *   wordFrequency={[{word: "example", count: 5}]}
 *   showWordCloud={true}
 *   setShowWordCloud={setShowCloud}
 * />
 * ```
 * @developer_notes The wordFrequency array should be pre-sorted by count for optimal display
 */
export interface WordCloudProps {
  /** Array of word-frequency pairs for display in the cloud */
  wordFrequency: Array<{ word: string; count: number }>;
  /** Controls visibility of the word cloud component */
  showWordCloud: boolean;
  /** Function to update the showWordCloud state */
  setShowWordCloud: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Enhanced WordCloud component with Google-like professional design and filtering
 * @description Renders a visually appealing word frequency analysis with improved typography, spacing, and visual hierarchy
 * @example
 * ```tsx
 * const [showCloud, setShowCloud] = useState(true);
 * <WordCloud
 *   wordFrequency={wordData}
 *   showWordCloud={showCloud}
 *   setShowWordCloud={setShowCloud}
 * />
 * ```
 * @developer_notes Font size is calculated using count*2 with min 12px and max 20px bounds
 */
const WordCloud: React.FC<WordCloudProps> = ({ wordFrequency, showWordCloud, setShowWordCloud }) => {
  if (!showWordCloud) return null;

  // State for filter selection
  const [filterLevel, setFilterLevel] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Calculate max count for proportional sizing
  const maxCount = Math.max(...wordFrequency.map(item => item.count), 1);

  // Filter words based on selection
  const filteredWords = wordFrequency.filter(({ count }) => {
    if (filterLevel === 'all') return true;
    if (filterLevel === 'high') return count >= maxCount * 0.7;
    if (filterLevel === 'medium') return count >= maxCount * 0.4 && count < maxCount * 0.7;
    if (filterLevel === 'low') return count < maxCount * 0.4;
    return true;
  });

  // Get top 25 words for display (or all if less)
  const topWords = filteredWords.slice(0, 25);

  // Get filter options
  const filterOptions = [
    { value: 'all', label: 'All words' },
    { value: 'high', label: 'High frequency' },
    { value: 'medium', label: 'Medium frequency' },
    { value: 'low', label: 'Low frequency' },
  ];

  return (
    <Card className="mb-6 border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Word Frequency Analysis
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Top {topWords.length} most frequent terms in your prompt
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWordCloud(false)}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <EyeOff className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter by frequency</span>
          </div>

          <div className="relative">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as any)}
              className="appearance-none bg-background border border-border rounded-md py-1.5 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {topWords.map(({ word, count }) => {
            // Calculate proportional font size (min 12px, max 24px)
            const fontSize = Math.max(12, Math.min(24, (count / maxCount) * 16 + 12));

            // Calculate badge variant based on count
            let badgeVariant = "secondary";
            if (count >= maxCount * 0.7) badgeVariant = "destructive";
            else if (count >= maxCount * 0.4) badgeVariant = "default";
            else if (count >= maxCount * 0.2) badgeVariant = "default";

            return (
              <div
                key={word}
                className="group relative flex flex-col items-center justify-center p-3 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-sm"
                style={{
                  fontSize: `${fontSize}px`,
                  minHeight: '60px'
                }}
              >
                <span className="font-medium text-center text-foreground group-hover:text-primary transition-colors">
                  {word}
                </span>
                <Badge
                  variant={badgeVariant as any}
                  className="mt-2 text-xs font-medium px-2 py-1"
                >
                  {count}
                </Badge>

                {/* Hover effect for better visual feedback */}
                <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            );
          })}
        </div>

        {filteredWords.length > 25 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Showing top 25 of {filteredWords.length} words
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WordCloud;
