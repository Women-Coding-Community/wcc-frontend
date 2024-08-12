/**
 * Inserts a <br /> tag after the first occurrence of a period followed by space(s).
 *
 * @param text - The input string to be formatted.
 * @returns The formatted string with a <br /> tag inserted.
 */

export function addLineBreakAfterPeriod(text: string): string {
  // Regular expression to match a period followed by one or more spaces
  const regex = /\.\s+/;

  // Replace the first occurrence with '.<br />'
  return text.replace(regex, '.<br />');
}
