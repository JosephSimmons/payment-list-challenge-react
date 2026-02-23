import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import { formattedDate } from './formatDates';

// Unit tests for formattedDate helper

describe('formattedDate', () => {
  test('formats ISO date string correctly', () => {
    expect(formattedDate('2024-01-15T10:30:00Z')).toBe('15/01/2024, 10:30:00');
  });

  test('handles invalid date gracefully', () => {
    expect(() => formattedDate('invalid-date')).toThrow();
  });
});
