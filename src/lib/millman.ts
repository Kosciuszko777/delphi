/**
 * Millman Life-Purpose Number Calculator
 *
 * Method (Dan Millman's system):
 * 1. Write out the full birth date as digits: MM/DD/YYYY
 * 2. Add ALL individual digits together to get a working sum
 * 3. If the working sum has two digits, add its digits once more
 * 4. The result is written as "working sum / final number", e.g. "34/7"
 *
 * IMPORTANT — double-digit finals terminate:
 * In Millman's published system, second-stage sums of 10, 11, or 12
 * are complete birth numbers and are NOT reduced further.
 *   e.g. 11/13/1976 → 29 → 2+9 = 11 → "29/11"   (never "29/11/2")
 *        09/29/1999 → 48 → 4+8 = 12 → "48/12"   (never "48/12/3")
 *
 * This is safe by construction: the maximum possible digit sum for any
 * valid Gregorian date (e.g. 09/29/1999) is 48, whose digit sum is 12.
 * A second reduction can therefore never be required.
 *
 * If the working sum is already a single digit (possible only for
 * births in and after 2000, e.g. 01/01/2000 → 4), the number is
 * rendered without a slash: "4".
 */

/** Sum the digits of a number. */
function digitSum(n: number): number {
  return Math.abs(n)
    .toString()
    .split('')
    .reduce((acc, d) => acc + parseInt(d, 10), 0);
}

/**
 * Compute the Millman Life-Purpose number from a birth date.
 *
 * @param year  Full year (e.g. 1987)
 * @param month Month 1–12
 * @param day   Day 1–31
 * @returns The life-purpose string, e.g. "34/7", "29/11", "48/12", "4"
 */
export function computeMillmanNumber(year: number, month: number, day: number): string {
  // Sum ALL individual digits of the full date
  const dateStr = `${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${year}`;
  let workingSum = 0;
  for (const ch of dateStr) {
    workingSum += parseInt(ch, 10);
  }

  if (workingSum < 10) {
    return workingSum.toString();
  }

  // Reduce exactly once. Finals of 10, 11, 12 terminate (see header note).
  const finalNumber = digitSum(workingSum);
  return `${workingSum}/${finalNumber}`;
}

/**
 * Get the final purpose number from a Millman number string.
 * May be 1–9 or a terminating double-digit final (10, 11, 12).
 * e.g. "34/7" → 7, "29/11" → 11, "4" → 4
 */
export function getFinalDigit(millmanNumber: string): number {
  const parts = millmanNumber.split('/');
  return parseInt(parts[parts.length - 1], 10);
}

/**
 * Get the working sum (first number) from a Millman number string.
 * e.g. "34/7" → 34, "4" → 4
 */
export function getWorkingSum(millmanNumber: string): number {
  return parseInt(millmanNumber.split('/')[0], 10);
}

/**
 * Decompose a final purpose number into its component digit energies.
 * Double-digit finals carry composite energies in Millman's system.
 * e.g. 11 → [1, 1], 12 → [1, 2], 7 → [7]
 */
export function getPurposeDigits(finalNumber: number): number[] {
  if (finalNumber >= 10) {
    return [Math.floor(finalNumber / 10), finalNumber % 10];
  }
  return [finalNumber];
}

/**
 * Validate a birth date: real calendar date, year 1900..current.
 */
export function isValidBirthDate(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  // Check the date actually exists
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
