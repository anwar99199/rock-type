import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Upload, Loader2, Camera } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '@/utils/supabase/info';

export function StoneAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('الرجاء اختيار صورة صالحة');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت');
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
      toast.error('الرجاء اختيار صورة أولاً');
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
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Error response from server:', data);
        toast.error(data.error || 'حدث خطأ أثناء تحليل الصورة');
        return;
      }

      if (data.success) {
        setAnalysis(data.analysis);
        toast.success('تم تحليل الصورة بنجاح!');
      } else {
        toast.error('فشل تحليل الصورة');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('حدث خطأ في الاتصال بالخادم');
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="size-6" />
            رفع صورة الحجر
          </CardTitle>
          <CardDescription>
            قم برفع صورة واضحة للحجر أو المعدن للتعرف عليه
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
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Upload className="size-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-1">انقر لاختيار صورة</p>
                <p className="text-xs text-gray-500">PNG, JPG أو JPEG (الحد الأقصى 5MB)</p>
              </label>
            ) : (
              <div className="w-full space-y-4">
                <div className="relative w-full rounded-lg overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Selected stone"
                    className="w-full h-auto max-h-96 object-contain bg-gray-100"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="size-4 ml-2 animate-spin" />
                        جاري التحليل...
                      </>
                    ) : (
                      'تحليل الصورة'
                    )}
                  </Button>
                  <Button
                    onClick={resetAnalyzer}
                    variant="outline"
                    disabled={isAnalyzing}
                  >
                    صورة جديدة
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
            <CardTitle>نتائج التحليل</CardTitle>
            <CardDescription>معلومات مفصلة عن الحجر أو المعدن</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-right" dir="rtl">
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