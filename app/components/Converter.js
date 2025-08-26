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
  Currency: { DKK: 1, USD: 6.95, EUR: 7.46, GBP: 8.78, JPY: 0.044, SEK: 0.66, NOK: 0.66, CAD: 5.08, AUD: 4.63 }, // Placeholder: Needs real-time API for accurate conversion
};

export default function Converter() {
  const [category, setCategory] = useState('Length');
  const [fromUnit, setFromUnit] = useState('Meter');
  const [toUnit, setToUnit] = useState('Foot');
  const [inputValue, setInputValue] = useState('1');
  const [outputValue, setOutputValue] = useState('');

  const units = useMemo(() => Object.keys(conversionFactors[category]), [category]);

  useEffect(() => {
    // Ensure fromUnit and toUnit are valid for the selected category
    if (!units.includes(fromUnit)) setFromUnit(units[0]);
    if (!units.includes(toUnit)) setToUnit(units[1] || units[0]);
  }, [category, units, fromUnit, toUnit]);


  useEffect(() => {
    if (inputValue === '' || isNaN(parseFloat(inputValue))) {
      setOutputValue(''); return;
    }
    const value = parseFloat(inputValue);
    let result;

    if (category === 'Temperature') {
      if (!conversionFactors.Temperature[fromUnit] || !conversionFactors.Temperature[to
