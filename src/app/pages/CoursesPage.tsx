import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { GraduationCap, Video, Gem, Coins, MapPin, Clock, Star, Play } from 'lucide-react';
import { Link } from 'react-router';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  videoUrl: string;
  thumbnail: string;
  topics: string[];
}

const goldCourses: Course[] = [
  {
    id: 1,
    title: 'أساسيات البحث عن الذهب',
    description: 'تعلم الأساسيات الضرورية للبدء في البحث عن الذهب، بما في ذلك فهم التكوينات الجيولوجية وأنواع الترسبات',
    duration: '15 دقيقة',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/zREjQ7HSkHc',
    thumbnail: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800',
    topics: ['التكوينات الجيولوجية', 'أنواع الترسبات', 'المعدات الأساسية']
  },
  {
    id: 2,
    title: 'أنواع عروق الذهب',
    description: 'دليل شامل لفهم أنواع عروق الذهب المختلفة وكيفية التعرف عليه في الطبيعة',
    duration: '12 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/YJ56NyWIvEg',
    thumbnail: 'https://images.unsplash.com/photo-1583656649916-87aeeacb160a?w=800',
    topics: ['عروق الكوارتز', 'التعرف على العروق', 'أنماط التمعدن']
  },
  {
    id: 3,
    title: 'كيفية البحث ومعرفة أنواع الصخور',
    description: 'دليل شامل للتعرف على أنواع الصخور المختلفة وتقنيات البحث عن المعادن والأحجار الثمينة في التكوينات الصخرية',
    duration: '20 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/e52OwzEV1fE',
    thumbnail: '/src/imports/a.png',
    topics: ['تصنيف الصخور', 'التعرف على الصخور الحاملة للمعادن', 'تقنيات البحث الميداني', 'الخصائص الجيولوجية']
  },
  {
    id: 4,
    title: 'كيف نعرف أن منطقة ما تحتوي على الذهب؟ العلامات السطحية',
    description: 'دليل عملي للتعرف على المؤشرات والعلامات الظاهرة على سطح الأرض التي تدل على احتمالية وجود الذهب في المنطقة',
    duration: '18 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/pNwvzJHTJVg',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    topics: ['العلامات السطحية للذهب', 'قراءة التضاريس', 'المؤشرات البصرية', 'تحليل الصخور']
  },
  {
    id: 5,
    title: 'تعلم اكتشاف الصخور الحاملة للذهب',
    description: 'دليل متخصص للتعرف على خصائص ومميزات الصخور التي تحمل الذهب وكيفية تمييزها في الطبيعة',
    duration: '12 دقيقة',
    level: 'متقدم',
    videoUrl: 'https://www.youtube.com/embed/l1CXLg1uiNQ',
    thumbnail: '/src/imports/a-1.png',
    topics: ['خصائص الصخور الحاملة للذهب', 'المعادن المصاحبة', 'طرق الفحص الميداني', 'العلامات الدالة']
  }
];

const gemCourses: Course[] = [
  {
    id: 7,
    title: 'مدخل إلى عالم الأحجار الكريمة: كيف تبدأ؟',
    description: 'أول درس للبحث عن الأحجار الكريمة: دليل شامل للمبتدئين لبدء رحلتهم في عالم الأحجار الكريمة',
    duration: '3 دقائق',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/XbBnsT3d2IY',
    thumbnail: '/src/imports/_.png',
    topics: ['الأدوات الأساسية للبداية', 'خامات الأحجار الشائعة', 'الخصائص الأساسية', 'إيجاد مرشد محلي']
  },
  {
    id: 8,
    title: 'أشهر أسماء الأحجار الكريمة للمبتدئين',
    description: 'دليل تعريفي بأشهر أنواع الأحجار الكريمة وأسمائها ومميزات كل نوع للمبتدئين',
    duration: '22 دقيقة',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/46Aex5gLjKk',
    thumbnail: '/src/imports/_-1.png',
    topics: ['أسماء الأحجار الكريمة', 'أنواع الأحجار الشهيرة', 'مميزات كل حجر', 'التعرف على الأحجار']
  },
  {
    id: 9,
    title: 'كيفية التفريق بين الحجر الطبيعي والصناعي',
    description: 'دليل عملي لتعلم كيفية التمييز بين الأحجار الكريمة الطبيعية والصناعية باستخدام تقنيات بسيطة',
    duration: '25 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/UAbU8vG8Vlc',
    thumbnail: '/src/imports/_-2.png',
    topics: ['الفرق بين الطبيعي والصناعي', 'طرق الفحص البسيطة', 'علامات الأحجار الطبيعية', 'تجنب الغش']
  },
  {
    id: 10,
    title: 'أدوات فحص الأحجار الكريمة للمبتدئين',
    description: 'دليل شامل للأدوات الأساسية المستخدمة في فحص وتحليل الأحجار الكريمة للمبتدئين',
    duration: '18 دقيقة',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/pn6dJ1iogrY',
    thumbnail: '/src/imports/_-3.png',
    topics: ['أدوات الفحص الأساسية', 'كيفية استخدام العدسة', 'أجهزة القياس', 'فحص الأحجار الكريمة']
  },
  {
    id: 11,
    title: 'طريقة صقل الأحجار الكريمة للمبتدئين',
    description: 'دليل شامل لتعلم تقنيات وطرق صقل وتلميع الأحجار الكريمة الخام للمبتدئين',
    duration: '22 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/mSrTqpXf2QI',
    thumbnail: '/src/imports/_-4.png',
    topics: ['تقنيات الصقل', 'أدوات التلميع', 'تحضير الأحجار', 'مراحل الصقل']
  }
];

