import { addLineBreakAfterPeriod } from './helpers';

describe('addLineBreakAfterPeriod', () => {
  test('should add <br /> after the first period followed by space', () => {
    const input =
      'Women Coding Community is a not-for-profit organisation. © 2024 Women Coding Community';
    const expected =
      'Women Coding Community is a not-for-profit organisation.<br />© 2024 Women Coding Community';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should only replace the first occurrence of period followed by spaces', () => {
    const input = 'First sentence. Second sentence. Third sentence.';
    const expected = 'First sentence.<br />Second sentence. Third sentence.';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should return the same string if there is no period', () => {
    const input = 'Women Coding Community is a not-for-profit organisation';
    const expected = 'Women Coding Community is a not-for-profit organisation';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should return the same string if period is at the end without following spaces', () => {
    const input = 'This is the end.';
    const expected = 'This is the end.';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should handle multiple spaces after period', () => {
    const input = 'Sentence one.   Sentence two.';
    const expected = 'Sentence one.<br />Sentence two.';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should not replace period without following spaces', () => {
    const input = 'Example.com is a website';
    const expected = 'Example.com is a website';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should handle strings with multiple periods correctly', () => {
    const input = 'Doctor Smith is a renowned scientist. He works at NASA.';
    const expected =
      'Doctor Smith is a renowned scientist.<br />He works at NASA.';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should handle strings with no spaces after period', () => {
    const input = 'Version 1.0 is released.';
    const expected = 'Version 1.0 is released.';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should handle empty string', () => {
    const input = '';
    const expected = '';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });

  test('should handle string with only a period and spaces', () => {
    const input = '.   ';
    const expected = '.<br />';
    expect(addLineBreakAfterPeriod(input)).toBe(expected);
  });
});
