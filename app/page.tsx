"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select } from '@/components/ui/select';
import { templates, categories } from '@/lib/logo-templates';
import { colorPresets } from '@/lib/color-presets';
import { exportToFormat } from '@/lib/export-utils';
import { LivePreview } from '@/components/preview/LivePreview';
import { ColorPresets } from '@/components/controls/ColorPresets';
import { HistoryPanel } from '@/components/history/HistoryPanel';
import { useLogoHistory } from '@/hooks/useLogoHistory';
import type { LogoParams, LogoTemplate, LogoStyle, LogoShape } from '@/types/logo-templates';

const LogoCustomizer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<LogoTemplate>(templates[0]);
  const [params, setParams] = useState<LogoParams>({
    size: 200,
    primaryColor: colorPresets[0].colors.primary,
    secondaryColor: colorPresets[0].colors.secondary,
    accentColor: colorPresets[0].colors.accent,
    strokeWidth: 2,
    rotation: 0,
    shape: 'circle',
    style: 'minimal'
  });

  const [isPreviewAnimated, setIsPreviewAnimated] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [exportFormat, setExportFormat] = useState<'svg' | 'png' | 'jpg'>('svg');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const {
    history,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo
  } = useLogoHistory(params, selectedTemplate.id);

  const updateParam = <T extends keyof LogoParams>(key: T, value: LogoParams[T]): void => {
    setParams(prev => {
      const newParams = { ...prev, [key]: value };
      addToHistory(newParams, selectedTemplate.id);
      return newParams;
    });
  };

  const handleExport = async () => {
    const svg = selectedTemplate.createSVG(params);
    const dataUrl = await exportToFormat(svg, exportFormat, params.size);
    
    const link = document.createElement('a');
    link.download = `${selectedTemplate.name.toLowerCase()}-logo.${exportFormat}`;
    link.href = dataUrl;
    link.click();
  };

  // Filtrer les templates par catégorie
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Logo Customizer</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
              >
                Undo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
              >
                Redo
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panneau de gauche : Prévisualisation */}
          <div className="space-y-6">
            <LivePreview
              svg={selectedTemplate.createSVG(params)}
              isAnimated={isPreviewAnimated}
              showGrid={showGrid}
              size={params.size}
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowGrid(!showGrid)}
              >
                {showGrid ? 'Hide Grid' : 'Show Grid'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsPreviewAnimated(!isPreviewAnimated)}
              >
                {isPreviewAnimated ? 'Stop Animation' : 'Animate'}
              </Button>
            </div>
          </div>

          {/* Panneau de droite : Contrôles */}
          <div className="space-y-6">
            {/* Sélection de template */}
            <div>
              <h3 className="text-lg font-medium mb-2">Template Category</h3>
              <div className="flex gap-2 flex-wrap mb-4">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>

              <Select
                value={selectedTemplate.id}
                onValueChange={(value: string) => {
                  const template = templates.find(t => t.id === value);
                  if (template) setSelectedTemplate(template);
                }}
                options={filteredTemplates.map(t => ({ 
                  value: t.id, 
                  label: t.name 
                }))}
              />
            </div>

            {/* Contrôles de base */}
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Size</h3>
                <Slider
                  min={100}
                  max={500}
                  step={20}
                  value={[params.size]}
                  onValueChange={(values) => updateParam('size', values[0])}
                />
                <span className="text-sm text-gray-500">{params.size}px</span>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Style & Shape</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Select<LogoStyle>
                    value={params.style}
                    onValueChange={(value) => updateParam('style', value)}
                    options={[
                      { value: 'minimal', label: 'Minimal' },
                      { value: 'detailed', label: 'Detailed' },
                      { value: 'gradient', label: 'Gradient' }
                    ]}
                  />
                  <Select<LogoShape>
                    value={params.shape}
                    onValueChange={(value) => updateParam('shape', value)}
                    options={[
                      { value: 'circle', label: 'Circle' },
                      { value: 'square', label: 'Square' },
                      { value: 'hexagon', label: 'Hexagon' }
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Presets de couleurs */}
            <ColorPresets
              presets={colorPresets}
              categories={categories}
              onSelect={(preset) => {
                setParams(prev => ({
                  ...prev,
                  primaryColor: preset.colors.primary,
                  secondaryColor: preset.colors.secondary,
                  accentColor: preset.colors.accent
                }));
              }}
            />

            {/* Couleurs personnalisées */}
            <div>
              <h3 className="text-lg font-medium mb-2">Custom Colors</h3>
              <div className="grid grid-cols-3 gap-4">
                <ColorPicker
                  label="Primary"
                  value={params.primaryColor}
                  onChange={(color) => updateParam('primaryColor', color)}
                />
                <ColorPicker
                  label="Secondary"
                  value={params.secondaryColor}
                  onChange={(color) => updateParam('secondaryColor', color)}
                />
                <ColorPicker
                  label="Accent"
                  value={params.accentColor}
                  onChange={(color) => updateParam('accentColor', color)}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <HistoryPanel
            history={history}
            onRestore={(entry) => {
              setParams(entry.params);
              const template = templates.find(t => t.id === entry.templateId);
              if (template) setSelectedTemplate(template);
            }}
          />
          <div className="flex gap-2">
            <Select<'svg' | 'png' | 'jpg'>
              value={exportFormat}
              onValueChange={setExportFormat}
              options={[
                { value: 'svg', label: 'SVG' },
                { value: 'png', label: 'PNG' },
                { value: 'jpg', label: 'JPG' }
              ]}
            />
            <Button onClick={handleExport}>
              Export {exportFormat.toUpperCase()}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogoCustomizer;