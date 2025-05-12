import React, { useState, useRef, useEffect } from 'react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
  className?: string;
  id: string;
}

export const DateRangePicker = ({
  startDate,
  endDate,
  onDateChange,
  className = '',
  id = '',
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [openDirection, setOpenDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (!isOpen) {
      setIsSelecting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const popupWidth = 258;

      // Si le popup déborderait à droite, on l'ouvre vers la gauche
      if (rect.left + popupWidth > windowWidth) {
        setOpenDirection('left');
      } else {
        setOpenDirection('right');
      }
    }
  }, [isOpen]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // 0 (dimanche) => 1 (lundi) pour commencer la semaine sur lundi
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(undefined);
      setIsSelecting(true);
    } else {
      if (clickedDate < selectedStartDate) {
        setSelectedStartDate(clickedDate);
        setSelectedEndDate(undefined);
        setIsSelecting(true);
      } else {
        setSelectedEndDate(clickedDate);
        onDateChange(formatDate(selectedStartDate), formatDate(clickedDate));
        setIsSelecting(false);
        setIsOpen(false);
      }
    }
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedStartDate(undefined);
    setSelectedEndDate(undefined);
    setIsSelecting(false);
    onDateChange('', '');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToday = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const today = new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    );
    setSelectedStartDate(today);
    setSelectedEndDate(today);
    onDateChange(formatDate(today), formatDate(today));
    setIsOpen(false);
  };

  const isDateInRange = (day: number) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    const date = new Date(Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const isDateSelected = (day: number) => {
    const date = new Date(Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    return (
      (selectedStartDate && formatDate(date) === formatDate(selectedStartDate)) ||
      (selectedEndDate && formatDate(date) === formatDate(selectedEndDate))
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Jours du mois précédent pour aligner le 1er jour
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 text-gray-300 select-none">
          {' '}
        </div>
      );
    }

    // Jours du mois courant
    for (let day = 1; day <= daysInMonth; day++) {
      const isInRange = isDateInRange(day);
      const isSelected = isDateSelected(day);
      const isDisabled = false;
      days.push(
        <div
          key={day}
          onClick={() => !isDisabled && handleDateClick(day)}
          className={`h-8 w-8 flex items-center justify-center text-sm rounded cursor-pointer
            ${isSelected ? 'bg-blue-600 text-white' : isInRange ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}
          `}
        >
          {day}
        </div>
      );
    }

    // Jours du mois suivant pour compléter la grille (optionnel)
    const totalCells = firstDay + daysInMonth;
    const nextMonthDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 0; i < nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="h-8 text-gray-300 select-none">
          {' '}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className={`relative ${className}`}
      ref={ref}
      id={id}
    >
      <div
        className="w-full px-1 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white peer cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          {startDate && endDate ? (
            <span className="text-gray-700">
              {`${new Date(startDate).getDate()}-${new Date(endDate).getDate()}/${(new Date(startDate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(startDate).getFullYear().toString().slice(-2)}`}
            </span>
          ) : (
            <span className="text-gray-500">jj-jj/mm/aa</span>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 p-4 min-w-[258px] ${openDirection === 'left' ? 'right-0' : 'left-0'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="w-8">
              {!isSelecting && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                    );
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                >
                  ←
                </button>
              )}
            </div>
            <span className="font-medium">
              {currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
            </span>
            <div className="w-8">
              {!isSelecting && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setCurrentMonth(
                      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                    );
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                >
                  →
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
              <div
                key={day + index}
                className="text-center text-xs text-gray-500 font-medium select-none"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5 mb-2 select-none">{renderCalendar()}</div>
          <div className="flex justify-between mt-2">
            <button
              onClick={handleClear}
              className="text-blue-600 text-sm hover:underline px-2"
              type="button"
            >
              Effacer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
