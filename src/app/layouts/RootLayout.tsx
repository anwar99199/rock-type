import { Link, Outlet } from 'react-router';
import { Gem, BookOpen, Sparkles, GraduationCap, Map } from 'lucide-react';

export function RootLayout() {
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Gem className="size-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
                أداة التعرف على الأحجار
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Gem className="size-5" />
                <span className="hidden md:inline text-sm">الرئيسية</span>
              </Link>
              
              <Link
                to="/analyze"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Sparkles className="size-5" />
                <span className="hidden md:inline text-sm">تحليل</span>
              </Link>
              
              <Link
                to="/stones"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-sm"
              >
                <BookOpen className="size-5" />
                <span className="hidden md:inline text-sm">الموسوعة</span>
              </Link>

              <Link
                to="/map"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
              >
                <Map className="size-5" />
                <span className="hidden md:inline text-sm">الخريطة</span>
              </Link>

              <Link
                to="/learn"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <GraduationCap className="size-5" />
                <span className="hidden md:inline text-sm">تعلم التنقيب</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}