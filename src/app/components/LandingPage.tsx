import { Link } from 'react-router';
import { Gem, Sparkles, Zap, Shield, BookOpen, GraduationCap } from 'lucide-react';
import { Toaster } from 'sonner';

export function LandingPage() {
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
            اكتشف نوع أي حجر أو معدن في ثوانٍ باستخدام قاعدة بيانات ضخمة من البيانات في الخليج العربي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/analyze"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              ابدأ التحليل الآن
              <Sparkles className="size-5" />
            </Link>
            <Link
              to="/stones"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              موسوعة الأحجار
              <BookOpen className="size-5" />
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              تعلم التنقيب
              <GraduationCap className="size-5" />
            </Link>
          </div>
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
                احصل على نتائج دقيقة ومفصلة عن نوع الحجر في ثوانٍ معدودة من خلال قاعدة بيانات شاملة للأحجار في الخليج العربي
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
                نستخدم أحدث تقنيات لضمان تحليل دقيق وموثوق لجميع أنواع الأحجار والمعادن
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
                  سنقوم بتحليل الصورة بشكل فوري
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

        {/* New Section: Stone Encyclopedia Teaser */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-10 text-white">
          <div className="text-center">
            <BookOpen className="size-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              استكشف موسوعة الأحجار الكريمة
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              تعرّف على أكثر من 50 نوعاً من الأحجار الكريمة الشائعة في دول الخليج
            </p>
            <Link
              to="/stones"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              تصفح الموسوعة الآن
              <BookOpen className="size-5" />
            </Link>
          </div>
        </div>

        {/* New Section: Learning Teaser */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-10 text-white">
          <div className="text-center">
            <GraduationCap className="size-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              تعلم التنقيب عن الأحجار
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              دليل شامل للمبتدئين: الأدوات، التقنيات، السلامة، وأفضل المواقع في الخليج
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all transform hover:scale-105"
            >
              ابدأ التعلم الآن
              <GraduationCap className="size-5" />
            </Link>
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
          <Link
            to="/analyze"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all transform hover:scale-105"
          >
            ابدأ الآن مجاناً
            <Sparkles className="size-5" />
          </Link>
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