import { CATEGORIZED_PATTERNS, getFilteredPatterns } from './definitions';
import { parseTimeString } from './time';

/**
 * Performance test to compare smart filtering vs brute force
 */
export const runPerformanceTest = () => {
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
  ];

  console.log('=== Performance Test Results ===\n');

  testCases.forEach((testCase) => {
    const start = performance.now();
    const result = parseTimeString(testCase);
    const end = performance.now();
    const duration = end - start;

    const filteredPatterns = getFilteredPatterns(testCase);
    const totalPatterns = CATEGORIZED_PATTERNS.length;
    const reduction = (
      ((totalPatterns - filteredPatterns.length) / totalPatterns) *
      100
    ).toFixed(1);

    console.log(`Input: "${testCase}"`);
    console.log(`  Result: ${result ? 'SUCCESS' : 'FAILED'}`);
    console.log(`  Duration: ${duration.toFixed(3)}ms`);
    console.log(
      `  Patterns tried: ${filteredPatterns.length}/${totalPatterns} (${reduction}% reduction)`,
    );
    console.log(
      `  Filtered patterns:`,
      filteredPatterns.map((p) => p.pattern).join(', '),
    );
    console.log('');
  });

  // Calculate average improvement
  const totalStart = performance.now();
  testCases.forEach(() => parseTimeString('2:30 PM'));
  const totalEnd = performance.now();
  const totalDuration = totalEnd - totalStart;

  console.log(`=== Summary ===`);
  console.log(
    `Total time for ${testCases.length} test cases: ${totalDuration.toFixed(3)}ms`,
  );
  console.log(
    `Average time per case: ${(totalDuration / testCases.length).toFixed(3)}ms`,
  );
  console.log(
    `Total patterns without filtering: ${CATEGORIZED_PATTERNS.length * testCases.length}`,
  );

  const totalFiltered = testCases.reduce((sum, testCase) => {
    return sum + getFilteredPatterns(testCase).length;
  }, 0);

  console.log(`Total patterns with filtering: ${totalFiltered}`);
  console.log(
    `Overall reduction: ${(((CATEGORIZED_PATTERNS.length * testCases.length - totalFiltered) / (CATEGORIZED_PATTERNS.length * testCases.length)) * 100).toFixed(1)}%`,
  );
};

/**
 * Run the performance test if this file is executed directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  runPerformanceTest();
}
