const colorCode = [
  'black', 'brown', 'red', 'orange', 'yellow', 
  'green', 'blue', 'violet', 'gray', 'white'
];
const toleranceCode: { [key: number]: string } = {
  1: 'brown', 2: 'red', 0.5: 'green', 0.25: 'blue', 0.1: 'violet', 5: 'gold', 10: 'silver'
};
const multiplierCode: { [key: number]: string } = {
  ...colorCode,
  [-1]: 'gold',
  [-2]: 'silver'
};

export function parseComponentValue(valueStr: string): { numericValue: number; formattedValue: string } | null {
  if (!valueStr) return null;

  const valueClean = valueStr.toLowerCase().replace(/\s/g, '');
  const multiplierMatch = valueClean.match(/([kMmegapnuf])/)
  const multiplier = multiplierMatch ? multiplierMatch[1] : '';
  const numPart = parseFloat(valueClean.replace(multiplier, ''));

  if (isNaN(numPart)) return null;

  let factor = 1;
  let unit = '';

  switch (multiplier) {
    case 'k': factor = 1e3; unit = 'kΩ'; break;
    case 'm':
      // Distinguish Mega from mili
      if (valueStr.includes('M')) {
         factor = 1e6; unit = 'MΩ';
      } else {
         factor = 1e-3; unit = 'mΩ'
      }
      break;
    case 'g': factor = 1e9; unit = 'GΩ'; break;
    case 'p': factor = 1e-12; unit = 'pF'; break;
    case 'n': factor = 1e-9; unit = 'nF'; break;
    case 'u': factor = 1e-6; unit = 'µF'; break;
    case 'f': factor = 1; unit = 'F'; break;
    default: unit = 'Ω';
  }
  
  const numericValue = numPart * factor;
  
  if (unit.includes('F')) {
      if (numericValue >= 1) return { numericValue, formattedValue: `${numPart}${unit}`};
      if (numericValue >= 1e-6) return { numericValue, formattedValue: `${numPart*1e6}µF`};
      if (numericValue >= 1e-9) return { numericValue, formattedValue: `${numPart*1e9}nF`};
      if (numericValue >= 1e-12) return { numericValue, formattedValue: `${numPart*1e12}pF`};
  }
  
  const formattedValue = `${numPart}${unit}`.replace('Ω', 'Ω');
  
  return { numericValue, formattedValue };
}


export function getResistorBands(value: string) {
  const parsed = parseComponentValue(value);
  if (!parsed || parsed.numericValue <= 0) {
    return { band1: 'none', band2: 'none', multiplier: 'none', tolerance: 'none' };
  }

  const { numericValue } = parsed;
  let sigFigs = numericValue.toExponential(1); // e.g., 5.6e+3 for 5600
  let [mantissa, exponentStr] = sigFigs.split('e');
  
  const d1 = parseInt(mantissa[0]);
  const d2 = parseInt(mantissa[2] || '0');
  
  let exponent = parseInt(exponentStr);
  
  // Adjust exponent for the second significant figure
  exponent = exponent - 1;

  return {
    band1: colorCode[d1] || 'none',
    band2: colorCode[d2] || 'none',
    multiplier: multiplierCode[exponent] || 'none',
    tolerance: 'gold', // Default tolerance
  };
}
