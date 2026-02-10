import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Upload, Loader2, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '@/utils/supabase/info';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function StoneAnalyzer() {
  const { t, language, dir } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('analyze.errorInvalidImage'));
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('analyze.errorLargeFile'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      setAnalysis('');
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast.error(t('analyze.errorNoImage'));
      return;
    }

    setIsAnalyzing(true);
    setAnalysis('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b2e28bb5/analyze-stone`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            imageBase64: selectedImage,
            language: language, // Send current language to backend
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: t('analyze.errorServer') }));
        console.error('Error response from server:', errorData);
        toast.error(errorData.error || t('analyze.errorServer'));
        return;
      }

      const data = await response.json();

      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        toast.success(t('analyze.success'));
      } else {
        console.error('Invalid response format:', data);
        toast.error(t('analyze.errorServer'));
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        toast.error(t('analyze.errorConnection'));
      } else {
        toast.error(t('analyze.errorServer'));
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalyzer = () => {
    setSelectedImage(null);
    setAnalysis('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <Camera className="size-5 sm:size-6" />
            {t('analyze.uploadTitle')}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {t('analyze.uploadDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
            />
            
            {!selectedImage ? (
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 sm:h-56 md:h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100"
              >
                <Upload className="size-10 sm:size-12 text-gray-400 mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1 px-3 text-center">{t('analyze.clickToUpload')}</p>
                <p className="text-xs text-gray-500 px-3 text-center">{t('analyze.fileTypes')}</p>
              </label>
            ) : (
              <div className="w-full space-y-3 sm:space-y-4">
                <div className="relative w-full rounded-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Selected stone"
                    className="w-full h-auto max-h-64 sm:max-h-80 md:max-h-96 object-contain bg-gray-100"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="flex-1 text-sm sm:text-base py-5 sm:py-6"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className={`size-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'} animate-spin`} />
                        {t('analyze.analyzing')}
                      </>
                    ) : (
                      t('analyze.analyzeBtn')
                    )}
                  </Button>
                  <Button
                    onClick={resetAnalyzer}
                    variant="outline"
                    disabled={isAnalyzing}
                    className="text-sm sm:text-base py-5 sm:py-6"
                  >
                    {t('analyze.newImage')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>{t('analyze.results')}</CardTitle>
            <CardDescription>{t('analyze.resultsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`prose prose-sm max-w-none ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {analysis}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}