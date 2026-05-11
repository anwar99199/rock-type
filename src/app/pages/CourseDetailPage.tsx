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
    detailedDescription: 'في هذا الدرس الشامل، ستتعلم الأساسيات الضرورية للبدء في رحلة البحث عن الذهب. سنغطي فهم التكوينات الجيولوجية ال��فية التي قد تحتوي على الذهب، وأنواع الترسبات الذهبية، والمعدات الأساسية التي تحتاجها للبدء. هذا الدرس مثالي للمبتدئين الذين يرغبون في دخول عالم التنقيب عن الذهب.',
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
    title: 'كيفية البحث ومعرفة أنواع الصخور',
    description: 'دليل شامل للتعرف على أنواع الصخور المختلفة وتقنيات البحث عن المعادن والأحجار الثمينة في التكوينات الصخرية',
    duration: '20 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/e52OwzEV1fE',
    thumbnail: '/src/imports/a.png',
    topics: ['تصنيف الصخور', 'التعرف على الصخور الحاملة للمعادن', 'تقنيات البحث الميداني', 'الخصائص الجيولوجية'],
    detailedDescription: 'دليل متكامل للتعرف على أنواع الصخور المختلفة وكيفية البحث عن المعادن والأحجار الثمينة. سنتعلم كيفية تصنيف الصخور بناءً على خصائصها الفيزيائية، والتعرف على الصخور التي قد تحتوي على معادن ثمينة، وتطبيق تقنيات البحث الميداني الفعالة. هذا الدرس أساسي لفهم الجيولوجيا وتحسين فرص العثور على المعادن.',
    learningOutcomes: [
      'التعرف على الأنواع الرئيسية للصخور وخصائصها',
      'تحديد الصخور المحتمل احتواؤها على معادن ثمينة',
      'تطبيق تقنيات البحث الميداني الاحترافية',
      'فهم العلاقة بين التكوينات الجيولوجية والمعادن'
    ]
  },
  {
    id: 4,
    title: 'كيف نعرف أن منطقة ما تحتوي على الذهب؟ العلامات السطحية',
    description: 'دليل عملي للتعرف على المؤشرات والعلامات الظاهرة على سطح الأرض التي تدل على احتمالية وجود الذهب في المنطقة',
    duration: '18 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/pNwvzJHTJVg',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    topics: ['العلامات السطحية للذهب', 'قراءة التضاريس', 'المؤشرات البصرية', 'تحليل الصخور'],
    detailedDescription: 'تعلم كيفية قراءة العلامات الجيولوجية والمؤشرات السطحية التي تدل على احتمالية وجود الذهب في منطقة معينة. سنستكشف كيفية التعرف على الصخور المضيفة للذهب، والعلامات البصرية الدالة على التمعدن، وكيفية تحليل التضاريس والتكوينات الصخرية لتحديد المناطق الواعدة. هذا الدرس ضروري لتوفير الوقت والجهد وزيادة فرص النجاح في التنقيب.',
    learningOutcomes: [
      'التعرف على العلامات السطحية الدالة على وجود الذهب',
      'قراءة التضاريس والتكوينات الجيولوجية بدقة',
      'فهم المؤشرات البصرية للصخور الحاملة للذهب',
      'تحديد المناطق الواعدة قبل البدء في الحفر'
    ]
  },
  {
    id: 5,
    title: 'تعلم اكتشاف الصخور الحاملة للذهب',
    description: 'دليل متخصص للتعرف على خصائص ومميزات الصخور التي تحمل الذهب وكيفية تمييزها في الطبيعة',
    duration: '12 دقيقة',
    level: 'متقدم',
    videoUrl: 'https://www.youtube.com/embed/l1CXLg1uiNQ',
    thumbnail: '/src/imports/a-1.png',
    topics: ['خصائص الصخور الحاملة للذهب', 'المعادن المصاحبة', 'طرق الفحص الميداني', 'العلامات الدالة'],
    detailedDescription: 'دليل متقدم ومتخصص لتعلم كيفية اكتشاف وتمييز الصخور التي تحتوي على الذهب في الطبيعة. سنتعمق في دراسة الخصائص الفيزيائية والكيميائية للصخور الحاملة للذهب، والمعادن المصاحبة التي تدل على وجود الذهب، وطرق الفحص الميداني الاحترافية. هذا الدرس ضروري للمنقبين الجادين الذين يريدون تطوير مهاراتهم في التعرف على الصخور الواعدة.',
    learningOutcomes: [
      'التعرف على الخصائص الفريدة للصخور الحاملة للذهب',
      'تحديد المعادن المصاحبة والمؤشرات الجيولوجية',
      'تطبيق طرق الفحص الميداني الاحترافية',
      'تقييم احتمالية وجود الذهب في عينات الصخور'
    ]
  },
  {
    id: 7,
    title: 'مدخل إلى عالم الأحجار الكريمة: كيف تبدأ؟',
    description: 'أول درس للبحث عن الأحجار الكريمة: دليل شامل للمبتدئين لبدء رحلتهم في عالم الأحجار الكريمة',
    duration: '3 دقائق',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/XbBnsT3d2IY',
    thumbnail: '/src/imports/_.png',
    topics: ['الأدوات الأساسية للبداية', 'خامات الأحجار الشائعة', 'الخصائص الأساسية', 'إيجاد مرشد محلي'],
    detailedDescription: 'دليل شامل ومبسط للمبتدئين الراغبين في دخول عالم الأحجار الكريمة. سنتعلم الخطوات الأولى للبدء، بدءاً من الحصول على الأدوات الأساسية الميدانية، مروراً بتعلم خامات الأحجار الشائعة، وفهم الخصائص الأساسية للأحجار الكريمة، وصولاً إلى إيجاد مرشد محلي يساعدك في رحلتك. هذا الدرس مثالي لكل من يريد البدء في هذا المجال الرائع.',
    learningOutcomes: [
      'الحصول على الأدوات الميدانية الأساسية المناسبة',
      'تعلم خامات الأحجار الشائعة والتعرف عليها',
      'فهم الخصائص الأساسية للأحجار الكريمة',
      'إيجاد مرشد محلي موثوق للتعلم منه'
    ]
  },
  {
    id: 8,
    title: 'أشهر أسماء الأحجار الكريمة للمبتدئين',
    description: 'دليل تعريفي بأشهر أنواع الأحجار الكريمة وأسمائها ومميزات كل نوع للمبتدئين',
    duration: '22 دقيقة',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/46Aex5gLjKk',
    thumbnail: '/src/imports/_-1.png',
    topics: ['أسماء الأحجار الكريمة', 'أنواع الأحجار الشهيرة', 'مميزات كل حجر', 'التعرف على الأحجار'],
    detailedDescription: 'دليل شامل للمبتدئين للتعرف على أشهر أسماء الأحجار الكريمة وأنواعها. سنتعلم الأسماء الصحيحة لأشهر الأحجار الكريمة، وكيفية التمييز بينها، ومميزات كل نوع، والخصائص التي تجعل كل حجر فريداً. هذا الدرس مثالي للمبتدئين الذين يريدون بناء قاعدة معرفية قوية في عالم الأحجار الكريمة.',
    learningOutcomes: [
      'معرفة أسماء أشهر الأحجار الكريمة بشكل صحيح',
      'التمييز بين أنواع الأحجار المختلفة',
      'فهم مميزات وخصائص كل نوع من الأحجار',
      'بناء قاعدة معرفية قوية للمبتدئين'
    ]
  },
  {
    id: 9,
    title: 'كيفية التفريق بين الحجر الطبيعي والصناعي',
    description: 'دليل عملي لتعلم كيفية التمييز بين الأحجار الكريمة الطبيعية والصناعية باستخدام تقنيات بسيطة',
    duration: '25 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/UAbU8vG8Vlc',
    thumbnail: '/src/imports/_-2.png',
    topics: ['الفرق بين الطبيعي والصناعي', 'طرق الفحص البسيطة', 'علامات الأحجار الطبيعية', 'تجنب الغش'],
    detailedDescription: 'دليل شامل وعملي لتعلم كيفية التمييز بين الأحجار الكريمة الطبيعية والصناعية. سنتعلم العلامات المميزة للأحجار الطبيعية، وطرق الفحص البسيطة التي يمكن تطبيقها في المنزل، وكيفية كشف الأحجار المزيفة أو الصناعية، وحماية نفسك من الغش عند الشراء. هذه المهارة ضرورية لأي شخص مهتم بالأحجار الكريمة.',
    learningOutcomes: [
      'التمييز بين الأحجار الطبيعية والصناعية بدقة',
      'تطبيق طرق الفحص البسيطة والعملية',
      'التعرف على علامات الأحجار الطبيعية الحقيقية',
      'حماية نفسك من الغش والتزييف عند الشراء'
    ]
  },
  {
    id: 10,
    title: 'أدوات فحص الأحجار الكريمة للمبتدئين',
    description: 'دليل شامل للأدوات الأساسية المستخدمة في فحص وتحليل الأحجار الكريمة للمبتدئين',
    duration: '18 دقيقة',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/pn6dJ1iogrY',
    thumbnail: '/src/imports/_-3.png',
    topics: ['أدوات الفحص الأساسية', 'كيفية استخدام العدسة', 'أجهزة القياس', 'فحص الأحجار الكريمة'],
    detailedDescription: 'دليل شامل للمبتدئين للتعرف على الأدوات الأساسية المستخدمة في فحص وتحليل الأحجار الكريمة. سنتعلم كيفية استخدام العدسة المكبرة، وأجهزة القياس الأساسية، وأدوات الفحص المختلفة للتعرف على خصائص الأحجار. هذا الدرس مثالي للمبتدئين الذين يريدون تطوير مهاراتهم في فحص الأحجار الكريمة.',
    learningOutcomes: [
      'التعرف على أدوات الفحص الأساسية واستخداماتها',
      'تعلم كيفية استخدام العدسة المكبرة بشكل صحيح',
      'فهم أجهزة القياس وطرق استخدامها',
      'تطبيق تقنيات فحص الأحجار الكريمة العملية'
    ]
  },
  {
    id: 11,
    title: 'طريقة صقل الأحجار الكريمة للمبتدئين',
    description: 'دليل شامل لتعلم تقنيات وطرق صقل وتلميع الأحجار الكريمة الخام للمبتدئين',
    duration: '22 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/mSrTqpXf2QI',
    thumbnail: '/src/imports/_-4.png',
    topics: ['تقنيات الصقل', 'أدوات التلميع', 'تحضير الأحجار', 'مراحل الصقل'],
    detailedDescription: 'دليل متكامل لتعلم تقنيات صقل وتلميع الأحجار الكريمة الخام. سنتعلم كيفية تحضير الأحجار للصقل، والأدوات الم��تخدمة في عملية التلميع، ومراحل الصقل المختلفة للحصول على أفضل النتائج. هذا الدرس مثالي لمن يريد تحويل الأحجار الخام إلى قطع جميلة ولامعة.',
    learningOutcomes: [
      'تعلم تقنيات الصقل الأساسية للأحجار الكريمة',
      'معرفة أدوات التلميع واستخداماتها',
      'فهم مراحل الصقل من البداية للنهاية',
      'تطبيق طرق تحضير الأحجار بشكل احترافي'
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