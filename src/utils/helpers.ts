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

/**
 * Capitalizes the first letter of each word in a string, replacing hyphens with spaces.
 * Example: "study-groups" -> "Study Groups"
 */
export const capitalizeWords = (currentPath: string): string => {
  return currentPath
    .split('-') // Split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' '); // Join with space
};
