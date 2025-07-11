import { CATEGORIZED_PATTERNS } from './definitions';

/**
 * Original regex-based filtering (for comparison)
 */
const getFilteredPatternsRegex = (input: string) => {
  const normalized = input.trim().toLowerCase();
  const length = normalized.length;
  const colonCount = (normalized.match(/:/g) || []).length;
  const hasPeriod = /[ap]m/.test(normalized);
  const hasSeconds = colonCount >= 2;
  const is24Hour = /^([0-2]?[0-9]|2[0-3])/.test(normalized) && !hasPeriod;

  return CATEGORIZED_PATTERNS.filter((pattern) => {
    if (pattern.length < length - 2 || pattern.length > length + 2) {
      return false;
    }
    if (pattern.colonCount !== colonCount) {
      return false;
    }
    if (pattern.hasPeriod !== hasPeriod) {
      return false;
    }
    if (pattern.hasSeconds !== hasSeconds) {
      return false;
    }
    if (pattern.is24Hour !== is24Hour) {
      return false;
    }
    return true;
  });
};

/**
 * Optimized string-based filtering
 */
const getFilteredPatternsOptimized = (input: string) => {
  const normalized = input.trim().toLowerCase();
  const length = normalized.length;

  // Use string operations instead of regex where possible
  const colonCount = normalized.split(':').length - 1;
  const hasPeriod = normalized.includes('am') || normalized.includes('pm');
  const hasSeconds = colonCount >= 2;

  // Optimized 24-hour detection without complex regex
  let is24Hour = false;
  if (!hasPeriod && length > 0) {
    const firstChar = normalized[0];
    const secondChar = normalized[1];

    if (firstChar >= '0' && firstChar <= '2') {
      if (secondChar >= '0' && secondChar <= '9') {
        // Two digits: check if it's 00-23 (optimized logic)
        is24Hour = (firstChar === '2' && secondChar <= '3') || firstChar <= '1';
      } else {
        // Single digit: could be 0-2 (24-hour) or 1-2 (12-hour)
        if (colonCount > 0) {
          // If there's a colon, it's likely 24-hour format
          is24Hour = true;
        } else {
          // Single digit without colon - could be either, default to 12-hour
          is24Hour = false;
        }
      }
    } else if (firstChar >= '3' && firstChar <= '9') {
      // Single digit 3-9: could be 24-hour if there's a colon
      if (colonCount > 0) {
        is24Hour = true;
      } else {
        is24Hour = false;
      }
    }
  }

  return CATEGORIZED_PATTERNS.filter((pattern) => {
    if (pattern.length < length - 2 || pattern.length > length + 2) {
      return false;
    }
    if (pattern.colonCount !== colonCount) {
      return false;
    }
    if (pattern.hasPeriod !== hasPeriod) {
      return false;
    }
    if (pattern.hasSeconds !== hasSeconds) {
      return false;
    }
    if (pattern.is24Hour !== is24Hour) {
      return false;
    }
    return true;
  });
};

/**
 * Focused performance test for filtering logic only
 */
