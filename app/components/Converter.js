'use client';
import { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const conversionFactors = {
  Length: { Meter: 1, Kilometer: 1000, Centimeter: 0.01, Mile: 1609.34, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254 },
  Mass: { Kilogram: 1, Gram: 0.001, Pound: 0.453592, Ounce: 0.0283495 },
  Temperature: {
    Celsius: { toBase: c => c + 273.15, fromBase: k => k - 273.15 },
    Fahrenheit: { toBase: f => (f - 32) * 5/9 + 273.15, fromBase: k => (k - 273.15) * 9/5 + 32 },
    Kelvin: { toBase: k => k, fromBase: k => k },
  }
};

export default function Converter() {
  const [category, setCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState('Meter');
  const [toUnit, setToUnit] = useState('Foot');
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('');

  const units = useMemo(() => Object.keys(conversionFactors[category]), [category]);

  useEffect(() => {
    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
      setOutputValue(''); return;
    }
    const value = parseFloat(inputValue);
    let result;

    if (category === 'Temperature') {
      const toBase = conversionFactors.Temperature[fromUnit].toBase;
      const fromBase = conversionFactors.Temperature[toUnit].fromBase;
      result = fromBase(toBase(value));
    } else {
      const fromFactor = conversionFactors[category][fromUnit];
      const toFactor = conversionFactors[category][toUnit];
      result = (value * fromFactor) / toFactor;
    }
    
    setOutputValue(result.toLocaleString(undefined, { maximumFractionDigits: 5 }));
  }, [inputValue, fromUnit, toUnit, category]);

  const handleSwap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };
  
  useEffect(() => { setFromUnit(units[0]); setToUnit(units[1] || units[0]); }, [category, units]);

  return (
    <div className="p-6 bg-[var(--card)] rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <label className="text-sm font-medium text-[var(--secondary)]">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
          {Object.keys(conversionFactors).map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full">
          <label className="text-sm font-medium text-[var(--secondary)]">From</label>
          <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full p-3 mt-1 text-2xl font-semibold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-2 mt-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>
        </div>
        <button onClick={handleSwap} className="p-3 mt-4 md:mt-8 rounded-full bg-[var(--primary)] text-white hover:bg-opacity-90 transition-transform duration-300 active:scale-90"><ArrowRightLeft size={24} /></button>
        <div className="w-full">
          <label className="text-sm font-medium text-[var(--secondary)]">To</label>
          <input type="text" value={outputValue} readOnly className="w-full p-3 mt-1 text-2xl font-semibold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" />
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-2 mt-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
