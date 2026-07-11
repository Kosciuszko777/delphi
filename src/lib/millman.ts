/**
 * Millman Life-Purpose Number Calculator
 *
 * Method (Dan Millman's system):
 * 1. Write out the full birth date as digits: MM/DD/YYYY
 * 2. Add ALL individual digits together to get a working sum
 * 3. Then add the digits of that working sum to get the final single digit
 * 4. The result is written as "working sum / final digit", e.g. "30/3"
 *
 * Example: March 15, 1978 → 0+3+1+5+1+9+7+8 = 34 → 3+4 = 7 → "34/7"
 *
 * If the working sum is already a single digit, there's no slash —
 * but this is extremely rare with real birth dates.
 *
 * If the digit-sum of the working sum still has two digits, sum again.
 * e.g. working sum 48 → 4+8=12 → 1+2=3 → rendered as "48/12/3"
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
 * @returns The life-purpose string, e.g. "30/3", "34/7", "48/12/3"
 */
export function computeMillmanNumber(year: number, month: number, day: number): string {
  // Sum ALL individual digits of the full date
  const dateStr = `${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${year}`;
  let workingSum = 0;
  for (const ch of dateStr) {
    workingSum += parseInt(ch, 10);
  }

  // Build the chain of digit sums
  const chain: number[] = [workingSum];

  let current = workingSum;
  while (current >= 10) {
    current = digitSum(current);
    chain.push(current);
  }

  return chain.join('/');
}

/**
 * Get the final single-digit purpose number from a Millman number string.
 * e.g. "34/7" → 7, "48/12/3" → 3
 */
export function getFinalDigit(millmanNumber: string): number {
  const parts = millmanNumber.split('/');
  return parseInt(parts[parts.length - 1], 10);
}

/**
 * Get the working sum (first number) from a Millman number string.
 * e.g. "34/7" → 34, "48/12/3" → 48
 */
export function getWorkingSum(millmanNumber: string): number {
  return parseInt(millmanNumber.split('/')[0], 10);
}

/**
 * Validate a date is a plausible birth date (1900–present, valid month/day).
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
