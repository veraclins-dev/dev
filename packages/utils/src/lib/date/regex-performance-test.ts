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

    if (firstChar >= '0' && firstChar <= '9') {
      if (secondChar >= '0' && secondChar <= '9') {
        const hour = parseInt(normalized.substring(0, 2), 10);
        is24Hour = hour >= 0 && hour <= 23;
      } else {
        if (colonCount > 0) {
          is24Hour = true;
        } else {
          is24Hour = false;
        }
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
 * Performance test comparing regex vs string operations
 */
export const runRegexPerformanceTest = () => {
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

  console.log('=== Regex vs String Operations Performance Test ===\n');

  let totalRegexTime = 0;
  let totalOptimizedTime = 0;
  const totalIterations = 10000; // Run each test 10000 times for better accuracy

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
      `  Regex time: ${regexTime.toFixed(3)}ms (${totalIterations} iterations)`,
    );
    console.log(
      `  Optimized time: ${optimizedTime.toFixed(3)}ms (${totalIterations} iterations)`,
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

  // Test specific regex operations
  console.log('\n=== Individual Operation Performance ===');

  const testString = '14:30:45 pm';

  // Colon count
  const colonRegexStart = performance.now();
  for (let i = 0; i < 100000; i++) {
    const _ = (testString.match(/:/g) || []).length;
  }
  const colonRegexEnd = performance.now();

  const colonStringStart = performance.now();
  for (let i = 0; i < 100000; i++) {
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
  for (let i = 0; i < 100000; i++) {
    const _ = /[ap]m/.test(testString);
  }
  const periodRegexEnd = performance.now();

  const periodStringStart = performance.now();
  for (let i = 0; i < 100000; i++) {
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
};

/**
 * Run the performance test if this file is executed directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  runRegexPerformanceTest();
}
