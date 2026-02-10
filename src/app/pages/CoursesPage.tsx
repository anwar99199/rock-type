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
    description: 'دليل شامل لفهم أنواع عروق الذهب المختلفة وكيفية التعرف عليه�� في الطبيعة',
    duration: '12 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/YJ56NyWIvEg',
    thumbnail: 'https://images.unsplash.com/photo-1583656649916-87aeeacb160a?w=800',
    topics: ['عروق الكوارتز', 'التعرف على العروق', 'أنماط التمعدن']
  },
  {
    id: 3,
    title: 'استخدام جهاز كشف المعادن للذهب',
    description: 'دليل شامل لاختيار واستخدام أجهزة كشف المعادن المتخصصة في البحث عن الذهب',
    duration: '20 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/NgEwFnfaNJw',
    thumbnail: 'https://images.unsplash.com/photo-1609705528142-1b30c88b308b?w=800',
    topics: ['أنواع الأجهزة', 'إعدادات الجهاز', 'تقنيات المسح']
  },
  {
    id: 4,
    title: 'التنقيب في الأودية والأنهار',
    description: 'تقنيات البحث عن الذهب الغريني في مجاري الأنهار والأودية الجافة',
    duration: '18 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/yHXvWq1ytC0',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    topics: ['الذهب الغريني', 'تقنيات الغسل', 'قراءة التضاريس']
  },
  {
    id: 5,
    title: 'المناطق الواعدة في الخليج العربي',
    description: 'استكشاف المناطق التاريخية والواعدة للتنقيب عن الذهب في دول الخليج',
    duration: '12 دقيقة',
    level: 'متقدم',
    videoUrl: 'https://www.youtube.com/embed/Wz_f9B4pPtg',
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    topics: ['الدرع العربي', 'المناطق المعدنية', 'التصاريح القانونية']
  }
];

const gemCourses: Course[] = [
  {
    id: 6,
    title: 'مقدمة في الأحجار الكريمة',
    description: 'تعرف على أنواع الأحجار الكريمة وكيفية التمييز بينها في الطبيعة',
    duration: '14 دقيقة',
    level: 'مبتدئ',
    videoUrl: 'https://www.youtube.com/embed/OzAdzDcGYlo',
    thumbnail: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=800',
    topics: ['أنواع الأحجار', 'الخصائص الفيزيائية', 'التعرف البصري']
  },
  {
    id: 7,
    title: 'العثور على العقيق اليماني',
    description: 'دليل متخصص للبحث عن العقيق في المناطق الجبلية والصحراوية',
    duration: '22 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/mWyKGZ7uf_s',
    thumbnail: 'https://images.unsplash.com/photo-1611591437611-12b9ad6d9b4c?w=800',
    topics: ['العقيق اليماني', 'المواقع الشهيرة', 'طرق الاستخراج']
  },
  {
    id: 8,
    title: 'تقنيات استخراج الأحجار الكريمة',
    description: 'تعلم التقنيات الآمنة والفعالة لاستخراج الأحجار من الصخور',
    duration: '25 دقيقة',
    level: 'متقدم',
    videoUrl: 'https://www.youtube.com/embed/FRgqNEBWIJY',
    thumbnail: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800',
    topics: ['أدوات الاستخراج', 'تقنيات التكسير', 'السلامة']
  },
  {
    id: 9,
    title: 'تقييم جودة الأحجار الكريمة',
    description: 'كيفية تقييم قيمة وجودة الأحجار الكريمة التي تجدها',
    duration: '16 دقيقة',
    level: 'متوسط',
    videoUrl: 'https://www.youtube.com/embed/CPnRi_OQ3-c',
    thumbnail: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    topics: ['معايير التقييم', 'اللون والنقاء', 'القيمة السوقية']
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            دروس التنقيب والبحث
          </h1>
          <p className="text-lg md:text-xl text-center opacity-90 max-w-3xl mx-auto">
            تعلم كيفية البحث عن الذهب والأحجار الكريمة من خلال دروس فيديو احترافية ومتخصصة
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-3xl font-bold text-gray-900 mb-1">9</div>
              <div className="text-sm text-gray-600">دروس فيديو</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-3xl font-bold text-gray-900 mb-1">2.8</div>
              <div className="text-sm text-gray-600">ساعة محتوى</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-sm text-gray-600">مجاني</div>
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