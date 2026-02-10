import { Link, Outlet } from 'react-router';
import { Gem, BookOpen, Sparkles, GraduationCap, Video, Languages } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function RootLayout() {
  const { language, setLanguage, t, dir } = useLanguage();

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm" dir={dir}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Gem className="size-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
                {language === 'ar' ? 'أداة التعرف على الأحجار' : 'Stone Recognition Tool'}
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Gem className="size-5" />
                <span className="hidden md:inline text-sm">{t('nav.home')}</span>
              </Link>
              
              <Link
                to="/analyze"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Sparkles className="size-5" />
                <span className="hidden md:inline text-sm">{t('nav.analyze')}</span>
              </Link>
              
              <Link
                to="/stones"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
              >
                <BookOpen className="size-5" />
                <span className="hidden md:inline text-sm">{t('nav.encyclopedia')}</span>
              </Link>

              <Link
                to="/courses"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-sm"
              >
                <Video className="size-5" />
                <span className="hidden md:inline text-sm">{t('nav.courses')}</span>
              </Link>

              <Link
                to="/learn"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <GraduationCap className="size-5" />
                <span className="hidden md:inline text-sm">{t('nav.learning')}</span>
              </Link>

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-300 dark:border-gray-600"
                title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
              >
                <Languages className="size-5" />
                <span className="text-sm font-medium">{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}