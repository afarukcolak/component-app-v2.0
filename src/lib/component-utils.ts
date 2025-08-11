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

export function parseComponentValue(valueStr: string): { numericValue: number; formattedValue: string; unit: string } | null {
  if (!valueStr) return null;

  const valueClean = valueStr.toLowerCase().replace(/\s/g, '');
  const multiplierMatch = valueClean.match(/([kmgtµunpf])/)
  const multiplier = multiplierMatch ? multiplierMatch[1] : '';
  const numPart = parseFloat(valueClean.replace(multiplier, ''));

  if (isNaN(numPart)) return null;

  let factor = 1;
  let unit = '';

  switch (multiplier) {
    case 'k': factor = 1e3; unit = 'kΩ'; break;
    case 'm':
      // Distinguish Mega from mili
      if (valueStr.toUpperCase().includes('M')) {
         factor = 1e6; unit = 'MΩ';
      } else {
         factor = 1e-3; unit = 'mF'
      }
      break;
    case 'g': factor = 1e9; unit = 'GΩ'; break;
    case 't': factor = 1e12; unit = 'TΩ'; break;
    case 'p': factor = 1e-12; unit = 'pF'; break;
    case 'n': factor = 1e-9; unit = 'nF'; break;
    case 'µ':
    case 'u': factor = 1e-6; unit = 'µF'; break;
    case 'f': factor = 1; unit = 'F'; break;
    default: unit = 'Ω'; // Default to Ohms if no unit is found
  }

  // Determine if it's a capacitor or resistor based on typical units
  if (['F', 'f', 'p', 'n', 'u', 'µ'].some(u => valueStr.includes(u))) {
      unit = unit || 'F';
      if (unit.endsWith('Ω')) unit = 'F';
  } else {
      unit = unit || 'Ω';
       if (unit.endsWith('F')) unit = 'Ω';
  }

  const numericValue = numPart * factor;

  // Auto-format capacitor values for display
  if (unit.includes('F')) {
      let displayValue = numPart;
      let displayUnit = unit;
      if (numericValue >= 1) { displayValue = numericValue; displayUnit = 'F'}
      else if (numericValue >= 1e-3) { displayValue = numericValue / 1e-3; displayUnit = 'mF'}
      else if (numericValue >= 1e-6) { displayValue = numericValue / 1e-6; displayUnit = 'µF'}
      else if (numericValue >= 1e-9) { displayValue = numericValue / 1e-9; displayUnit = 'nF'}
      else if (numericValue >= 1e-12) { displayValue = numericValue / 1e-12; displayUnit = 'pF'}
      return { numericValue, formattedValue: `${displayValue}${displayUnit}`, unit: displayUnit };
  }
  
  const formattedValue = `${numPart}${unit}`.replace('Ω', 'Ω');
  
  return { numericValue, formattedValue, unit };
}


export function getResistorBands(value: string) {
  const parsed = parseComponentValue(value);
  // Ensure it's a resistor value, not a capacitor
  if (!parsed || parsed.unit.includes('F') || parsed.numericValue <= 0) {
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

export function getCapacitorCode(value: string): string | null {
  const parsed = parseComponentValue(value);
  if (!parsed || !parsed.unit.includes('F') || parsed.numericValue <= 0) {
    return null;
  }
  
  const valueInPf = parsed.numericValue * 1e12;

  if (valueInPf < 1.0) return null; // Codes are generally for 1pF and above

  if (valueInPf < 100) {
    if (Number.isInteger(valueInPf)) {
      if (valueInPf < 10) {
        return `0${valueInPf}`;
      }
      const strVal = valueInPf.toString();
      const firstTwoDigits = strVal.substring(0, 2);
       // For values like 22pF, it should be 22 * 10^0 -> 220
      return `${firstTwoDigits}0`;
    } else {
        // For values like 4.7pF -> 4R7
        return valueInPf.toString().replace('.', 'R');
    }
  }

  const strValue = Math.round(valueInPf).toString();
  const firstTwoDigits = strValue.substring(0, 2);
  const numberOfZeros = strValue.substring(2).length;

  return `${firstTwoDigits}${numberOfZeros}`;
}
