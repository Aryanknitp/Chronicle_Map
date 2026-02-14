import { useState } from 'react';
import { Slider } from '../ui/slider';
import { Card } from '../ui/card';
import { Play, Pause } from 'lucide-react';
import { Button } from '../ui/button';

const TimeSlider = ({ min = 1800, max = 2026, value, onChange, onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [range, setRange] = useState(value || [min, max]);

  const handleChange = (newRange) => {
    setRange(newRange);
    if (onChange) {
      onChange(newRange[0], newRange[1]);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (onPlay) {
      onPlay(!isPlaying);
    }
  };

  return (
    <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-stone-900">Time Period</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePlayPause}
            className="text-amber-700"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>

        <div className="space-y-2">
          <Slider
            value={range}
            onValueChange={handleChange}
            min={min}
            max={max}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between text-sm text-stone-600">
            <span className="font-medium">{range[0]}</span>
            <span className="text-xs text-stone-500">to</span>
            <span className="font-medium">{range[1]}</span>
          </div>
        </div>

        <div className="flex justify-between text-xs text-stone-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </Card>
  );
};

export default TimeSlider;