export const runFilteringPerformanceTest = () => {
  const testCases = [
    '2:30 PM',
    '14:30',
    '2:3:4 PM',
    '14:3:4',
    '2:30:45 PM',
    '14:30:45',
    '2',
    '14',
    '2:',
    '14:',
    '2:3',
    '14:3',
    '2:30:',
    '14:30:',
    '2:3:',
    '14:3:',
    'am',
    'pm',
    'AM',
    'PM',
  ];

  console.log('=== Focused Filtering Performance Test ===\n');

  let totalRegexTime = 0;
  let totalOptimizedTime = 0;
  const totalIterations = 50000; // Run each test 50,000 times

  testCases.forEach((testCase) => {
    // Test regex version
    const regexStart = performance.now();
    for (let i = 0; i < totalIterations; i++) {
      getFilteredPatternsRegex(testCase);
    }
    const regexEnd = performance.now();
    const regexTime = regexEnd - regexStart;
    totalRegexTime += regexTime;

    // Test optimized version
    const optimizedStart = performance.now();
    for (let i = 0; i < totalIterations; i++) {
      getFilteredPatternsOptimized(testCase);
    }
    const optimizedEnd = performance.now();
    const optimizedTime = optimizedEnd - optimizedStart;
    totalOptimizedTime += optimizedTime;

    const regexResult = getFilteredPatternsRegex(testCase);
    const optimizedResult = getFilteredPatternsOptimized(testCase);
    const resultsMatch = regexResult.length === optimizedResult.length;

    console.log(`Input: "${testCase}"`);
    console.log(
      `  Regex time: ${regexTime.toFixed(3)}ms (${totalIterations.toLocaleString()} iterations)`,
    );
    console.log(
      `  Optimized time: ${optimizedTime.toFixed(3)}ms (${totalIterations.toLocaleString()} iterations)`,
    );
    console.log(`  Speedup: ${(regexTime / optimizedTime).toFixed(2)}x faster`);
    console.log(`  Results match: ${resultsMatch ? '✅' : '❌'}`);
    console.log(`  Patterns found: ${optimizedResult.length}`);
    console.log('');
  });

  console.log('=== Summary ===');
  console.log(`Total regex time: ${totalRegexTime.toFixed(3)}ms`);
  console.log(`Total optimized time: ${totalOptimizedTime.toFixed(3)}ms`);
  console.log(
    `Overall speedup: ${(totalRegexTime / totalOptimizedTime).toFixed(2)}x faster`,
  );
  console.log(
    `Time saved: ${(totalRegexTime - totalOptimizedTime).toFixed(3)}ms`,
  );
  console.log(
    `Percentage improvement: ${(((totalRegexTime - totalOptimizedTime) / totalRegexTime) * 100).toFixed(1)}%`,
  );

  // Test individual operations with even higher iterations
  console.log('\n=== Individual Operation Performance (1M iterations) ===');

  const testString = '14:30:45 pm';

  // Colon count
  const colonRegexStart = performance.now();
  for (let i = 0; i < 1000000; i++) {
    const _ = (testString.match(/:/g) || []).length;
  }
  const colonRegexEnd = performance.now();

  const colonStringStart = performance.now();
  for (let i = 0; i < 1000000; i++) {
    const _ = testString.split(':').length - 1;
  }
  const colonStringEnd = performance.now();

  console.log(
    `Colon count - Regex: ${(colonRegexEnd - colonRegexStart).toFixed(3)}ms`,
  );
  console.log(
    `Colon count - String: ${(colonStringEnd - colonStringStart).toFixed(3)}ms`,
  );
  console.log(
    `Colon count speedup: ${((colonRegexEnd - colonRegexStart) / (colonStringEnd - colonStringStart)).toFixed(2)}x`,
  );

  // Period detection
  const periodRegexStart = performance.now();
  for (let i = 0; i < 1000000; i++) {
    const _ = /[ap]m/.test(testString);
  }
  const periodRegexEnd = performance.now();

  const periodStringStart = performance.now();
  for (let i = 0; i < 1000000; i++) {
    const _ = testString.includes('am') || testString.includes('pm');
  }
  const periodStringEnd = performance.now();

  console.log(
    `Period detection - Regex: ${(periodRegexEnd - periodRegexStart).toFixed(3)}ms`,
  );
  console.log(
    `Period detection - String: ${(periodStringEnd - periodStringStart).toFixed(3)}ms`,
  );
  console.log(
    `Period detection speedup: ${((periodRegexEnd - periodRegexStart) / (periodStringEnd - periodStringStart)).toFixed(2)}x`,
  );

  // 24-hour detection
  const hourRegexStart = performance.now();
  for (let i = 0; i < 1000000; i++) {
    const _ = /^([0-2]?[0-9]|2[0-3])/.test(testString);
  }
  const hourRegexEnd = performance.now();

  const hourStringStart = performance.now();
  for (let i = 0; i < 1000000; i++) {
    const firstChar = testString[0];
    const secondChar = testString[1];
    let is24Hour = false;
    if (firstChar >= '0' && firstChar <= '2') {
      if (secondChar >= '0' && secondChar <= '9') {
        // Two digits: check if it's 00-23 (optimized logic)
        is24Hour = (firstChar === '2' && secondChar <= '3') || firstChar <= '1';
      }
    } else if (firstChar >= '3' && firstChar <= '9') {
      // Single digit 3-9: could be 24-hour if there's a colon
      if (testString.includes(':')) {
        is24Hour = true;
      } else {
        is24Hour = false;
      }
    }
    const _ = is24Hour;
  }
  const hourStringEnd = performance.now();

  console.log(
    `24-hour detection - Regex: ${(hourRegexEnd - hourRegexStart).toFixed(3)}ms`,
  );
  console.log(
    `24-hour detection - String: ${(hourStringEnd - hourStringStart).toFixed(3)}ms`,
  );
  console.log(
    `24-hour detection speedup: ${((hourRegexEnd - hourRegexStart) / (hourStringEnd - hourStringStart)).toFixed(2)}x`,
  );
};

/**
 * Run the performance test if this file is executed directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  runFilteringPerformanceTest();
}
