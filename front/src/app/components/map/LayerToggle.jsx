import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Image, FileText, Mic, Video, Layers } from 'lucide-react';

const LayerToggle = ({ activeLayer, onLayerChange }) => {
  const layers = [
    { id: 'all', name: 'All Media', icon: Layers, color: 'text-stone-600' },
    { id: 'photo', name: 'Photos', icon: Image, color: 'text-amber-600' },
    { id: 'document', name: 'Documents', icon: FileText, color: 'text-blue-600' },
    { id: 'audio', name: 'Audio', icon: Mic, color: 'text-green-600' },
    { id: 'video', name: 'Video', icon: Video, color: 'text-red-600' },
  ];

  return (
    <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-lg">
      <h3 className="font-semibold text-stone-900 mb-4">Layer Filters</h3>
      <div className="space-y-3">
        {layers.map((layer) => {
          const Icon = layer.icon;
          const isActive = activeLayer === layer.id;
          
          return (
            <div key={layer.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${layer.color}`} />
                <Label htmlFor={layer.id} className="text-sm font-medium cursor-pointer">
                  {layer.name}
                </Label>
              </div>
              <Switch
                id={layer.id}
                checked={isActive}
                onCheckedChange={() => onLayerChange(layer.id)}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LayerToggle;
