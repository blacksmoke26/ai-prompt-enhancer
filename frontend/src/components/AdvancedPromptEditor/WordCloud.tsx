import React from 'react';
import { Button } from '~/components/ui/Button';
import { EyeOff } from 'lucide-react';
import { Badge } from '~/components/ui/Badge';

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
 * WordCloud component displaying word frequency analysis with dynamic sizing
 * @description Renders a grid of words with frequency-based sizing and dismiss functionality
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

  return (
    <div className="p-4 bg-muted/30 rounded-lg mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Word Frequency Analysis</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowWordCloud(false)}
        >
          <EyeOff className="h-4 w-4"/>
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {wordFrequency.map(({ word, count }) => (
          <div
            key={word}
            className="flex items-center justify-between p-2 bg-background rounded border border-border hover:bg-muted/50 transition-colors"
            style={{ fontSize: `${Math.max(12, Math.min(20, count * 2))}px` }}
          >
            <span className="font-medium">{word}</span>
            <Badge variant="secondary" className="text-xs">
              {count}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordCloud;
