import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle, AlertTriangle, Info, RefreshCw, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Disease {
  name: string;
  confidence: number;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  description: string;
}

interface ResultsPanelProps {
  isAnalyzing: boolean;
  results: Disease[] | null;
  selectedFile: File | null;
  imagePreviewUrl: string | null;
  onReset: () => void;
}

export function ResultsPanel({ isAnalyzing, results, selectedFile, imagePreviewUrl, onReset }: ResultsPanelProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'normal': return 'bg-emerald-500';
      case 'mild': return 'bg-amber-500';
      case 'moderate': return 'bg-orange-500';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'normal': return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'mild': return <Info className="h-4 w-4 text-amber-600" />;
      case 'moderate': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'severe': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getSeverityGradient = (severity: string) => {
    switch (severity) {
      case 'normal': return 'from-emerald-50 to-green-50 border-emerald-200';
      case 'mild': return 'from-amber-50 to-yellow-50 border-amber-200';
      case 'moderate': return 'from-orange-50 to-red-50 border-orange-200';
      case 'severe': return 'from-red-50 to-pink-50 border-red-200';
      default: return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-8 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Preview */}
            {imagePreviewUrl && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Gambar X-Ray yang Dianalisis
                </h3>
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                  <img 
                    src={imagePreviewUrl} 
                    alt="X-Ray Preview" 
                    className="w-full h-80 object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 bg-blue-500/10 rounded-2xl"></div>
                </div>
              </motion.div>
            )}

            {/* Analysis Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6 flex flex-col justify-center"
            >
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center"
                >
                  <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                </motion.div>
                
                <div className="space-y-2">
                  <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Menganalisis dengan AI
                  </h2>
                  <p className="text-muted-foreground">
                    Memproses gambar menggunakan deep learning...
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress Analisis</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  ✓ Preprocessing gambar selesai
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  ✓ Ekstraksi fitur gambar
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-blue-600"
                >
                  → Analisis dengan model CNN...
                </motion.p>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (results) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hasil Analisis AI
            </h2>
            <p className="text-muted-foreground">Analisis selesai dalam 3 detik</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl">
              <Share2 className="h-4 w-4 mr-2" />
              Bagikan
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Unduh
            </Button>
            <Button onClick={onReset} variant="outline" size="sm" className="rounded-xl">
              <RefreshCw className="h-4 w-4 mr-2" />
              Analisis Baru
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Preview */}
          {imagePreviewUrl && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <h3 className="mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Gambar X-Ray
                </h3>
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                  <img 
                    src={imagePreviewUrl} 
                    alt="X-Ray Analysis" 
                    className="w-full h-80 object-contain rounded-xl"
                  />
                </div>
              </Card>
            </motion.div>
          )}

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Hasil analisis di bawah ini adalah simulasi untuk tujuan demo. 
                Konsultasikan dengan dokter untuk diagnosis yang akurat.
              </AlertDescription>
            </Alert>

            <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <h3 className="mb-4">Deteksi Penyakit</h3>
              <div className="space-y-4">
                {results.map((disease, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`border rounded-2xl p-6 bg-gradient-to-r ${getSeverityGradient(disease.severity)}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getSeverityIcon(disease.severity)}
                        <span className="font-medium text-lg">{disease.name}</span>
                      </div>
                      <Badge variant="outline" className={`${getSeverityColor(disease.severity)} text-white border-0 px-3 py-1 rounded-full`}>
                        {disease.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Tingkat Kepercayaan:</span>
                        <span className="font-medium">{disease.confidence}%</span>
                      </div>
                      <Progress value={disease.confidence} className="h-3 rounded-full" />
                      
                      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                        {disease.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="p-6 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <h3 className="mb-4">Rekomendasi Tindak Lanjut</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800">Konsultasikan hasil ini dengan dokter spesialis paru</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-green-800">Lakukan pemeriksaan fisik lebih lanjut jika diperlukan</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-800">Pertimbangkan tes laboratorium tambahan</p>
                </div>
              </div>
            </Card>

            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Disclaimer:</strong> Hasil ini hanya untuk referensi dan tidak menggantikan 
                diagnosis medis profesional. Segera konsultasi dengan dokter spesialis.
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return null;
}