/**
 * Extracts the initials from a given name.
 *
 * @param name - The full name from which to extract initials. It is expected to be a string
 * containing one or more words separated by spaces.
 * @returns A string containing the first letter of the first two words in uppercase.
 *
 * @example
 * ```typescript
 * getInitials("John Doe"); // Returns "JD"
 * getInitials("Alice"); // Returns "A"
 * getInitials("Mary Jane Watson"); // Returns "MJ"
 * ```
 */
export const getInitials = (name: string): string => {
  const words = name.split(' ');
  const initials = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase());
  return initials.join('');
};
