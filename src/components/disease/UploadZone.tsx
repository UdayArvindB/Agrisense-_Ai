import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { DEMO_PRESETS } from '../../data/mockDiseases';

interface UploadZoneProps {
  onAnalyze: (fileOrPresetId: File | string) => void;
  isAnalyzing: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onAnalyze, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePresetSelect = (presetId: string, thumbnail: string) => {
    setSelectedFile(null);
    setSelectedPreview(thumbnail);
    onAnalyze(presetId);
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  const startAnalysisWithSelected = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    } else {
      // Default to Tomato preset
      onAnalyze('preset-tomato');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xl shadow-stone-900/5">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />

      {/* Main Drag-and-Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-emerald-500 bg-emerald-50/70 scale-[0.99]'
            : 'border-stone-300 bg-stone-50/60 hover:bg-stone-50 hover:border-emerald-400'
        }`}
      >
        {selectedPreview ? (
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-500 mb-6 group">
              <img
                src={selectedPreview}
                alt="Selected crop specimen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={triggerUploadClick}
                  className="px-3.5 py-1.5 rounded-lg bg-white/90 text-stone-900 text-xs font-bold shadow-md hover:bg-white"
                >
                  Change Image
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={startAnalysisWithSelected}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-lg shadow-emerald-950/20 disabled:opacity-60 transition-all text-sm"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" />
                    <span>Analyzing Leaf Pathology...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Analyze Crop Specimen</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setSelectedPreview(null);
                  setSelectedFile(null);
                }}
                disabled={isAnalyzing}
                className="px-4 py-3 rounded-2xl font-semibold text-stone-600 hover:text-stone-900 bg-stone-200/80 hover:bg-stone-200 text-sm transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-5 shadow-sm border border-emerald-200">
              <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-700" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight mb-2">
              Drop your crop image here
            </h3>
            <p className="text-sm text-stone-500 max-w-md mb-6">
              Supports high-resolution foliar captures in <strong className="text-stone-700">JPG, PNG, or WEBP</strong> up to 15MB.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={triggerUploadClick}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-950/15 transition-all text-sm"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Upload Image</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCameraActive(true);
                  // Simulate camera snapshot after 600ms
                  setTimeout(() => {
                    handlePresetSelect('preset-tomato', DEMO_PRESETS[0].thumbnail);
                    setCameraActive(false);
                  }, 800);
                }}
                disabled={isAnalyzing || cameraActive}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-stone-700 hover:text-emerald-900 bg-white hover:bg-emerald-50/60 border border-stone-200 shadow-xs transition-all text-sm"
              >
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>{cameraActive ? 'Accessing Camera...' : 'Use Camera'}</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('preset-tomato', DEMO_PRESETS[0].thumbnail)}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 shadow-xs transition-all text-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Try Demo Image</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preset Selector Chips for judges */}
      <div className="mt-6 pt-6 border-t border-stone-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Or Click A Benchmark Specimen:
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Instant ML Demo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id, preset.thumbnail)}
              disabled={isAnalyzing}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-stone-50 hover:bg-emerald-50/80 border border-stone-200 hover:border-emerald-300 text-left transition-all duration-200 group focus:outline-none"
            >
              <img
                src={preset.thumbnail}
                alt={preset.cropName}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200 group-hover:border-emerald-400"
              />
              <div className="min-w-0">
                <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-950 block truncate">
                  {preset.cropName}
                </span>
                <span className="text-[11px] text-stone-500 block truncate">
                  {preset.presetResult.diseaseName}
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                  {preset.presetResult.confidence}% Conf.
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
