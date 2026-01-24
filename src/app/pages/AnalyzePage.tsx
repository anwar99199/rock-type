import { Gem } from 'lucide-react';
import { StoneAnalyzer } from '@/app/components/StoneAnalyzer';
import { Toaster } from 'sonner';

export function AnalyzePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" dir="rtl">
      <div className="container mx-auto px-4 py-8">
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
        <main>
          <StoneAnalyzer />
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