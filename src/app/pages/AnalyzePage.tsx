import { Gem } from 'lucide-react';
import { StoneAnalyzer } from '@/app/components/StoneAnalyzer';
import { Toaster } from 'sonner';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function AnalyzePage() {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" dir={dir}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Gem className="size-8 sm:size-10 md:size-12 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {t('analyze.title')}
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-3">
            {t('analyze.subtitle')}
          </p>
        </header>

        {/* Main Content */}
        <main>
          <StoneAnalyzer />
        </main>

        {/* Footer */}
        <footer className="mt-8 sm:mt-12 md:mt-16 text-center text-xs sm:text-sm text-gray-500 px-3">
          <p>{t('analyze.footer')}</p>
        </footer>
      </div>

      <Toaster position="top-center" theme="light" />
    </div>
  );
}