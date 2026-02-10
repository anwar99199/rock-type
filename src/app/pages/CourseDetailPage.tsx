import { useParams, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Clock, Star, CheckCircle, BookOpen, Video } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  videoUrl: string;
  thumbnail: string;
  topics: string[];
  detailedDescription?: string;
  learningOutcomes?: string[];
}

const allCourses: Course[] = [
  {
    id: 1,
    title: 'أساسيات البحث عن الذهب',
    description: 'تعلم الأساسيات الضرورية للبدء في البحث عن الذهب، بما في ذلك فهم التكوينات الجيولوجية وأنواع الترسبات',
    duration: '15 دقيقة',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/zREjQ7HSkHc',
    thumbnail: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
    topics: ['التكوينات الجيولوجية', 'أنواع الترسبات', 'المعدات الأساسية'],
    detailedDescription: 'في هذا الدرس الشامل، ستتعلم الأساسيات الضرورية للبدء في رحلة البحث عن الذهب. سنغطي فهم التكوينات الجيولوجية الخلفية التي قد تحتوي على الذهب، وأنواع الترسبات الذهبية، والمعدات الأساسية التي تحتاجها للبدء. هذا الدرس مثالي للمبتدئين الذين يرغبون في دخول عالم التنقيب عن الذهب.',
    learningOutcomes: [
      'فهم التكوينات الجيولوجية التي تحتوي على الذهب',
      'التعرف على أنواع الترسبات الذهبية المختلفة',
      'معرفة المعدات الأساسية المطلوبة للبدء',
      'فهم المبادئ الأساسية للبحث عن الذهب'
    ]
  },
  {
    id: 2,
    title: 'أنواع عروق الذهب',
    description: 'دليل شامل لفهم أنواع عروق الذهب المختلفة وكيفية التعرف عليها في الطبيعة',
    duration: '12 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/YJ56NyWIvEg',
    thumbnail: 'https://images.unsplash.com/photo-1583656649916-87aeeacb160a?w=800',
    topics: ['عروق الكوارتز', 'التعرف على العروق', 'أنماط التمعدن'],
    detailedDescription: 'تعرف على الأنواع المختلفة من عروق الذهب وكيفية التمييز بينها في الطبيعة. سنستكشف عروق الكوارتز الحاملة للذهب، وأنماط التمعدن المختلفة، وكيفية قراءة العلامات الجيولوجية التي تشير إلى وجود الذهب. هذا الدرس ضروري لأي منقب جاد يرغب في تحسين فرصه في العثور على الذهب.',
    learningOutcomes: [
      'التعرف على عروق الكوارتز الحاملة للذهب',
      'فهم أنماط التمعدن المختلفة',
      'قراءة العلامات الجيولوجية الدالة على الذهب',
      'تقييم جودة العروق الذهبية'
    ]
  },
  {
    id: 3,
    title: 'استخدام جهاز كشف المعادن للذهب',
    description: 'دليل شامل لاختيار واستخدام أجهزة كشف المعادن المتخصصة في البحث عن الذهب',
    duration: '20 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/NgEwFnfaNJw',
    thumbnail: 'https://images.unsplash.com/photo-1609705528142-1b30c88b308b?w=800',
    topics: ['أنواع الأجهزة', 'إعدادات الجهاز', 'تقنيات المسح'],
    detailedDescription: 'دليل متعمق لاستخدام أجهزة كشف المعادن في البحث عن الذهب. سنغطي أنواع الأجهزة المختلفة، كيفية ضبط الإعدادات للحصول على أفض النتئج، وتقنيات المسح الفعالة. ستتعلم كيفية التمييز بين الإشارات المختلفة وزيادة فرصك في العثور على الذهب.',
    learningOutcomes: [
      'اختيار الجهاز المناسب لاحتياجاتك',
      'ضبط إعدادات الجهاز بشكل صحيح',
      'إتقان تقنيات المسح الفعالة',
      'التمييز بين إشارات المعادن المختلفة'
    ]
  },
  {
    id: 4,
    title: 'التنقيب في الأودية والأنهار',
    description: 'تقنيات البحث عن الذهب الغريني في مجاري الأنهار والأودية الجافة',
    duration: '18 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/yHXvWq1ytC0',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    topics: ['الذهب الغريني', 'تقنيات الغسل', 'قراءة التضاريس'],
    detailedDescription: 'تعلم تقنيات البحث عن الذهب الغريني في مجاري الأنهار والأودية. سنستكشف كيفية قراءة التضاريس لتحديد الأماكن الواعدة، وتقنيات الغسل المختلفة، وكيفية استخراج الذهب من الرمال والحصى. هذا الدرس مثالي لم يرغب في البحث عن الذهب في المناطق المائية.',
    learningOutcomes: [
      'قراءة تضاريس الأودية والأنهار',
      'تحديد المواقع الواعدة للذهب الغريني',
      'إتقان تقنيات الغسل المختلفة',
      'استخراج الذهب من الرمال بكفاءة'
    ]
  },
  {
    id: 5,
    title: 'المناطق الواعدة في الخليج العربي',
    description: 'استكشاف المناطق التاريخية والواعدة للتنقيب عن الذهب في دول الخليج',
    duration: '12 دقيقة',
    level: 'متقدم',
    videoUrl: 'https://www.youtube.com/embed/Wz_f9B4pPtg',
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    topics: ['الدرع العربي', 'المناطق المعدنية', 'التصاريح القانونية'],
    detailedDescription: 'استكشف المناطق التاريخية والواعدة للتنقيب عن الذهب في منطقة الخليج العربي. سنتناول الدرع العربي وأهميته الجيولوجية، والمناطق المعدنية المعروفة، والتصاريح القانونية المطلوبة للتنقيب. هذا الدرس ضروري لمن يخطط للتنقيب في المنطقة.',
    learningOutcomes: [
      'فهم جيولوجيا الدرع العربي',
      'معرفة المناطق المعدنية الواعدة',
      'فهم متطلبات التصاريح القانونية',
      'التخطيط لرحلات التنقيب بشكل فعال'
    ]
  },
  {
    id: 6,
    title: 'مقدمة في الأحجار الكريمة',
    description: 'تعرف على أنواع الأحجار الكريمة وكيفية التمييز بينها في الطبيعة',
    duration: '14 دقيقة',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/OzAdzDcGYlo',
    thumbnail: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800',
    topics: ['أنواع الأحجار', 'الخصائص الفيزيائية', 'التعرف البصري'],
    detailedDescription: 'مقدمة شاملة لعالم الأحجار الكريمة. ستتعلم عن الأنواع المختلفة من الأحجار الكريمة، خصائصها الفيزيائية، وكيفية التعرف عليها بصرياً في الطبيعة. هذا الدرس مثالي للمبتدئين المهتمين بالأحجار الكريمة.',
    learningOutcomes: [
      'التعرف على أنواع الأحجار الكريمة الرئيسية',
      'فهم الخصائص الفيزيائية للأحجار',
      'تطوير مهارات التعرف البصري',
      'التمييز بين الأحجار الحقيقية والمقلدة'
    ]
  },
  {
    id: 7,
    title: 'العثور على العقيق اليماني',
    description: 'دليل متخصص للبحث عن العقيق في المناطق الجبلية والصحراوية',
    duration: '22 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/mWyKGZ7uf_s',
    thumbnail: 'https://images.unsplash.com/photo-1611591437611-12b9ad6d9b4c?w=800',
    topics: ['العقيق اليماني', 'المواقع الشهيرة', 'طرق الاستخراج'],
    detailedDescription: 'دليل متخصص للبحث عن العقيق اليماني الثمين. سنستكشف المواقع الشهيرة للعقيق، وكيفية التعرف عليه في الطبيعة، وطرق الاستخراج الآمنة والفعالة. العقيق اليماني من أثمن الأحجار في المنطقة، وهذا الدرس يوفر لك المعرفة اللازمة للعثور عليه.',
    learningOutcomes: [
      'التعرف على العقيق اليماني في الطبيعة',
      'معرفة المواقع الشهيرة في المنطقة',
      'تطبيق طرق الاستخراج الآمنة',
      'تقييم جودة العقيق الذي تجده'
    ]
  },
  {
    id: 8,
    title: 'تقنيات استخراج الأحجار الكريمة',
    description: 'تعلم التقنيات الآمنة والفعالة لاستخراج الأحجار من الصخور',
    duration: '25 دقيقة',
    level: 'متقدم',
    videoUrl: 'https://www.youtube.com/embed/FRgqNEBWIJY',
    thumbnail: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
    topics: ['أدوات الاستخراج', 'تقنيات التكسير', 'السلامة'],
    detailedDescription: 'تعلم التقنيات المتقدمة لاستخراج الأحجار الكريمة من الصخور بأمان وفعالية. سنغطي الأدوات المختلفة المستخدمة في الاستخراج، وتقنيات التكسير المناسبة، وإجراءات السلامة الضرورية. هذا الدرس ضروري لأي منقب جاد عن الأحجار الكريمة.',
    learningOutcomes: [
      'استخدام أدوات الاستخراج بشكل صحيح',
      'تطبيق تقنيات التكسير الآمنة',
      'الحفاظ على سلامتك أثناء العمل',
      'استخراج الأحجار دون تلفها'
    ]
  },
  {
    id: 9,
    title: 'تقييم جودة الأحجار الكريمة',
    description: 'كيفية تقييم قيمة وجودة الأحجار الكريمة التي تجدها',
    duration: '16 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/CPnRi_OQ3-c',
    thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    topics: ['معايير التقييم', 'اللون والنقاء', 'القيمة السوقية'],
    detailedDescription: 'تعلم كيفية تقييم جودة وقيمة الأحجار الكريمة التي تجدها. سنغطي معايير التقييم المعتمدة، وكيفية تحليل اللون والنقاء، وفهم القيمة السوقية للأحجار المختلفة. هذا الدرس يساعدك على معرفة القيمة الحقيقية لما تجده.',
    learningOutcomes: [
      'فهم معايير التقييم الدولية',
      'تحليل اللون والنقاء بشكل احترافي',
      'تقدير القيمة السوقية للأحجار',
      'اتخاذ قرارات مستنيرة عند البيع'
    ]
  }
];

