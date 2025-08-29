import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Upload, Search, X, FileImage, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  selectedFile: File | null;
  isAnalyzing: boolean;
}

export function FileUpload({ onFileSelect, onAnalyze, selectedFile, isAnalyzing }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleRemoveFile = () => {
    onFileSelect(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Upload Gambar X-Ray Paru-paru
            </h2>
          </div>
          <p className="text-muted-foreground">
            Drag & drop gambar atau pilih file untuk memulai analisis AI
          </p>
        </div>
        
        <motion.div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50 scale-105' 
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: selectedFile ? 1 : 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {selectedFile ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-green-600 font-medium">File berhasil dipilih!</p>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl max-w-md mx-auto">
                  <div className="flex items-center gap-3">
                    <FileImage className="h-5 w-5 text-blue-600" />
                    <span className="truncate text-sm font-medium">{selectedFile.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ 
                  y: isDragOver ? -10 : [0, -10, 0],
                }}
                transition={{ 
                  duration: isDragOver ? 0.2 : 2,
                  repeat: isDragOver ? 0 : Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center"
              >
                <Upload className="h-10 w-10 text-blue-600" />
              </motion.div>
              
              <div className="space-y-3">
                <h3 className="text-xl text-gray-700">
                  {isDragOver ? 'Lepaskan file di sini' : 'Drag & drop gambar X-ray'}
                </h3>
                <p className="text-muted-foreground">
                  Atau klik tombol di bawah untuk memilih file dari komputer Anda
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-8 space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="grid gap-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full h-12 rounded-xl border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              disabled={isAnalyzing}
            >
              <Upload className="h-5 w-5 mr-2" />
              Pilih File dari Komputer
            </Button>

            <Button
              onClick={onAnalyze}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!selectedFile || isAnalyzing}
            >
              <Search className="h-5 w-5 mr-2" />
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Menganalisis...
                </span>
              ) : (
                'Analisis dengan AI'
              )}
            </Button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-blue-50 rounded-xl"
        >
          <div className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div className="space-y-1">
              <p className="text-blue-800 font-medium">Format yang didukung:</p>
              <p className="text-blue-700">JPG, PNG, JPEG (Maksimal 10MB)</p>
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}