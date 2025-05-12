import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { FormData } from '@/types/form';
import mptData from '@/data/mpt.json';

interface HouseSelectionStepProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

export default function HouseSelectionStep({ formData, setFormData }: HouseSelectionStepProps) {
  const [searchValue, setSearchValue] = useState(formData.maison);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const sortedMPTData = useMemo(() => {
    return [...mptData].sort((a, b) =>
      a.name.replace('Maison pour tous', '').localeCompare(b.name.replace('Maison pour tous', ''))
    );
  }, []);

  const normalizeText = (text: string): string => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const handleHouseSelect = (codeMPT: string) => {
    const selectedMPT = sortedMPTData.find(mpt => mpt.codeMPT === codeMPT);
    setFormData(prev => ({
      ...prev,
      selectedHouse: codeMPT,
      maison: selectedMPT ? selectedMPT.name : '',
    }));
    setShowSuggestions(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSuggestions(true);

    if (!value.trim()) {
      handleHouseSelect('');
      return;
    }

    const matchingMPT = sortedMPTData.find(mpt => {
      const mptName = normalizeText(mpt.name.replace('Maison pour tous', ''));
      const searchTerms = normalizeText(value)
        .split(' ')
        .filter(term => term.length > 5);
      if (searchTerms.length === 0) return false;

      return searchTerms.every(term => {
        const words = mptName.split(' ');
        return words.some(word => word.startsWith(term));
      });
    });

    if (matchingMPT) {
      handleHouseSelect(matchingMPT.codeMPT);
    }
  };

  const filteredSuggestions = useMemo(() => {
    if (!searchValue.trim()) return [];
    const normalizedSearch = normalizeText(searchValue);
    return sortedMPTData.filter(mpt => {
      const mptName = normalizeText(mpt.name.replace('Maison pour tous', ''));
      return mptName.includes(normalizedSearch);
    });
  }, [searchValue, sortedMPTData]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Choisissez votre Maison pour tous</h1>

      <div className="space-y-4">
        <div className="relative">
          <label htmlFor="mpt-search" className="block text-sm font-medium text-gray-700 mb-1">
            Rechercher une Maison pour tous
          </label>
          <input
            type="text"
            id="mpt-search"
            name="mpt-search"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            placeholder="Tapez pour rechercher..."
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredSuggestions.map((mpt) => (
                <div
                  key={mpt.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleHouseSelect(mpt.codeMPT);
                    setSearchValue(mpt.name.replace('Maison pour tous', '').trim());
                  }}
                >
                  {mpt.name.replace('Maison pour tous', '').trim()}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="mpt-select" className="block text-sm font-medium text-gray-700 mb-1">
            Ou sélectionnez une Maison pour tous
          </label>
          <select
            id="mpt-select"
            value={formData.selectedHouse}
            onChange={e => handleHouseSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Sélectionnez une Maison pour tous</option>
            {sortedMPTData.map((mpt) => (
              <option key={mpt.id} value={mpt.codeMPT}>
                {mpt.name.replace('Maison pour tous', '')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
