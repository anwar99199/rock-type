import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'ar' || saved === 'en') ? saved : 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      analyze: 'تحليل الأحجار',
      encyclopedia: 'موسوعة الأحجار',
      learning: 'تعلم التنقيب',
      courses: 'الدروس'
    },
    home: {
      title: 'اكتشف عالم الأحجار والمعادن',
      subtitle: 'منصة متكاملة للتعرف على الأحجار الكريمة والذهب باستخدام الذكاء الاصطناعي',
      analyzeBtn: 'ابدأ التحليل',
      analyzeDesc: 'حلل صور الأحجار بدقة احترافية',
      encyclopediaBtn: 'استكشف الموسوعة',
      encyclopediaDesc: 'تعرف على 50+ نوع من الأحجار الكريمة',
      learningBtn: 'تعلم التنقيب',
      learningDesc: 'دليلك الشامل لاستكشاف المعادن',
      coursesBtn: 'شاهد الدروس',
      coursesDesc: 'دروس فيديو متخصصة في الذهب والأحجار',
      features: 'الميزات الرئيسية',
      aiAnalysis: 'تحليل ذكي بالـ AI',
      aiAnalysisDesc: 'نستخدم تقنية OpenAI Vision لتحليل دقيق',
      comprehensive: 'موسوعة شاملة',
      comprehensiveDesc: 'معلومات مفصلة عن الأحجار في الخليج',
      education: 'تعليم متخصص',
      educationDesc: 'دروس ودورات من خبراء التعدين',
      gold: 'كشف الذهب',
      goldDesc: 'تحديد احتمالية وجود الذهب والمعادن الثمينة',
      feature1: {
        title: 'تحليل ذكي بالـ AI',
        description: 'نستخدم تقنية OpenAI Vision المتقدمة لتحليل الأحجار والمعادن بدقة عالية'
      },
      feature2: {
        title: 'موسوعة شاملة',
        description: 'معلومات تفصيلية عن أكثر من 50 نوع من الأحجار الكريمة المتواجدة في الخليج'
      },
      feature3: {
        title: 'كشف الذهب والمعادن',
        description: 'تحديد احتمالية وجود الذهب والمعادن الثمينة في العينات'
      },
      howItWorks: 'كيف يعمل؟',
      step1: {
        title: 'التقط أو ارفع صورة',
        description: 'قم بتصوير الحجر أو رفع صورة واضحة له'
      },
      step2: {
        title: 'تحليل فوري',
        description: 'سيقوم الذكاء الاصطناعي بتحليل الصورة وتحديد نوع الحجر'
      },
      step3: {
        title: 'احصل على النتائج',
        description: 'ستحصل على تقرير مفصل يشمل نوع الحجر وخصائصه واحتمالية القيمة'
      },
      encyclopediaTeaser: {
        title: 'موسوعة الأحجار الكريمة',
        description: 'اكتشف أكثر من 50 نوعاً من الأحجار الكريمة والمعادن الموجودة في منطقة الخليج',
        button: 'استكشف الموسوعة'
      },
      learningTeaser: {
        title: 'تعلم التنقيب والاستكشاف',
        description: 'دليل شامل لتعلم أساسيات وتقنيات البحث عن الذهب والأحجار الكريمة',
        button: 'ابدأ التعلم'
      },
      coursesTeaser: {
        title: 'دروس فيديو احترافية',
        description: 'شاهد دروس فيديو متخصصة في كيفية العثور على الذهب والأحجار الكريمة',
        button: 'شاهد الدروس'
      },
      cta: {
        title: 'جاهز لاكتشاف كنوزك؟',
        description: 'ابدأ الآن في تحليل أحجارك واكتشف قيمتها الحقيقية',
        button: 'ابدأ التحليل ��لآن'
      },
      footer: 'مدعوم بتقنية OpenAI Vision | جميع الحقوق محفوظة © 2025'
    },
    analyze: {
      title: 'أداة التعرف على الأحجار',
      subtitle: 'استخدم قوة الذكاء الاصطناعي من OpenAI للتعرف على أنواع الأحجار والمعادن من خلال الصور',
      uploadTitle: 'رفع صورة الحجر',
      uploadDesc: 'قم برفع صورة واضحة للحجر أو المعدن للتعرف عليه',
      clickToUpload: 'انقر لاختيار صورة',
      fileTypes: 'PNG, JPG أو JPEG (الحد الأقصى 5MB)',
      analyzing: 'جاري التحليل...',
      analyzeBtn: 'تحليل الصورة',
      newImage: 'صورة جديدة',
      results: 'نتائج التحليل',
      resultsDesc: 'معلومات مفصلة عن الحجر أو المعدن',
      footer: 'مدعوم بتقنية OpenAI Vision',
      errorInvalidImage: 'الرجاء اختيار صورة صالحة',
      errorLargeFile: 'حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت',
      errorNoImage: 'الرجاء اختيار صورة أولاً',
      success: 'تم تحليل الصورة بنجاح!',
      errorConnection: 'فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت أو المحاولة مرة أخرى لاحقاً',
      errorServer: 'حدث خطأ في الاتصال بالخادم'
    },
    encyclopedia: {
      title: 'موسوعة الأحجار الكريمة',
      subtitle: 'دليلك الشامل للأحجار الكريمة المتواجدة في دول الخليج العربي',
      search: 'ابحث عن حجر...',
      allCategories: 'جميع الفئات',
      precious: 'أحجار كريمة',
      semiprecious: 'أحجار شبه كريمة',
      organic: 'أحجار عضوية',
      industrial: 'أحجار صناعية',
      common: 'أحجار شائعة',
      hardness: 'الصلابة',
      color: 'اللون',
      luster: 'البريق',
      locations: 'أماكن التواجد',
      uses: 'الاستخدامات',
      properties: 'الخصائص',
      noResults: 'لا توجد نتائج',
      tryDifferent: 'جرب كلمات بحث مختلفة'
    },
    learning: {
      title: 'دليل تعلم التنقيب عن الذهب والأحجار الكريمة',
      subtitle: 'تعلم أساسيات وتقنيات البحث عن المعادن الثمينة والأحجار الكريمة',
      readMore: 'اقرأ المزيد',
      readLess: 'اقرأ أقل'
    },
    courses: {
      title: 'دروس فيديو متخصصة',
      subtitle: 'تعلم كيفية العثور على الذهب والأحجار الكريمة من خلال دروس فيديو احترافية',
      allCourses: 'جميع الدروس',
      gold: 'دروس الذهب',
      gemstones: 'دروس الأحجار الكريمة',
      watchNow: 'شاهد الآن',
      duration: 'المدة',
      minutes: 'دقيقة',
      instructor: 'المدرب',
      courseDetails: 'تفاصيل الدرس',
      whatLearn: 'ما سوف تتعلمه',
      requirements: 'المتطلبات',
      description: 'الوصف',
      backToCourses: 'العودة للدروس'
    }
  },
  en: {
    nav: {
      home: 'Home',
      analyze: 'Analyze Stones',
      encyclopedia: 'Encyclopedia',
      learning: 'Learn Prospecting',
      courses: 'Courses'
    },
    home: {
      title: 'Discover the World of Stones and Minerals',
      subtitle: 'A comprehensive platform to identify precious stones and gold using artificial intelligence',
      analyzeBtn: 'Start Analysis',
      analyzeDesc: 'Analyze stone images with professional accuracy',
      encyclopediaBtn: 'Explore Encyclopedia',
      encyclopediaDesc: 'Learn about 50+ types of precious stones',
      learningBtn: 'Learn Prospecting',
      learningDesc: 'Your comprehensive guide to mineral exploration',
      coursesBtn: 'Watch Courses',
      coursesDesc: 'Specialized video courses on gold and gemstones',
      features: 'Key Features',
      aiAnalysis: 'AI-Powered Analysis',
      aiAnalysisDesc: 'We use OpenAI Vision technology for accurate analysis',
      comprehensive: 'Comprehensive Encyclopedia',
      comprehensiveDesc: 'Detailed information about stones in the Gulf region',
      education: 'Specialized Education',
      educationDesc: 'Courses and lessons from mining experts',
      gold: 'Gold Detection',
      goldDesc: 'Identify the probability of gold and precious metals',
      feature1: {
        title: 'AI-Powered Analysis',
        description: 'We use advanced OpenAI Vision technology to analyze stones and minerals with high accuracy'
      },
      feature2: {
        title: 'Comprehensive Encyclopedia',
        description: 'Detailed information about more than 50 types of precious stones found in the Gulf'
      },
      feature3: {
        title: 'Gold & Metal Detection',
        description: 'Determine the probability of gold and precious metals in samples'
      },
      howItWorks: 'How It Works',
      step1: {
        title: 'Capture or Upload Image',
        description: 'Take a photo of the stone or upload a clear image of it'
      },
      step2: {
        title: 'Instant Analysis',
        description: 'AI will analyze the image and identify the type of stone'
      },
      step3: {
        title: 'Get Results',
        description: 'You will receive a detailed report including stone type, properties, and value probability'
      },
      encyclopediaTeaser: {
        title: 'Gemstone Encyclopedia',
        description: 'Discover more than 50 types of precious stones and minerals found in the Gulf region',
        button: 'Explore Encyclopedia'
      },
      learningTeaser: {
        title: 'Learn Prospecting and Exploration',
        description: 'A comprehensive guide to learning the basics and techniques of searching for gold and gemstones',
        button: 'Start Learning'
      },
      coursesTeaser: {
        title: 'Professional Video Courses',
        description: 'Watch specialized video courses on how to find gold and precious stones',
        button: 'Watch Courses'
      },
      cta: {
        title: 'Ready to Discover Your Treasures?',
        description: 'Start analyzing your stones now and discover their true value',
        button: 'Start Analysis Now'
      },
      footer: 'Powered by OpenAI Vision | All rights reserved © 2025'
    },
    analyze: {
      title: 'Stone Recognition Tool',
      subtitle: 'Use the power of OpenAI artificial intelligence to identify types of stones and minerals through images',
      uploadTitle: 'Upload Stone Image',
      uploadDesc: 'Upload a clear image of the stone or mineral to identify it',
      clickToUpload: 'Click to select image',
      fileTypes: 'PNG, JPG or JPEG (Max 5MB)',
      analyzing: 'Analyzing...',
      analyzeBtn: 'Analyze Image',
      newImage: 'New Image',
      results: 'Analysis Results',
      resultsDesc: 'Detailed information about the stone or mineral',
      footer: 'Powered by OpenAI Vision',
      errorInvalidImage: 'Please select a valid image',
      errorLargeFile: 'Image size is too large. Maximum 5MB',
      errorNoImage: 'Please select an image first',
      success: 'Image analyzed successfully!',
      errorConnection: 'Failed to connect to server. Please check your internet connection or try again later',
      errorServer: 'An error occurred while connecting to the server'
    },
    encyclopedia: {
      title: 'Gemstone Encyclopedia',
      subtitle: 'Your comprehensive guide to precious stones found in the Gulf countries',
      search: 'Search for a stone...',
      allCategories: 'All Categories',
      precious: 'Precious Stones',
      semiprecious: 'Semi-Precious Stones',
      organic: 'Organic Stones',
      industrial: 'Industrial Stones',
      common: 'Common Stones',
      hardness: 'Hardness',
      color: 'Color',
      luster: 'Luster',
      locations: 'Locations',
      uses: 'Uses',
      properties: 'Properties',
      noResults: 'No results found',
      tryDifferent: 'Try different search terms'
    },
    learning: {
      title: 'Guide to Learning Prospecting for Gold and Gemstones',
      subtitle: 'Learn the basics and techniques of searching for precious metals and gemstones',
      readMore: 'Read More',
      readLess: 'Read Less'
    },
    courses: {
      title: 'Specialized Video Courses',
      subtitle: 'Learn how to find gold and gemstones through professional video courses',
      allCourses: 'All Courses',
      gold: 'Gold Courses',
      gemstones: 'Gemstone Courses',
      watchNow: 'Watch Now',
      duration: 'Duration',
      minutes: 'minutes',
      instructor: 'Instructor',
      courseDetails: 'Course Details',
      whatLearn: 'What You Will Learn',
      requirements: 'Requirements',
      description: 'Description',
      backToCourses: 'Back to Courses'
    }
  }
};