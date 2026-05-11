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
import { useLanguage } from '@/app/contexts/LanguageContext';

export function LearningPage() {
  const { t, dir } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-slate-50 to-blue-50" dir={dir}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-12 mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Pickaxe className="size-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('learning.title')}
          </h1>
          <p className="text-xl text-emerald-100">
            {t('learning.subtitle')}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="size-8 text-emerald-600" />
              {t('learning.introduction.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-right space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('learning.introduction.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <CheckCircle className="size-6 text-emerald-600 mb-2" />
                <h4 className="font-bold mb-1">{t('learning.introduction.benefits.1.title')}</h4>
                <p className="text-sm text-gray-600">{t('learning.introduction.benefits.1.description')}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <CheckCircle className="size-6 text-blue-600 mb-2" />
                <h4 className="font-bold mb-1">{t('learning.introduction.benefits.2.title')}</h4>
                <p className="text-sm text-gray-600">{t('learning.introduction.benefits.2.description')}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <CheckCircle className="size-6 text-purple-600 mb-2" />
                <h4 className="font-bold mb-1">{t('learning.introduction.benefits.3.title')}</h4>
                <p className="text-sm text-gray-600">{t('learning.introduction.benefits.3.description')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Pickaxe className="size-8 text-blue-600" />
              {t('learning.tools.title')}
            </CardTitle>
            <CardDescription>{t('learning.tools.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Essential Tools */}
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800">{t('learning.tools.badges.essential')}</Badge>
                  {t('learning.tools.sections.essential.title')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.essential.items.1.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.essential.items.1.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.essential.items.2.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.essential.items.2.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.essential.items.3.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.essential.items.3.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.essential.items.4.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.essential.items.4.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.essential.items.5.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.essential.items.5.description')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Tools */}
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">{t('learning.tools.badges.additional')}</Badge>
                  {t('learning.tools.sections.additional.title')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.additional.items.1.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.additional.items.1.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.additional.items.2.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.additional.items.2.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.additional.items.3.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.additional.items.3.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.additional.items.4.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.additional.items.4.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-semibold">{t('learning.tools.sections.additional.items.5.title')}</h5>
                      <p className="text-sm text-gray-600">{t('learning.tools.sections.additional.items.5.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety */}
        <Card className="mb-8 border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-2xl text-red-800">
              <ShieldAlert className="size-8" />
              {t('learning.safety.title')}
            </CardTitle>
            <CardDescription className="text-red-600">
              {t('learning.safety.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">{t('learning.safety.rules.1.title')}</h5>
                  <p className="text-sm text-gray-700">{t('learning.safety.rules.1.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">{t('learning.safety.rules.2.title')}</h5>
                  <p className="text-sm text-gray-700">{t('learning.safety.rules.2.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">{t('learning.safety.rules.3.title')}</h5>
                  <p className="text-sm text-gray-700">{t('learning.safety.rules.3.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">{t('learning.safety.rules.4.title')}</h5>
                  <p className="text-sm text-gray-700">{t('learning.safety.rules.4.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">{t('learning.safety.rules.5.title')}</h5>
                  <p className="text-sm text-gray-700">{t('learning.safety.rules.5.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle className="size-6 text-red-600 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">{t('learning.safety.rules.6.title')}</h5>
                  <p className="text-sm text-gray-700">{t('learning.safety.rules.6.description')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            <strong>{t('learning.footer.note.title')}</strong>: {t('learning.footer.note.description')}
          </p>
        </div>
      </div>

      <Toaster position="top-center" theme="light" />
    </div>
  );
}