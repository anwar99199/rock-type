import { 
  Pickaxe, 
  ShieldAlert, 
  Map, 
  Compass, 
  HardHat, 
  FileText, 
  Lightbulb,
  MapPin,
  BookOpen,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Toaster } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export function LearningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-blue-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-12 mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Pickaxe className="size-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            دليل تعلم التنقيب عن الأحجار الكريمة
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            دليلك الشامل لبدء رحلتك في عالم التنقيب عن الأحجار الكريمة والمعادن النفيسة
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="size-8 text-emerald-600" />
              مقدمة عن التنقيب
            </CardTitle>
          </CardHeader>
          <CardContent className="text-right space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              التنقيب عن الأحجار الكريمة هو فن وعلم يجمع بين المعرفة الجيولوجية والمهارة العملية والصبر. 
              سواء كنت هاوياً مبتدئاً أو باحثاً جاداً، فإن فهم أساسيات التنقيب سيساعدك على اكتشاف الكنوز الطبيعية المخبأة في باطن الأرض.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <CheckCircle className="size-6 text-emerald-600 mb-2" />
                <h4 className="font-bold mb-1">نشاط ممتع</h4>
                <p className="text-sm text-gray-600">مغامرة في الطبيعة مع إمكانية اكتشافات مثيرة</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <CheckCircle className="size-6 text-blue-600 mb-2" />
                <h4 className="font-bold mb-1">تعليمي</h4>
                <p className="text-sm text-gray-600">تعلم عن الجيولوجيا والمعادن والأحجار</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <CheckCircle className="size-6 text-purple-600 mb-2" />
                <h4 className="font-bold mb-1">مربح محتمل</h4>
                <p className="text-sm text-gray-600">فرصة للعثور على أحجار ذات قيمة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Pickaxe className="size-8 text-blue-600" />
              أدوات التنقيب الأساسية
            </CardTitle>
            <CardDescription>الأدوات التي تحتاجها لبدء رحلة التنقيب</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Essential Tools */}
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">ضروري</Badge>
                  أدوات أساسية
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">معول جيولوجي</h5>
                      <p className="text-sm text-gray-600">لكسر الصخور واستخراج العينات</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">إزميل وشاكوش</h5>
                      <p className="text-sm text-gray-600">للعمل الدقيق حول الأحجار</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">نظارات واقية</h5>
                      <p className="text-sm text-gray-600">لحماية العين من الشظايا</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">قفازات عمل</h5>
                      <p className="text-sm text-gray-600">لحماية اليدين من الجروح</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">حقيبة ظهر</h5>
                      <p className="text-sm text-gray-600">لحمل الأدوات والعينات</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Tools */}
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">مفيد</Badge>
                  أدوات إضافية
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">عدسة مكبرة (10x)</h5>
                      <p className="text-sm text-gray-600">لفحص الأحجار بدقة</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">جهاز GPS</h5>
                      <p className="text-sm text-gray-600">لتحديد المواقع وعدم الضياع</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">كشاف قوي</h5>
                      <p className="text-sm text-gray-600">للبحث في الشقوق والكهوف</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">دليل الأحجار</h5>
                      <p className="text-sm text-gray-600">كتاب للتعرف على الأحجار في الموقع</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">أكياس وعلب حفظ</h5>
                      <p className="text-sm text-gray-600">لتخزين العينات بأمان</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Techniques */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Compass className="size-8 text-purple-600" />
              تقنيات البحث والتنقيب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-right text-lg font-semibold">
                  1. البحث عن المواقع المناسبة
                </AccordionTrigger>
                <AccordionContent className="text-right space-y-3">
                  <p className="text-gray-700">
                    اختيار الموقع الصحيح هو نصف النجاح في التنقيب. ابحث عن:
                  </p>
                  <ul className="space-y-2 mr-6">
                    <li className="flex items-start gap-2">
                      <MapPin className="size-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>المناطق الجبلية والوديان القديمة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="size-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>مجاري الأنهار الجافة (الوديان)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="size-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>المناطق البركانية القديمة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="size-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>الشقوق والكهوف الصخرية</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-right text-lg font-semibold">
                  2. فحص الصخور والتربة
                </AccordionTrigger>
                <AccordionContent className="text-right space-y-3">
                  <p className="text-gray-700">
                    تعلم كيفية قراءة الإشارات الجيولوجية:
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                    <p><strong>الصخور المتحولة:</strong> غنية بالأحجار الكريمة مثل الياقوت والزمرد</p>
                    <p><strong>الصخور النارية:</strong> قد تحتوي على الألماس والعقيق</p>
                    <p><strong>الصخور الرسوبية:</strong> مصدر للعقيق والأوبال</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-right text-lg font-semibold">
                  3. تقنيات الاستخراج
                </AccordionTrigger>
                <AccordionContent className="text-right space-y-3">
                  <div className="space-y-4">
                    <div className="border-r-4 border-emerald-600 pr-4">
                      <h5 className="font-bold mb-2">الحفر السطحي</h5>
                      <p className="text-gray-600">للأحجار القريبة من السطح، استخدم المعول بعناية</p>
                    </div>
                    <div className="border-r-4 border-blue-600 pr-4">
                      <h5 className="font-bold mb-2">التنقيب في الشقوق</h5>
                      <p className="text-gray-600">استخدم الإزميل لاستخراج الأحجار من الصخور</p>
                    </div>
                    <div className="border-r-4 border-purple-600 pr-4">
                      <h5 className="font-bold mb-2">الغسل والتنقية</h5>
                      <p className="text-gray-600">في مجاري الأنهار، استخدم الغربال لفصل الأحجار عن الرمل</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-right text-lg font-semibold">
                  4. التعرف على الأحجار في الموقع
                </AccordionTrigger>
                <AccordionContent className="text-right space-y-3">
                  <p className="text-gray-700">استخدم هذه المؤشرات للتعرف الأولي:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-bold mb-2">اللون</h6>
                      <p className="text-sm text-gray-600">أول مؤشر ولكن قد يكون مضللاً</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-bold mb-2">اللمعان</h6>
                      <p className="text-sm text-gray-600">زجاجي، معدني، أو باهت</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-bold mb-2">الصلابة</h6>
                      <p className="text-sm text-gray-600">اختبر بأدوات معروفة الصلابة</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-bold mb-2">الشكل البلوري</h6>
                      <p className="text-sm text-gray-600">انظر للأشكال الطبيعية</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Safety */}
        <Card className="mb-8 border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-2xl text-red-800">
              <ShieldAlert className="size-8" />
              إرشادات السلامة المهمة
            </CardTitle>
            <CardDescription className="text-red-600">
              سلامتك أولوية! اتبع هذه الإرش��دات دائماً
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">لا تذهب بمفردك</h5>
                  <p className="text-sm text-gray-700">اصطحب دائماً شريكاً أو أخبر أحداً بموقعك</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">ارتدِ معدات الحماية</h5>
                  <p className="text-sm text-gray-700">خوذة، نظارات، قفازات، وأحذية قوية</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">احذر من الانهيارات</h5>
                  <p className="text-sm text-gray-700">تجنب الحفر تحت الصخور غير المستقرة</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">احمل ماء كافي</h5>
                  <p className="text-sm text-gray-700">خاصة في مناطق الخليج الحارة</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">تحقق من الطقس</h5>
                  <p className="text-sm text-gray-700">لا تذهب في حالة الأمطار أو العواصف</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">احصل على التصاريح</h5>
                  <p className="text-sm text-gray-700">تأكد من أن المنطقة مسموح بالتنقيب فيها</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Locations in Gulf */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Map className="size-8 text-orange-600" />
              مواقع التنقيب في دول الخليج
            </CardTitle>
            <CardDescription>
              أشهر المناطق المعروفة بالأحجار الكريمة في المنطقة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-r-4 border-orange-600 pr-4">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <MapPin className="size-5" />
                  سلطنة عمان
                </h4>
                <p className="text-gray-700 mb-2">
                  من أغنى دول المنطقة بالأحجار الكريمة، خاصة في جبال الحجر
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>العقيق اليماني</Badge>
                  <Badge>الكوارتز</Badge>
                  <Badge>المرجان</Badge>
                  <Badge>اللؤلؤ</Badge>
                </div>
              </div>

              <div className="border-r-4 border-blue-600 pr-4">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <MapPin className="size-5" />
                  المملكة العربية السعودية
                </h4>
                <p className="text-gray-700 mb-2">
                  مناطق جبال الحجاز وعسير والشمال غنية بالمعادن
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>العقيق</Badge>
                  <Badge>الفيروز</Badge>
                  <Badge>الكوارتز الوردي</Badge>
                </div>
              </div>

              <div className="border-r-4 border-green-600 pr-4">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <MapPin className="size-5" />
                  الإمارات العربية المتحدة
                </h4>
                <p className="text-gray-700 mb-2">
                  جبال الحجر في الشمال والمناطق الصحراوية
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>الكوارتز</Badge>
                  <Badge>الجرانيت</Badge>
                  <Badge>اللؤلؤ (تاريخياً)</Badge>
                </div>
              </div>

              <div className="border-r-4 border-purple-600 pr-4">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <MapPin className="size-5" />
                  اليمن
                </h4>
                <p className="text-gray-700 mb-2">
                  موطن العقيق اليماني الأصلي والأحجار النادرة
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">العقيق اليماني</Badge>
                  <Badge variant="secondary">الجزع</Badge>
                  <Badge variant="secondary">اللؤلؤ</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900 flex items-start gap-2">
                <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>تنبيه:</strong> قبل التنقيب في أي منطقة، تأكد من الحصول على التصاريح اللازمة واحترام القوانين المحلية وحقوق الملكية.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips for Beginners */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lightbulb className="size-8 text-yellow-600" />
              نصائح للمبتدئين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">ابدأ بمناطق معروفة</h5>
                    <p className="text-sm text-gray-600">اذهب لمواقع مشهورة بسهولة العثور على الأحجار</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">انضم لمجموعة</h5>
                    <p className="text-sm text-gray-600">التعلم من الخبراء يوفر عليك الكثير من الوقت</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">اقرأ وتعلم</h5>
                    <p className="text-sm text-gray-600">ادرس الجيولوجيا المحلية وخصائص الأحجار</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">كن صبوراً</h5>
                    <p className="text-sm text-gray-600">قد لا تجد شيئاً في أول رحلة، لا تستسلم</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">وثّق اكتشافاتك</h5>
                    <p className="text-sm text-gray-600">احتفظ بسجل للمواقع والأحجار التي وجدتها</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">احترم الطبيعة</h5>
                    <p className="text-sm text-gray-600">لا تترك أثراً سلبياً، احمل نفاياتك معك</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="size-8 text-indigo-600" />
              مصادر تعليمية إضافية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h5 className="font-bold mb-2">📚 كتب مقترحة</h5>
                <ul className="text-sm text-gray-700 space-y-1 mr-4">
                  <li>• "دليل الجيولوجيا الميدانية" - للمبتدئين</li>
                  <li>• "موسوعة الأحجار الكريمة" - مرجع شامل</li>
                  <li>• "التنقيب عن المعادن والأحجار" - دليل عملي</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-bold mb-2">🌐 مواقع مفيدة</h5>
                <ul className="text-sm text-gray-700 space-y-1 mr-4">
                  <li>• منتديات هواة الجيولوجيا العربية</li>
                  <li>• تطبيقات التعرف على الأحجار بالذكاء الاصطناعي</li>
                  <li>• خرائط جيولوجية تفاعلية للمنطقة</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-bold mb-2">👥 المجتمعات والنوادي</h5>
                <ul className="text-sm text-gray-700 space-y-1 mr-4">
                  <li>��� نوادي الجيولوجيا المحلية</li>
                  <li>• مجموعات التنقيب على مواقع التواصل</li>
                  <li>• معارض الأحجار الكريمة والمعادن</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-10 text-center text-white">
          <Pickaxe className="size-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            مستعد لبدء مغامرتك؟
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            الآن بعد أن تعلمت الأساسيات، حان وقت الانطلاق واكتشاف كنوز الأرض!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg">
              حمّل قائمة الأدوات PDF
            </button>
            <button className="bg-emerald-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-900 transition-colors shadow-lg">
              انضم لمجتمع المنقبين
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            <strong>ملاحظة:</strong> التنقيب عن الأحجار الكريمة يتطلب الصبر والممارسة. لا تتوقع نتائج فورية، 
            واستمتع بالرحلة والتعلم. السلامة دائماً أولاً! 🪨💎
          </p>
        </div>
      </div>

      <Toaster position="top-center" theme="light" />
    </div>
  );
}