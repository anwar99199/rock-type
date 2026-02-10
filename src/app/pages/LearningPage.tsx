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

        {/* Techniques */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Compass className="size-8 text-purple-600" />
              {t('learning.techniques.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-right text-lg font-semibold">
                  1. {t('learning.techniques.items.1.title')}
                </AccordionTrigger>
                <AccordionContent className="text-right space-y-3">
                  <p className="text-gray-700">
                    {t('learning.techniques.items.1.description')}
                  </p>
                  <ul className="space-y-2 mr-6">
                    <li className="flex items-start gap-2">
                      <MapPin className="size-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>{t('learning.techniques.items.1.locations.1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="size-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>{t('learning.techniques.items.1.locations.2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="size-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>{t('learning.techniques.items.1.locations.3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="size-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>{t('learning.techniques.items.1.locations.4')}</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-right text-lg font-semibold">
                  2. {t('learning.techniques.items.2.title')}
                </AccordionTrigger>
                <AccordionContent className="text-right space-y-3">
                  <p className="text-gray-700">
                    {t('learning.techniques.items.2.description')}
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                    <p><strong>{t('learning.techniques.items.2.types.1.title')}</strong>: {t('learning.techniques.items.2.types.1.description')}</p>
                    <p><strong>{t('learning.techniques.items.2.types.2.title')}</strong>: {t('learning.techniques.items.2.types.2.description')}</p>
                    <p><strong>{t('learning.techniques.items.2.types.3.title')}</strong>: {t('learning.techniques.items.2.types.3.description')}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-right text-lg font-semibold">
                  3. {t('learning.techniques.items.3.title')}
                </AccordionTrigger>
                <AccordionContent className="text-right space-y-3">
                  <div className="space-y-4">
                    <div className="border-r-4 border-emerald-600 pr-4">
                      <h5 className="font-bold mb-2">{t('learning.techniques.items.3.methods.1.title')}</h5>
                      <p className="text-gray-600">{t('learning.techniques.items.3.methods.1.description')}</p>
                    </div>
                    <div className="border-r-4 border-blue-600 pr-4">
                      <h5 className="font-bold mb-2">{t('learning.techniques.items.3.methods.2.title')}</h5>
                      <p className="text-gray-600">{t('learning.techniques.items.3.methods.2.description')}</p>
                    </div>
                    <div className="border-r-4 border-purple-600 pr-4">
                      <h5 className="font-bold mb-2">{t('learning.techniques.items.3.methods.3.title')}</h5>
                      <p className="text-gray-600">{t('learning.techniques.items.3.methods.3.description')}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-right text-lg font-semibold">
                  4. {t('learning.techniques.items.4.title')}
                </AccordionTrigger>
                <AccordionContent className="text-right space-y-3">
                  <p className="text-gray-700">{t('learning.techniques.items.4.description')}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-bold mb-2">{t('learning.techniques.items.4.indicators.1.title')}</h6>
                      <p className="text-sm text-gray-600">{t('learning.techniques.items.4.indicators.1.description')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-bold mb-2">{t('learning.techniques.items.4.indicators.2.title')}</h6>
                      <p className="text-sm text-gray-600">{t('learning.techniques.items.4.indicators.2.description')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-bold mb-2">{t('learning.techniques.items.4.indicators.3.title')}</h6>
                      <p className="text-sm text-gray-600">{t('learning.techniques.items.4.indicators.3.description')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h6 className="font-bold mb-2">{t('learning.techniques.items.4.indicators.4.title')}</h6>
                      <p className="text-sm text-gray-600">{t('learning.techniques.items.4.indicators.4.description')}</p>
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

        {/* Best Locations in Gulf */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Map className="size-8 text-orange-600" />
              {t('learning.locations.title')}
            </CardTitle>
            <CardDescription>
              {t('learning.locations.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-r-4 border-orange-600 pr-4">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <MapPin className="size-5" />
                  {t('learning.locations.items.1.title')}
                </h4>
                <p className="text-gray-700 mb-2">
                  {t('learning.locations.items.1.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>{t('learning.locations.items.1.gems.1')}</Badge>
                  <Badge>{t('learning.locations.items.1.gems.2')}</Badge>
                  <Badge>{t('learning.locations.items.1.gems.3')}</Badge>
                  <Badge>{t('learning.locations.items.1.gems.4')}</Badge>
                </div>
              </div>

              <div className="border-r-4 border-blue-600 pr-4">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <MapPin className="size-5" />
                  {t('learning.locations.items.2.title')}
                </h4>
                <p className="text-gray-700 mb-2">
                  {t('learning.locations.items.2.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>{t('learning.locations.items.2.gems.1')}</Badge>
                  <Badge>{t('learning.locations.items.2.gems.2')}</Badge>
                  <Badge>{t('learning.locations.items.2.gems.3')}</Badge>
                </div>
              </div>

              <div className="border-r-4 border-green-600 pr-4">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <MapPin className="size-5" />
                  {t('learning.locations.items.3.title')}
                </h4>
                <p className="text-gray-700 mb-2">
                  {t('learning.locations.items.3.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge>{t('learning.locations.items.3.gems.1')}</Badge>
                  <Badge>{t('learning.locations.items.3.gems.2')}</Badge>
                  <Badge>{t('learning.locations.items.3.gems.3')}</Badge>
                </div>
              </div>

              <div className="border-r-4 border-purple-600 pr-4">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <MapPin className="size-5" />
                  {t('learning.locations.items.4.title')}
                </h4>
                <p className="text-gray-700 mb-2">
                  {t('learning.locations.items.4.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{t('learning.locations.items.4.gems.1')}</Badge>
                  <Badge variant="secondary">{t('learning.locations.items.4.gems.2')}</Badge>
                  <Badge variant="secondary">{t('learning.locations.items.4.gems.3')}</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-900 flex items-start gap-2">
                <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{t('learning.locations.warning.title')}</strong>: {t('learning.locations.warning.description')}
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
              {t('learning.tips.title')}
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
                    <h5 className="font-bold mb-1">{t('learning.tips.items.1.title')}</h5>
                    <p className="text-sm text-gray-600">{t('learning.tips.items.1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{t('learning.tips.items.2.title')}</h5>
                    <p className="text-sm text-gray-600">{t('learning.tips.items.2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{t('learning.tips.items.3.title')}</h5>
                    <p className="text-sm text-gray-600">{t('learning.tips.items.3.description')}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{t('learning.tips.items.4.title')}</h5>
                    <p className="text-sm text-gray-600">{t('learning.tips.items.4.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{t('learning.tips.items.5.title')}</h5>
                    <p className="text-sm text-gray-600">{t('learning.tips.items.5.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <CheckCircle className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1">{t('learning.tips.items.6.title')}</h5>
                    <p className="text-sm text-gray-600">{t('learning.tips.items.6.description')}</p>
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
              {t('learning.resources.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h5 className="font-bold mb-2">📚 {t('learning.resources.sections.books.title')}</h5>
                <ul className="text-sm text-gray-700 space-y-1 mr-4">
                  <li>• "{t('learning.resources.sections.books.items.1.title')}" - {t('learning.resources.sections.books.items.1.description')}</li>
                  <li>• "{t('learning.resources.sections.books.items.2.title')}" - {t('learning.resources.sections.books.items.2.description')}</li>
                  <li>• "{t('learning.resources.sections.books.items.3.title')}" - {t('learning.resources.sections.books.items.3.description')}</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h5 className="font-bold mb-2">🌐 {t('learning.resources.sections.websites.title')}</h5>
                <ul className="text-sm text-gray-700 space-y-1 mr-4">
                  <li>• {t('learning.resources.sections.websites.items.1')}</li>
                  <li>• {t('learning.resources.sections.websites.items.2')}</li>
                  <li>• {t('learning.resources.sections.websites.items.3')}</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-bold mb-2">👥 {t('learning.resources.sections.communities.title')}</h5>
                <ul className="text-sm text-gray-700 space-y-1 mr-4">
                  <li>• {t('learning.resources.sections.communities.items.1')}</li>
                  <li>• {t('learning.resources.sections.communities.items.2')}</li>
                  <li>• {t('learning.resources.sections.communities.items.3')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-10 text-center text-white">
          <Pickaxe className="size-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            {t('learning.callToAction.title')}
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            {t('learning.callToAction.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg">
              {t('learning.callToAction.buttons.1')}
            </button>
            <button className="bg-emerald-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-900 transition-colors shadow-lg">
              {t('learning.callToAction.buttons.2')}
            </button>
          </div>
        </div>

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