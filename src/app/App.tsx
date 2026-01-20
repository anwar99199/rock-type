import { useState, useRef } from 'react';
import { Upload, Loader2, Camera, Gem, Sparkles, Zap, Shield, ArrowLeft } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function App() {
  const [showApp, setShowApp] = useState(false);
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

  // Landing Page
  if (!showApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50" dir="rtl">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gem className="size-16 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              أداة التعرف على الأحجار
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              اكتشف نوع أي حجر أو معدن في ثوانٍ باستخدام الذكاء الاصطناعي المتطور من OpenAI
            </p>
            <button
              onClick={() => setShowApp(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              ابدأ التحليل الآن
              <Sparkles className="size-5" />
            </button>
          </div>

          {/* Features Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              لماذا تختار أداتنا؟
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Zap className="size-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  تحليل فوري
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  احصل على نتائج دقيقة ومفصلة عن نوع الحجر في ثوانٍ معدودة باستخدام تقنية GPT-4 Vision
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Sparkles className="size-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  معلومات شاملة
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  تعرف على الخصائص الفيزيائية، الاستخدامات، أماكن التواجد، والقيمة السوقية للحجر
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Shield className="size-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  دقة عالية
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  نستخدم أحدث تقنيات الذكاء الاصطناعي لضمان تحليل دقيق وموثوق لجميع أنواع الأحجار والمعادن
                </p>
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              كيف تعمل الأداة؟
            </h2>
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-6 bg-white rounded-xl p-6 shadow-md">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    قم برفع صورة الحجر
                  </h3>
                  <p className="text-gray-600">
                    اختر صورة واضحة للحجر أو المعدن من جهازك (PNG, JPG, JPEG)
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6 bg-white rounded-xl p-6 shadow-md">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    انقر على زر التحليل
                  </h3>
                  <p className="text-gray-600">
                    سيقوم الذكاء الاصطناعي بتحليل الصورة بشكل فوري
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6 bg-white rounded-xl p-6 shadow-md">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    احصل على النتائج المفصلة
                  </h3>
                  <p className="text-gray-600">
                    استعرض تحليل شامل يتضمن نوع الحجر، خصائصه، واستخداماته
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              جاهز للبدء؟
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              اكتشف عالم الأحجار والمعادن بطريقة عصرية وذكية
            </p>
            <button
              onClick={() => setShowApp(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              ابدأ الآن مجاناً
              <Sparkles className="size-5" />
            </button>
          </div>

          {/* Footer */}
          <footer className="mt-20 text-center text-sm text-gray-500">
            <p>مدعوم بتقنية OpenAI Vision | جميع الحقوق محفوظة © 2025</p>
          </footer>
        </div>

        <Toaster position="top-center" theme="light" />
      </div>
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => setShowApp(false)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="size-5" />
          العودة للصفحة الرئيسية
        </button>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gem className="size-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              أداة التعرف على الأحجار
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            استخدم قوة الذكاء الاصطناعي من OpenAI للتعرف على أنواع الأحجار والمعادن من خلال الصور
          </p>
        </header>

        {/* Main Content */}
        <main className="w-full max-w-4xl mx-auto space-y-6">
          {/* Upload Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-2">
                <Camera className="size-6" />
                رفع صورة الحجر
              </h2>
              <p className="text-sm text-gray-600">
                قم برفع صورة واضحة للحجر أو المعدن للتعرف عليه
              </p>
            </div>
            <div className="px-6 pb-6 pt-4">
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
                      <button
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            جاري التحليل...
                          </>
                        ) : (
                          'تحليل الصورة'
                        )}
                      </button>
                      <button
                        onClick={resetAnalyzer}
                        disabled={isAnalyzing}
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        صورة جديدة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Card */}
          {analysis && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  نتائج التحليل
                </h2>
                <p className="text-sm text-gray-600">
                  معلومات مفصلة عن الحجر أو المعدن
                </p>
              </div>
              <div className="px-6 pb-6 pt-4">
                <div className="text-right" dir="rtl">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-base">
                    {analysis}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>مدعوم بتقنية OpenAI Vision</p>
        </footer>
      </div>

      <Toaster position="top-center" theme="light" />
    </div>
  );
}