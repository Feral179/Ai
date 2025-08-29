import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { ResultsPanel } from './components/ResultsPanel';
import { motion, AnimatePresence } from 'framer-motion';

interface Disease {
  name: string;
  confidence: number;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  description: string;
}

// Mock data untuk simulasi hasil AI
const mockResults: Disease[] = [
  {
    name: 'Normal',
    confidence: 85,
    severity: 'normal',
    description: 'Tidak ditemukan tanda-tanda kelainan pada paru-paru. Struktur paru-paru terlihat normal.'
  },
  {
    name: 'Pneumonia',
    confidence: 12,
    severity: 'mild',
    description: 'Kemungkinan kecil adanya infeksi pada paru-paru dengan tingkat keparahan ringan.'
  },
  {
    name: 'Tuberkulosis',
    confidence: 3,
    severity: 'mild',
    description: 'Kemungkinan sangat kecil adanya infeksi TB dengan kepercayaan rendah.'
  }
];

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Disease[] | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setResults(null);
    
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    } else {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      setImagePreviewUrl(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setResults(null);

    await new Promise(resolve => setTimeout(resolve, 3000));

    setResults(mockResults);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Identifikasi Penyakit Paru-paru
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Upload gambar X-ray untuk analisis menggunakan kecerdasan buatan yang canggih dan dapatkan hasil diagnosis dalam hitungan detik
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {!isAnalyzing && !results ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <FileUpload
                  onFileSelect={handleFileSelect}
                  onAnalyze={handleAnalyze}
                  selectedFile={selectedFile}
                  isAnalyzing={isAnalyzing}
                />
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <ResultsPanel
                  isAnalyzing={isAnalyzing}
                  results={results}
                  selectedFile={selectedFile}
                  imagePreviewUrl={imagePreviewUrl}
                  onReset={() => {
                    setSelectedFile(null);
                    setResults(null);
                    setImagePreviewUrl(null);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-t bg-white/50 backdrop-blur-sm mt-16"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AI Lung Disease Detection. Untuk tujuan edukasi dan demo.
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>Powered by Machine Learning</span>
              <span>•</span>
              <span>Medical AI Technology</span>
              <span>•</span>
              <span>Deep Learning Analysis</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}