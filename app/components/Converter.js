'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const conversionFactors = {
  Length: { Meter: 1, Kilometer: 1000, Centimeter: 0.01, Millimeter: 0.001, Micrometer: 0.000001, Nanometer: 1e-9, Mile: 1609.34, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254, NauticalMile: 1852 },
  Mass: { Kilogram: 1, Gram: 0.001, Milligram: 1e-6, MetricTon: 1000, Pound: 0.453592, Ounce: 0.0283495, Stone: 6.35029 },
  Temperature: {
    Celsius: { toBase: c => c + 273.15, fromBase: k => k - 273.15 },
    Fahrenheit: { toBase: f => (f - 32) * 5/9 + 273.15, fromBase: k => (k - 273.15) * 9/5 + 32 },
    Kelvin: { toBase: k => k, fromBase: k => k },
  },
  Volume: { Liter: 1, Milliliter: 0.001, CubicMeter: 1000, CubicFoot: 28.3168, Gallon_US: 3.78541, Gallon_UK: 4.54609, Quart_US: 0.946353, Pint_US: 0.473176 },
  Area: { 'Square Meter': 1, 'Square Kilometer': 1000000, 'Square Centimeter': 0.0001, Acre: 4046.86, Hectare: 10000, 'Square Mile': 2589988 },
  Time: { Second: 1, Millisecond: 0.001, Microsecond: 1e-6, Minute: 60, Hour: 3600, Day: 86400, Week: 604800, Month: 2629746, Year: 31556952 },
  Speed: { 'Meter/second': 1, 'Kilometer/hour': 0.277778, 'Mile/hour': 0.44704, Knot: 0.514444, Foot_per_second: 0.3048 },
  Pressure: { Pascal: 1, Kilopascal: 1000, Bar: 100000, PSI: 6894.76, Atmosphere: 101325, Torr: 133.322 },
  Energy: { Joule: 1, Kilojoule: 1000, Calorie: 4.184, 'Kilocalorie': 4184, 'Kilowatt-hour': 3600000, Electronvolt: 1.60218e-19 },
  DigitalStorage: { Bit: 0.125, Byte: 1, Kilobyte: 1024, Megabyte: 1048576, Gigabyte: 1073741824, Terabyte: 1099511627776 },
  Frequency: { Hertz: 1, Kilohertz: 1000, Megahertz: 1000000, Gigahertz: 1000000000 },
  Angle: { Degree: 1, Radian: 57.2958, Gradian: 0.9 },
  Power: { Watt: 1, Kilowatt: 1000, Horsepower: 745.7, FootPound_per_minute: 0.022597 },
  Currency: { DKK: 1, USD: 6.95, EUR: 7.46, GBP: 8.78, JPY: 0.044, SEK: 0.66, NOK: 0.66, CAD: 5.08, AUD: 4.63 },
};

export default function Converter() {
  const [category, setCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState('Meter');
  const [toUnit, setToUnit] = useState('Foot');
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('');

  const units = useMemo(() => Object.keys(conversionFactors[category]), [category]);
  
  // This is the new, crucial useEffect hook.
  // It resets the units whenever the category changes.
  useEffect(() => {
    const defaultUnits = Object.keys(conversionFactors[category]);
    setFromUnit(defaultUnits[0]);
    setToUnit(defaultUnits[1] || defaultUnits[0]);
  }, [category]);
  
  useEffect(() => {
    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
      setOutputValue(''); return;
    }
    const value = parseFloat(inputValue);
    let result;

    if (category === 'Temperature') {
      // Add a check to ensure the units are valid before converting
      if (!conversionFactors.Temperature[fromUnit] || !conversionFactors.Temperature[toUnit]) {
        setOutputValue('N/A');
        return;
      }
      const toBase = conversionFactors.Temperature[fromUnit].toBase;
      const fromBase = conversionFactors.Temperature[toUnit].fromBase;
      result = fromBase(toBase(value));
    } else {
      if (!conversionFactors[category][fromUnit] || !conversionFactors[category][toUnit]) {
        setOutputValue('N/A');
        return;
      }
      const fromFactor = conversionFactors[category][fromUnit];
      const toFactor = conversionFactors[category][toUnit];
      result = (value * fromFactor) / toFactor;
    }
    
    setOutputValue(result.toLocaleString(undefined, { maximumFractionDigits: 5 }));
  }, [inputValue, fromUnit, toUnit, category]);

  const handleSwap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };
  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="p-6 md:p-8 bg-[var(--card)] rounded-xl shadow-2xl w-full max-w-2xl mx-auto border border-[var(--secondary)]/[0.2] dark:border-[var(--secondary)]/[0.1] backdrop-blur-md"
    >
      <div className="mb-6">
        <label className="text-sm font-medium text-[var(--secondary)] block mb-2">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 rounded-lg bg-[var(--input-bg)] border border-[var(--secondary)]/[0.3] dark:border-[var(--secondary)]/[0.4] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-200 shadow-sm appearance-none cursor-pointer">
          {Object.keys(conversionFactors).map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full">
          <label className="text-sm font-medium text-[var(--secondary)] block mb-2">From</label>
          <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full p-3 text-2xl font-bold bg-[var(--input-bg)] border border-[var(--secondary)]/[0.3] dark:border-[var(--secondary)]/[0.4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-200 shadow-sm" />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-3 mt-3 rounded-lg bg-[var(--input-bg)] border border-[var(--secondary)]/[0.3] dark:border-[var(--secondary)]/[0.4] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-200 shadow-sm appearance-none cursor-pointer">
            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9, rotate: -90 }}
          onClick={handleSwap}
          className="p-3 mt-4 md:mt-8 rounded-full bg-[var(--primary)] text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--accent)] transition-all duration-300 ease-out"
          aria-label="Swap units"
        >
          <ArrowRightLeft size={24} />
        </motion.button>
        <div className="w-full">
          <label className="text-sm font-medium text-[var(--secondary)] block mb-2">To</label>
          <input type="text" value={outputValue} readOnly className="w-full p-3 text-2xl font-bold bg-[var(--input-bg)] border border-[var(--secondary)]/[0.3] dark:border-[var(--secondary)]/[0.4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-200 shadow-sm cursor-not-allowed" />
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-3 mt-3 rounded-lg bg-[var(--input-bg)] border border-[var(--secondary)]/[0.3] dark:border-[var(--secondary)]/[0.4] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-200 shadow-sm appearance-none cursor-pointer">
            {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
          </select>
        </div>
      </div>
    </motion.div>
  );
}
