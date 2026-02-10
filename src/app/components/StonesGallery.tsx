import { useState, useMemo } from 'react';
import { stonesData, Stone } from '@/app/data/stones-data';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/components/ui/dialog';

export function StonesGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedValue, setSelectedValue] = useState<string>('all');
  const [selectedStone, setSelectedStone] = useState<Stone | null>(null);

  const filteredStones = useMemo(() => {
    return stonesData.filter(stone => {
      const matchesSearch = 
        stone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stone.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stone.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRarity = selectedRarity === 'all' || stone.rarity === selectedRarity;
      const matchesValue = selectedValue === 'all' || stone.value === selectedValue;

      return matchesSearch && matchesRarity && matchesValue;
    });
  }, [searchTerm, selectedRarity, selectedValue]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRarity('all');
    setSelectedValue('all');
  };

  const getRarityColor = (rarity: Stone['rarity']) => {
    switch (rarity) {
      case 'شائع':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'متوسط':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'نادر':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  const getValueColor = (value: Stone['value']) => {
    switch (value) {
      case 'منخفض':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'متوسط':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'مرتفع':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'مرتفع جداً':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">موسوعة الأحجار الكريمة</h1>
          <p className="text-lg md:text-xl opacity-90">
            اكتشف 50 نوعاً من الأحجار الكريمة الشائعة في منطقة الخليج
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="ابحث عن حجر كريم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-right"
              />
            </div>

            {/* Rarity Filter */}
            <Select value={selectedRarity} onValueChange={setSelectedRarity}>
              <SelectTrigger className="text-right">
                <SelectValue placeholder="الندرة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأنواع</SelectItem>
                <SelectItem value="شائع">شائع</SelectItem>
                <SelectItem value="متوسط">متوسط</SelectItem>
                <SelectItem value="نادر">نادر</SelectItem>
              </SelectContent>
            </Select>

            {/* Value Filter */}
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger className="text-right">
                <SelectValue placeholder="القيمة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل القيم</SelectItem>
                <SelectItem value="منخفض">منخفض</SelectItem>
                <SelectItem value="متوسط">متوسط</SelectItem>
                <SelectItem value="مرتفع">مرتفع</SelectItem>
                <SelectItem value="مرتفع جداً">مرتفع جداً</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          {(searchTerm || selectedRarity !== 'all' || selectedValue !== 'all') && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="gap-2"
              >
                <X size={16} />
                إعادة تعيين الفلاتر
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            عرض <span className="font-bold text-blue-600">{filteredStones.length}</span> من {stonesData.length} حجر كريم
          </p>
        </div>

        {/* Stones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStones.map((stone) => (
            <div
              key={stone.id}
              onClick={() => setSelectedStone(stone)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 duration-200"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={stone.image}
                  alt={stone.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className={getRarityColor(stone.rarity)}>
                    {stone.rarity}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 text-right">
                  {stone.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-right">
                  {stone.scientificName}
                </p>
                
                <div className="flex justify-between items-center mb-3">
                  <Badge className={getValueColor(stone.value)}>
                    {stone.value}
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {stone.color}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 text-right">
                  {stone.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredStones.length === 0 && (
          <div className="text-center py-16">
            <Filter className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              جرب تغيير معايير البحث أو الفلاتر
            </p>
            <Button onClick={resetFilters}>إعادة تعيين الفلاتر</Button>
          </div>
        )}
      </div>

      {/* Stone Details Dialog */}
      <Dialog open={!!selectedStone} onOpenChange={() => setSelectedStone(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto text-right">
          {selectedStone && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-right">{selectedStone.name}</DialogTitle>
                <DialogDescription className="text-right text-lg">
                  {selectedStone.scientificName}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedStone.image}
                    alt={selectedStone.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Badges */}
                <div className="flex gap-2 flex-wrap justify-end">
                  <Badge className={getRarityColor(selectedStone.rarity)}>
                    الندرة: {selectedStone.rarity}
                  </Badge>
                  <Badge className={getValueColor(selectedStone.value)}>
                    القيمة: {selectedStone.value}
                  </Badge>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xl font-bold mb-2 text-right">الوصف</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-right">
                    {selectedStone.description}
                  </p>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-right">اللون</h5>
                    <p className="text-gray-700 dark:text-gray-300 text-right">
                      {selectedStone.color}
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-right">الصلابة</h5>
                    <p className="text-gray-700 dark:text-gray-300 text-right">
                      {selectedStone.hardness}
                    </p>
                  </div>
                </div>

                {/* Origin */}
                <div>
                  <h4 className="text-xl font-bold mb-2 text-right">أماكن التواجد</h4>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {selectedStone.origin.map((place, index) => (
                      <Badge key={index} variant="outline">
                        {place}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Uses */}
                <div>
                  <h4 className="text-xl font-bold mb-2 text-right">الاستخدامات</h4>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {selectedStone.uses.map((use, index) => (
                      <Badge key={index} variant="secondary">
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
