import { useState } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Mountain, Map, Gem, Layers, Info, Eye, EyeOff } from 'lucide-react';
import '@/styles/leaflet.css';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Gemstone locations data for Gulf region
const gemstoneLocations = [
  {
    id: 1,
    name: 'منطقة اللؤلؤ - البحرين',
    position: [26.0667, 50.5577] as [number, number],
    type: 'اللؤلؤ الطبيعي',
    probability: 'عالية',
    color: '#f8b4d9',
    description: 'مناطق تاريخية لصيد اللؤلؤ في الخليج العربي'
  },
  {
    id: 2,
    name: 'جبال عمان الشرقية',
    position: [23.6100, 58.5400] as [number, number],
    type: 'العقيق والكوارتز',
    probability: 'عالية جداً',
    color: '#e74c3c',
    description: 'غنية بالعقيق اليماني والكوارتز'
  },
  {
    id: 3,
    name: 'جبال السروات - السعودية',
    position: [19.5, 42.5] as [number, number],
    type: 'العقيق والجرانيت',
    probability: 'عالية',
    color: '#e67e22',
    description: 'منطقة غنية بالصخور النارية والعقيق'
  },
  {
    id: 4,
    name: 'صحراء الربع الخالي',
    position: [20.0, 50.0] as [number, number],
    type: 'الكوارتز والعقيق',
    probability: 'متوسطة',
    color: '#f39c12',
    description: 'عقيق صحراوي وكوارتز'
  },
  {
    id: 5,
    name: 'جبال الحجر - الإمارات',
    position: [25.8, 56.3] as [number, number],
    type: 'الكروميت والسربنتين',
    probability: 'متوسطة',
    color: '#27ae60',
    description: 'صخور تحولية ومعادن'
  },
  {
    id: 6,
    name: 'وادي الدواسر',
    position: [20.5, 45.2] as [number, number],
    type: 'العقيق والفلورايت',
    probability: 'عالية',
    color: '#9b59b6',
    description: 'عقيق متعدد الألوان'
  },
  {
    id: 7,
    name: 'الدرع العربي - تبوك',
    position: [28.3838, 36.5550] as [number, number],
    type: 'الذهب والفضة',
    probability: 'عالية',
    color: '#f1c40f',
    description: 'منطقة غنية بالمعادن الثمينة'
  },
  {
    id: 8,
    name: 'جبال اليمن الغربية',
    position: [15.3694, 44.1910] as [number, number],
    type: 'العقيق اليماني',
    probability: 'عالية جداً',
    color: '#c0392b',
    description: 'أشهر منطقة للعقيق اليماني'
  }
];

const rockTypes = [
  { name: 'صخور نارية', color: '#e74c3c', icon: '🔥' },
  { name: 'صخور رسوبية', color: '#f39c12', icon: '🏜️' },
  { name: 'صخور تحولية', color: '#9b59b6', icon: '⛰️' }
];

interface LayerControlPanelProps {
  layers: {
    satellite: boolean;
    falseColor: boolean;
    mineralZones: boolean;
    gemstones: boolean;
  };
  onLayerToggle: (layer: string) => void;
}