function CourseCard({ course }: { course: Course }) {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
        <div className="relative aspect-video bg-gray-900">
          <div className="relative w-full h-full cursor-pointer group">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                <Play className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-black/70 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {course.duration}
              </Badge>
            </div>
          </div>
        </div>
        
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant={course.level === 'مبتدئ' ? 'default' : course.level === 'متوسط' ? 'secondary' : 'destructive'}>
              {course.level}
            </Badge>
            <span className="flex items-center text-sm text-gray-600">
              <Video className="w-4 h-4 mr-1" />
              {course.duration}
            </span>
          </div>
          <CardTitle className="text-xl hover:text-blue-600 transition-colors">
            {course.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {course.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700">محتوى الدرس:</h4>
            <div className="flex flex-wrap gap-2">
              {course.topics.map((topic, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4">
            دروس التنقيب والبحث
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center opacity-90 max-w-3xl mx-auto px-3">
            تعلم كيفية البحث عن الذهب والأحجار الكريمة من خلال دروس فيديو احترافية ومتخصصة
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-4 sm:pt-6 pb-4">
              <Video className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">11</div>
              <div className="text-xs sm:text-sm text-gray-600">دروس فيديو</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-4 sm:pt-6 pb-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">3.2</div>
              <div className="text-xs sm:text-sm text-gray-600">ساعة محتوى</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-4 sm:pt-6 pb-4">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-gray-600">مجاني</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Courses Content */}
      <div className="container mx-auto px-4 pb-16">
        <Tabs defaultValue="gold" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="gold" className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              <span>دروس الذهب</span>
            </TabsTrigger>
            <TabsTrigger value="gems" className="flex items-center gap-2">
              <Gem className="w-4 h-4" />
              <span>دروس الأحجار الكريمة</span>
            </TabsTrigger>
          </TabsList>

          {/* Gold Courses */}
          <TabsContent value="gold">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                🏆 دروس البحث عن الذهب
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                من الأساسيات إلى التقنيات المتقدمة، تعلم كل ما تحتاجه للبدء في البحث عن الذهب
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {goldCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          {/* Gem Courses */}
          <TabsContent value="gems">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                💎 دروس الأحجار الكريمة
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                اكتشف أسرار البحث عن الأحجار الكريمة وتقنيات استخراجها وتقييمها
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gemCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <Card className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              نصائح مهمة قبل البدء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  ⚠️ السلامة أولاً
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• ارتدي معدات الحماية الشخصية دائماً</li>
                  <li>• لا تذهب للتنقيب بمفردك</li>
                  <li>• احمل معدات الإسعافات الأولية</li>
                  <li>• احذر من الحيوانات البرية</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  📋 التصاريح والقوانين
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• احصل عل التصاريح اللازمة</li>
                  <li>• احترم الملكيات الخاصة</li>
                  <li>• التزم بقوانين التعدين المحلية</li>
                  <li>• حافظ على البيئة ونظافة الموقع</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}