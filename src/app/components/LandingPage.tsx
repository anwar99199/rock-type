import { Link } from 'react-router';
import { Gem, Sparkles, Zap, Shield, BookOpen, GraduationCap, Video } from 'lucide-react';
import { Toaster } from 'sonner';
import { useLanguage } from '@/app/contexts/LanguageContext';
import heroImage from 'figma:asset/4f15fa2dca52df5fb5661b3b48fc2fbf1998031f.png';

export function LandingPage() {
  const { t, dir } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50" dir={dir}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={`${dir === 'rtl' ? 'lg:order-1' : 'lg:order-1'}`}>
              <div className="flex items-center gap-3 mb-6">
                <Gem className="size-16 text-blue-600" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {t('home.title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                {t('home.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/analyze"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105"
                >
                  {t('home.analyzeBtn')}
                  <Sparkles className="size-5" />
                </Link>
                <Link
                  to="/stones"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-105"
                >
                  {t('home.encyclopediaBtn')}
                  <BookOpen className="size-5" />
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className={`${dir === 'rtl' ? 'lg:order-2' : 'lg:order-2'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white rounded-3xl p-4 shadow-2xl border-4 border-yellow-400/30">
                  <img
                    src={heroImage}
                    alt="Gold in Quartz"
                    className="w-full h-auto rounded-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm">
                    ✨ {dir === 'rtl' ? 'ذهب طبيعي في الكوارتز' : 'Natural Gold in Quartz'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('home.features')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="size-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('home.feature1.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.feature1.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Sparkles className="size-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('home.feature2.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.feature2.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="size-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('home.feature3.title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.feature3.description')}
              </p>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('home.howItWorks')}
          </h2>
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start gap-6 bg-white rounded-xl p-6 shadow-md">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t('home.step1.title')}
                </h3>
                <p className="text-gray-600">
                  {t('home.step1.description')}
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
                  {t('home.step2.title')}
                </h3>
                <p className="text-gray-600">
                  {t('home.step2.description')}
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
                  {t('home.step3.title')}
                </h3>
                <p className="text-gray-600">
                  {t('home.step3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* New Section: Stone Encyclopedia Teaser */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-10 text-white">
          <div className="text-center">
            <BookOpen className="size-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.encyclopediaTeaser.title')}
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              {t('home.encyclopediaTeaser.description')}
            </p>
            <Link
              to="/stones"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              {t('home.encyclopediaTeaser.button')}
              <BookOpen className="size-5" />
            </Link>
          </div>
        </div>

        {/* New Section: Learning Teaser */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-10 text-white">
          <div className="text-center">
            <GraduationCap className="size-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.learningTeaser.title')}
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              {t('home.learningTeaser.description')}
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              {t('home.learningTeaser.button')}
              <GraduationCap className="size-5" />
            </Link>
          </div>
        </div>

        {/* New Section: Courses Teaser */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-10 text-white">
          <div className="text-center">
            <Video className="size-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.coursesTeaser.title')}
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              {t('home.coursesTeaser.description')}
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              {t('home.coursesTeaser.button')}
              <Video className="size-5" />
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('home.cta.description')}
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all transform hover:scale-105"
          >
            {t('home.cta.button')}
            <Sparkles className="size-5" />
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-gray-500">
          <p>{t('home.footer')}</p>
        </footer>
      </div>

      <Toaster position="top-center" theme="light" />
    </div>
  );
}