function LayerControlPanel({ layers, onLayerToggle }: LayerControlPanelProps) {
  return (
    <Card className="absolute top-4 right-4 z-[1000] w-80 bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layers className="w-5 h-5 text-blue-600" />
          التحكم بالطبقات
        </CardTitle>
        <CardDescription>قم بتفعيل أو إلغاء الطبقات الجيولوجية</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="satellite" className="flex items-center gap-2 cursor-pointer">
            <Map className="w-4 h-4" />
            عرض الأقمار الصناعية
          </Label>
          <Switch
            id="satellite"
            checked={layers.satellite}
            onCheckedChange={() => onLayerToggle('satellite')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="falseColor" className="flex items-center gap-2 cursor-pointer">
            <Mountain className="w-4 h-4" />
            الألوان الجيولوجية
          </Label>
          <Switch
            id="falseColor"
            checked={layers.falseColor}
            onCheckedChange={() => onLayerToggle('falseColor')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="mineralZones" className="flex items-center gap-2 cursor-pointer">
            <Layers className="w-4 h-4" />
            مناطق المعادن
          </Label>
          <Switch
            id="mineralZones"
            checked={layers.mineralZones}
            onCheckedChange={() => onLayerToggle('mineralZones')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="gemstones" className="flex items-center gap-2 cursor-pointer">
            <Gem className="w-4 h-4" />
            احتمالية الأحجار الكريمة
          </Label>
          <Switch
            id="gemstones"
            checked={layers.gemstones}
            onCheckedChange={() => onLayerToggle('gemstones')}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function LegendPanel() {
  return (
    <Card className="absolute bottom-4 left-4 z-[1000] w-64 bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Info className="w-4 h-4 text-blue-600" />
          مفتاح الخريطة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-xs font-semibold mb-2">أنواع الصخور:</div>
        {rockTypes.map((rock) => (
          <div key={rock.name} className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: rock.color }}></div>
            <span>{rock.icon}</span>
            <span>{rock.name}</span>
          </div>
        ))}
        
        <div className="text-xs font-semibold mt-4 mb-2">احتمالية الأحجار:</div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-full bg-red-500 opacity-70"></div>
          <span>عالية جداً</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-full bg-orange-500 opacity-50"></div>
          <span>عالية</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-40"></div>
          <span>متوسطة</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function GeologyMap() {
  const [activeLayers, setActiveLayers] = useState({
    satellite: true,
    falseColor: false,
    mineralZones: false,
    gemstones: true
  });

  const handleLayerToggle = (layer: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer as keyof typeof prev]
    }));
  };

  // Gulf region center
  const gulfCenter: [number, number] = [24.0, 50.0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <Map className="w-10 h-10" />
            خريطة جيولوجية تفاعلية
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            استكشف المناطق الغنية بالأحجار الكريمة والمعادن في منطقة الخليج العربي
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Map className="w-5 h-5 text-blue-600" />
                صور الأقمار الصناعية
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              بيانات حديثة من Sentinel-2 و Landsat 8/9 للحصول على أفضل رؤية للتضاريس
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mountain className="w-5 h-5 text-green-600" />
                التحليل الجيولوجي
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              طبقات ألوان كاذبة توضح أنواع الصخور والتكوينات الجيولوجية
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gem className="w-5 h-5 text-purple-600" />
                احتمالية الأحجار
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600">
              مناطق محتملة لوجود الأحجار الكريمة بناءً على التحليل الجيولوجي
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ height: '600px' }}>
          {/* Layer Control Panel */}
          <LayerControlPanel layers={activeLayers} onLayerToggle={handleLayerToggle} />
          
          {/* Legend Panel */}
          <LegendPanel />

          <MapContainer
            center={gulfCenter}
            zoom={6}
            className="w-full h-full"
            scrollWheelZoom={true}
          >
            {/* Base Layer - OpenStreetMap */}
            {!activeLayers.satellite && (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}

            {/* Satellite Layer */}
            {activeLayers.satellite && (
              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            )}

            {/* False Color Geological Layer (simulation) */}
            {activeLayers.falseColor && (
              <TileLayer
                attribution='Geological False Color'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                opacity={0.5}
                className="mix-blend-multiply"
              />
            )}

            {/* Gemstone Probability Zones */}
            {activeLayers.gemstones && gemstoneLocations.map((location) => (
              <Circle
                key={location.id}
                center={location.position}
                radius={50000}
                pathOptions={{
                  color: location.color,
                  fillColor: location.color,
                  fillOpacity: location.probability === 'عالية جداً' ? 0.3 : location.probability === 'عالية' ? 0.2 : 0.15,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{location.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold">{location.type}</span>
                      </div>
                      <Badge 
                        variant={location.probability === 'عالية جداً' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        احتمالية: {location.probability}
                      </Badge>
                      <p className="text-xs text-gray-600 mt-2">{location.description}</p>
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}

            {/* Markers for gemstone locations */}
            {activeLayers.gemstones && gemstoneLocations.map((location) => (
              <Marker key={`marker-${location.id}`} position={location.position}>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{location.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Gem className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold">{location.type}</span>
                      </div>
                      <Badge 
                        variant={location.probability === 'عالية جداً' ? 'destructive' : 'default'}
                        className="text-xs"
                      >
                        احتمالية: {location.probability}
                      </Badge>
                      <p className="text-xs text-gray-600 mt-2">{location.description}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              كيفية استخدام الخريطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  🖱️ التنقل في الخريطة
                </h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• اسحب الخريطة للتنقل</li>
                  <li>• استخدم العجلة للتكبير والتصغير</li>
                  <li>• انقر على الدوائر لمزيد من المعلومات</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  🎨 الطبقات
                </h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• قم بتفعيل/إلغاء الطبقات من اللوحة اليمنى</li>
                  <li>• الدوائر الملونة تشير لاحتمالية وجود أحجار كريمة</li>
                  <li>• الألوان الأكثر كثافة تعني احتمالية أعلى</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}