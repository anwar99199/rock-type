import { Link, Outlet } from 'react-router';
import { Gem, BookOpen, Sparkles, GraduationCap, Video, LogIn, LogOut, User } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAuth } from '@/app/contexts/AuthContext';
import { AuthModal } from '@/app/components/AuthModal';
// Fixed: Added Sign In / Sign Out button to navbar, display logged-in user name,
// and mounted AuthModal so it can appear from any page. Redeploying.

export function RootLayout() {
  const { language, setLanguage, t, dir } = useLanguage();
  const { user, logout, setShowAuthModal } = useAuth();

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm" dir={dir}>
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <Gem className="size-6 sm:size-8 text-blue-600 flex-shrink-0" />
              <span className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white hidden xs:inline truncate">
                {language === 'ar' ? 'أداة التعرف على الأحجار' : 'Stone Recognition Tool'}
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 flex-wrap justify-end">
              <Link to="/" className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Gem className="size-4 sm:size-5" />
                <span className="hidden lg:inline text-sm">{t('nav.home')}</span>
              </Link>

              <Link to="/analyze" className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                <Sparkles className="size-4 sm:size-5" />
                <span className="hidden lg:inline text-sm">{t('nav.analyze')}</span>
              </Link>

              <Link to="/stones" className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm">
                <BookOpen className="size-4 sm:size-5" />
                <span className="hidden lg:inline text-sm">{t('nav.encyclopedia')}</span>
              </Link>

              <Link to="/courses" className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-sm">
                <Video className="size-4 sm:size-5" />
                <span className="hidden lg:inline text-sm">{t('nav.courses')}</span>
              </Link>

              <Link to="/learn" className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm">
                <GraduationCap className="size-4 sm:size-5" />
                <span className="hidden lg:inline text-sm">{t('nav.learning')}</span>
              </Link>

              {/* Auth Button */}
              {user ? (
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="size-3.5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[80px] truncate">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    title={language === 'ar' ? 'تسجيل الخروج' : 'Sign out'}
                    className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-gray-800 transition-colors border border-gray-300 dark:border-gray-600"
                  >
                    <LogOut className="size-4 sm:size-5" />
                    <span className="hidden lg:inline text-sm">
                      {language === 'ar' ? 'خروج' : 'Sign out'}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-sm"
                >
                  <LogIn className="size-4 sm:size-5" />
                  <span className="hidden lg:inline text-sm">
                    {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                  </span>
                </button>
              )}

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-300 dark:border-gray-600"
                title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
              >
                <span className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal />

      <Outlet />
    </>
  );
}