export function CourseDetailPage() {
  const { courseId } = useParams();
  const course = allCourses.find(c => c.id === Number(courseId));

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">الدرس غير موجود</h1>
          <Link to="/courses" className="text-blue-600 hover:underline">
            العودة إلى الدروس
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/courses" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>العودة إلى الدروس</span>
          </Link>
        </div>
      </div>

      {/* Video Section - Full Width */}
      <div className="bg-black">
        <div className="container mx-auto">
          <div className="aspect-video">
            <iframe
              src={`${course.videoUrl}?rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&iv_load_policy=3`}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={course.level === 'مبتدئ' ? 'default' : course.level === 'متوسط' ? 'secondary' : 'destructive'}>
                {course.level}
              </Badge>
              <span className="flex items-center text-gray-600 gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center text-yellow-600 gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-gray-900 font-semibold">4.8</span>
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {course.detailedDescription || course.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  ماذا ستتعلم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.learningOutcomes?.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Course Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  محتوى الدرس
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Info Banner */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="py-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{course.duration}</div>
                  <div className="text-sm text-gray-600">مدة الدرس</div>
                </div>
                <div>
                  <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">مجاني</div>
                  <div className="text-sm text-gray-600">التكلفة</div>
                </div>
                <div>
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">مدى الحياة</div>
                  <div className="text-sm text-gray-600">الوصول</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <Link 
              to="/courses"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              <BookOpen className="w-5 h-5" />
              استكشف المزيد من الدروس
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}