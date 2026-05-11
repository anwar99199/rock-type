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
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved === 'ar' || saved === 'en') ? saved : 'ar';
    }
    return 'ar';
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
        button: 'ابدأ التحليل لآن'
      },
      plans: 'اختر الباقة المناسبة لك',
      popular: 'الأكثر توفيراً ⭐',
      subscribeBtn: 'اشترك الآن',
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
      errorNoImage: 'الرجاء اختير صورة أولاً',
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
      readLess: 'اقرأ أقل',
      introduction: {
        title: 'مقدمة في عالم التنقيب',
        description: 'التنقيب عن الذهب والأحجار الكريمة هو فن وعلم يتطلب المعرفة والمهارة والصبر. في هذا الدليل الشامل، سنأخذك في رحلة لتعلم كل ما تحتاجه للبدء في البحث عن الكنوز المخفية تحت الأرض.',
        benefits: {
          1: {
            title: 'معرفة علمية',
            description: 'تعلم جيولوجيا الأحجار والمعادن وكيفية تكونها'
          },
          2: {
            title: 'مهارات عملية',
            description: 'اكتسب مهارات التنقيب والبحث الميداني'
          },
          3: {
            title: 'استثمار مربح',
            description: 'فرصة للعثور على معادن وأحجار ثمينة'
          }
        }
      },
      tools: {
        title: 'الأدوات والمعدات الأساسية',
        description: 'تعرف على الأدوات التي تحتاجها للتنقيب الناجح',
        badges: {
          essential: 'أساسي',
          additional: 'إضافي'
        },
        sections: {
          essential: {
            title: 'أدوات أساسية',
            items: {
              1: {
                title: 'جهاز كشف المعادن',
                description: 'جهاز إلكتروني للكشف عن المعادن تحت الأرض بدقة عالية'
              },
              2: {
                title: 'المعول والمجرفة',
                description: 'أدوات الحفر الأساسية لاستخراج العينات'
              },
              3: {
                title: 'عدسة مكبرة',
                description: 'لفحص الأحجار والمعادن بدقة في الموقع'
              },
              4: {
                title: 'حقيبة جمع العينات',
                description: 'لحفظ ونقل العينات المكتشفة بأمان'
              },
              5: {
                title: 'خريطة جيولوجية',
                description: 'لتحديد المواقع الواعدة للتنقيب'
              }
            }
          },
          additional: {
            title: 'أدوات إضافية مفيدة',
            items: {
              1: {
                title: 'جهاز GPS',
                description: 'لتحديد المواقع والعودة إليها'
              },
              2: {
                title: 'مطرقة جيولوجية',
                description: 'لكسر الصخور وفحص العينات'
              },
              3: {
                title: 'منخل ومصفاة',
                description: 'لفصل المعادن عن التربة والرمال'
              },
              4: {
                title: 'مصباح رأس LED',
                description: 'للإضاءة أثناء العمل في المناطق المظلمة'
              },
              5: {
                title: 'حقيبة إسعافات أولية',
                description: 'للطوارئ أثناء التنقيب في المناطق النائية'
              }
            }
          }
        }
      },
      techniques: {
        title: 'تقنيات التنقيب والبحث',
        items: {
          1: {
            title: 'البحث في الأودية والسيول',
            description: 'الأودية والمجاري المائية القديمة هي من أفضل الأماكن للبحث عن الذهب والأحجار الكريمة:',
            locations: {
              1: 'ابحث في المناطق التي تتجمع فيها الرواسب',
              2: 'افحص الصخور الكبيرة والشقوق',
              3: 'ركز على المنحنيات والانعطافات في المجرى',
              4: 'افحص المناطق خلف العوائق الطبيعية'
            }
          },
          2: {
            title: 'قراءة علامات الأرض',
            description: 'تعلم كيفية قراءة التضاريس والعلامات الجيولوجية:',
            types: {
              1: {
                title: 'التغير في لون التربة',
                description: 'قد يشير إلى وجود معادن'
              },
              2: {
                title: 'الصخور المكسرة أو المتحللة',
                description: 'علامة على نشاط جيولوجي'
              },
              3: {
                title: 'وجود الكوارتز',
                description: 'غالباً ما يرافق الذهب والأحجار الكريمة'
              }
            }
          },
          3: {
            title: 'طرق الاستخراج الصحيحة',
            methods: {
              1: {
                title: 'الحفر السطحي',
                description: 'ابدأ بإزالة الطبقة السطحية بعناية'
              },
              2: {
                title: 'الغربلة والنخل',
                description: 'استخدم المنخل لفصل المعادن الثقيلة'
              },
              3: {
                title: 'الفحص المجهري',
                description: 'افحص العينات بالعدسة المكبرة'
              }
            }
          },
          4: {
            title: 'التعرف على المؤشرات الجيولوجية',
            description: 'هذه علامات تدل على وجود محتمل للمعادن الثمينة:',
            indicators: {
              1: {
                title: 'عروق الكوارتز البيضاء',
                description: 'غالباً ما تحتوي على ذهب أو فضة'
              },
              2: {
                title: 'الصخور الحديدية الحمراء',
                description: 'قد تشير إلى وجود معادن ثمينة'
              },
              3: {
                title: 'التكوينات البركانية',
                description: 'مواقع محتملة للأحجار الكريمة'
              },
              4: {
                title: 'الطبقات الرسوبية القديمة',
                description: 'قد تحتوي على أحجار كريمة متحجرة'
              }
            }
          }
        }
      },
      safety: {
        title: 'قواعد السلامة والأمان',
        description: 'سلامتك أولوية قصوى أثناء التنقيب',
        rules: {
          1: {
            title: 'لا تذهب بمفردك',
            description: 'اصطحب دائماً رفيقاً للطوارئ'
          },
          2: {
            title: 'أخبر أحداً بموقعك',
            description: 'شارك خططك ومكان تواجدك مع الآخرين'
          },
          3: {
            title: 'احمل ماء كافٍ',
            description: 'خاصة في المناطق الصحراوية والحارة'
          },
          4: {
            title: 'تجنب المناطق الخطرة',
            description: 'ابتعد عن المنحدرات والكهوف غير المستقرة'
          },
          5: {
            title: 'احترم القوانين المحلية',
            description: 'احصل على التصاريح اللازمة قبل التنقيب'
          },
          6: {
            title: 'ارتدِ معدات الحماية',
            description: 'خوذة، قفازات، وأحذية قوية'
          }
        }
      },
      locations: {
        title: 'أفضل مواقع التنقيب في الخليج',
        description: 'تعرف على المناطق الغنية بالمعادن والأحجار الكريمة',
        items: {
          1: {
            title: 'جبال عمان',
            description: 'مشهورة بتنوع الأحجار الكريمة والمعادن',
            gems: {
              1: 'العقيق',
              2: 'الكوارتز',
              3: 'الجاسبر',
              4: 'النحاس'
            }
          },
          2: {
            title: 'صحراء الربع الخالي',
            description: 'تحتوي على رواسب معدنية قيمة',
            gems: {
              1: 'الذهب',
              2: 'الفضة',
              3: 'النيازك'
            }
          },
          3: {
            title: 'وديان المملكة',
            description: 'غنية بالذهب والأحجار شبه الكريمة',
            gems: {
              1: 'الذهب',
              2: 'العقيق',
              3: 'الجمشت'
            }
          },
          4: {
            title: 'سواحل الخليج',
            description: 'مصدر للؤلؤ والمرجان',
            gems: {
              1: 'اللؤلؤ',
              2: 'المرجان',
              3: 'الأحجار البحرية'
            }
          }
        }
      }
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
      plans: 'Choose the right plan for you',
      popular: 'Most Affordable ⭐',
      subscribeBtn: 'Subscribe Now',
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
      readLess: 'Read Less',
      introduction: {
        title: 'Introduction to Prospecting',
        description: 'Prospecting for gold and gemstones is both an art and a science that requires knowledge, skill, and patience. In this comprehensive guide, we will take you on a journey to learn everything you need to start searching for hidden treasures beneath the earth.',
        benefits: {
          1: {
            title: 'Scientific Knowledge',
            description: 'Learn geology of stones and minerals and how they form'
          },
          2: {
            title: 'Practical Skills',
            description: 'Acquire prospecting and fieldwork skills'
          },
          3: {
            title: 'Profitable Investment',
            description: 'Opportunity to find precious metals and stones'
          }
        }
      },
      tools: {
        title: 'Essential Tools and Equipment',
        description: 'Learn about the tools you need for successful prospecting',
        badges: {
          essential: 'Essential',
          additional: 'Additional'
        },
        sections: {
          essential: {
            title: 'Essential Tools',
            items: {
              1: {
                title: 'Metal Detector',
                description: 'Electronic device for detecting metals underground with high accuracy'
              },
              2: {
                title: 'Pick and Shovel',
                description: 'Basic excavation tools for sample collection'
              },
              3: {
                title: 'Magnifying Glass',
                description: 'For examining stones and minerals in detail on-site'
              },
              4: {
                title: 'Sample Collection Bag',
                description: 'For safely storing and transporting discovered samples'
              },
              5: {
                title: 'Geological Map',
                description: 'For identifying promising prospecting locations'
              }
            }
          },
          additional: {
            title: 'Useful Additional Tools',
            items: {
              1: {
                title: 'GPS Device',
                description: 'For locating and returning to sites'
              },
              2: {
                title: 'Geological Hammer',
                description: 'For breaking rocks and examining samples'
              },
              3: {
                title: 'Screen and Sieve',
                description: 'For separating minerals from soil and sand'
              },
              4: {
                title: 'LED Headlamp',
                description: 'For lighting while working in dark areas'
              },
              5: {
                title: 'First Aid Kit',
                description: 'For emergencies during prospecting in remote areas'
              }
            }
          }
        }
      },
      techniques: {
        title: 'Prospecting and Search Techniques',
        items: {
          1: {
            title: 'Searching in Alluvial and Sedimentary Deposits',
            description: 'Alluvial and ancient waterways are among the best places to search for gold and gemstones:',
            locations: {
              1: 'Search in areas where sediments accumulate',
              2: 'Examine large rocks and crevices',
              3: 'Focus on bends and curves in the waterway',
              4: 'Examine areas behind natural obstacles'
            }
          },
          2: {
            title: 'Reading Earth Signs',
            description: 'Learn how to read landscapes and geological signs:',
            types: {
              1: {
                title: 'Change in Soil Color',
                description: 'May indicate the presence of minerals'
              },
              2: {
                title: 'Broken or Weathered Rocks',
                description: 'Sign of geological activity'
              },
              3: {
                title: 'Presence of Quartz',
                description: 'Often accompanies gold and gemstones'
              }
            }
          },
          3: {
            title: 'Correct Extraction Methods',
            methods: {
              1: {
                title: 'Surface Mining',
                description: 'Start by carefully removing the surface layer'
              },
              2: {
                title: 'Screening and Panning',
                description: 'Use the screen to separate heavy minerals'
              },
              3: {
                title: 'Microscopic Examination',
                description: 'Examine samples with a magnifying glass'
              }
            }
          },
          4: {
            title: 'Identifying Geological Indicators',
            description: 'These signs indicate the likely presence of precious metals:',
            indicators: {
              1: {
                title: 'White Quartz Veins',
                description: 'Often contain gold or silver'
              },
              2: {
                title: 'Red Iron Ore',
                description: 'May indicate the presence of precious metals'
              },
              3: {
                title: 'Volcanic Formations',
                description: 'Potential locations for gemstones'
              },
              4: {
                title: 'Ancient Sedimentary Layers',
                description: 'May contain fossilized precious stones'
              }
            }
          }
        }
      },
      safety: {
        title: 'Safety and Security Rules',
        description: 'Your safety is the top priority while prospecting',
        rules: {
          1: {
            title: 'Do not go alone',
            description: 'Always take a companion for emergencies'
          },
          2: {
            title: 'Inform someone of your location',
            description: 'Share your plans and location with others'
          },
          3: {
            title: 'Carry enough water',
            description: 'Especially in arid and hot areas'
          },
          4: {
            title: 'Avoid dangerous areas',
            description: 'Stay away from unstable cliffs and caves'
          },
          5: {
            title: 'Respect local laws',
            description: 'Obtain necessary permits before prospecting'
          },
          6: {
            title: 'Wear protective gear',
            description: 'Helmet, gloves, and sturdy shoes'
          }
        }
      },
      locations: {
        title: 'Best Prospecting Locations in the Gulf',
        description: 'Learn about areas rich in minerals and gemstones',
        items: {
          1: {
            title: 'Oman Mountains',
            description: 'Famous for a variety of gemstones and minerals',
            gems: {
              1: 'Quartz',
              2: 'Jasper',
              3: 'Copper'
            }
          },
          2: {
            title: 'Rub\' al-Khali Desert',
            description: 'Contains valuable mineral sediments',
            gems: {
              1: 'Gold',
              2: 'Silver',
              3: 'Nephrite'
            }
          },
          3: {
            title: 'Wadi Al-Dawasir',
            description: 'Rich in gold and semi-precious stones',
            gems: {
              1: 'Gold',
              2: 'Quartz',
              3: 'Malachite'
            }
          },
          4: {
            title: 'Gulf Coastlines',
            description: 'Source of pearls and coral',
            gems: {
              1: 'Pearls',
              2: 'Coral',
              3: 'Marine Stones'
            }
          }
        }
      }
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