import { useCallback, useState } from 'react';

import { createMarkup } from '@veraclins-dev/react-utils';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Typography,
} from '@veraclins-dev/ui';
import {
  // Date utilities
  addDays,
  addHours,
  addMonths,
  addYears,
  breakpoints,
  combinePaths,
  createRandomString,
  createUniqueSlug,
  createUniqueString,
  createUriString,
  // Lodash utilities
  debounce,
  emailToUserName,
  endOfPeriod,
  formatDate,
  formatDateTime,
  formatMonth,
  formatRelativeDate,
  formatRelativeTime,
  formatYear,
  getDaysInMonth,
  getDomainUrl,
  getFirstDayOfMonth,
  getInitials,
  getLastDayOfMonth,
  getRandom,
  getReferrerRoute,
  getSize,
  // Size utilities
  getSizeClasses,
  highlight,
  humanize,
  isAfter,
  isBefore,
  isBetween,
  isLastWeek,
  isObject,
  isObjectLike,
  isSameDay,
  isSameMonth,
  isSameYear,
  isSymbol,
  isThisWeek,
  isToday,
  isValidDate,
  isWeekend,
  now,
  parseDate,
  parseToDateTime,
  roundToDecimal,
  roundToTwo,
  sizeScale,
  // Slugify utilities
  slugify,
  startOfPeriod,
  startOfToday,
  stripHTMLTags,
  subtractDays,
  subtractMonths,
  subtractYears,
  throttle,
  toDate,
  toNumber,
  truncate,
  truncateMiddle,
  z,
} from '@veraclins-dev/utils';

import { PlaygroundBreadcrumb } from './playground-breadcrumb';

export function UtilsShowcase() {
  const [debouncedValue, setDebouncedValue] = useState('');
  const [throttledValue, setThrottledValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [validationResult, setValidationResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('date');

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedValue(`Debounced: ${value}`);
    }, 500),
    [],
  );

  // Throttled update function
  const throttledUpdate = useCallback(
    throttle((value: string) => {
      setThrottledValue(`Throttled: ${value}`);
    }, 1000),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
    throttledUpdate(value);
  };

  // Validation schema
  const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    age: z.number().min(18, 'Must be at least 18 years old'),
  });

  const handleValidation = () => {
    const testData = {
      name: 'John',
      email: 'john@example.com',
      age: 25,
    };
    const result = userSchema.parse(testData);
    setValidationResult(result);
  };

  const sampleText =
    'This is a sample text that will be truncated and processed by various utility functions.';
  const sampleHTML =
    '<p>This is <strong>HTML content</strong> with <a href="#">links</a> and <em>formatting</em>.</p>';
  const sampleEmail = 'john.doe@company.com';
  const sampleName = 'John Michael Doe';
  const sampleSlug = 'This is a sample title for slugification!';

  const tabs = [
    { id: 'date', label: 'Date' },
    { id: 'validation', label: 'Validation' },
    { id: 'misc', label: 'Misc' },
    { id: 'dom', label: 'DOM' },
    { id: 'slugify', label: 'Slugify' },
    { id: 'size', label: 'Size' },
    { id: 'scroll', label: 'Scroll' },
    { id: 'lodash', label: 'Lodash' },
  ];

  return (
    <Box className="w-full max-w-6xl mx-auto space-y-8">
      <PlaygroundBreadcrumb currentPage="Utils" className="mb-4" />

      <Box className="text-center space-y-4">
        <Typography variant="h1">Utility Functions</Typography>
        <Typography variant="body1" className="text-neutral-foreground/70">
          Essential utility functions for common development tasks.
        </Typography>
      </Box>

      <div className="container mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Utils Package Showcase</h1>
          <p className="text-xl text-foreground/80">
            Comprehensive collection of utility functions for common development
            tasks
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'solid' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="mb-0"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Date Utilities */}
        {activeTab === 'date' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Date Utilities</CardTitle>
                <CardDescription>
                  Comprehensive date formatting and manipulation utilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Basic Formatting</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>formatDate:</strong>{' '}
                        {formatDate(new Date(), 'MMM dd, yyyy')}
                      </div>
                      <div>
                        <strong>formatDateTime:</strong>{' '}
                        {formatDateTime(new Date('2025-05-19T12:00:00Z'))}
                      </div>
                      <div>
                        <strong>formatRelativeTime:</strong>{' '}
                        {formatRelativeTime(new Date('2025-06-27T17:00:00Z'))}
                      </div>
                      <div>
                        <strong>formatRelativeTime:</strong>{' '}
                        {formatRelativeTime(new Date('2025-06-27T18:00:00Z'))}
                      </div>
                      <div>
                        <strong>formatRelativeDate:</strong>{' '}
                        {formatRelativeDate(new Date('2025-06-27T19:00:00Z'))}
                      </div>
                      <div>
                        <strong>formatRelativeDate:</strong>{' '}
                        {formatRelativeDate(new Date('2025-06-27T20:00:00Z'))}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Date Checks</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>isToday:</strong>{' '}
                        {isToday(new Date()) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isThisWeek:</strong>{' '}
                        {isThisWeek(new Date()) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isLastWeek:</strong>{' '}
                        {isLastWeek(new Date()) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isWeekend:</strong>{' '}
                        {isWeekend(new Date()) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isValidDate:</strong>{' '}
                        {isValidDate(new Date()) ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Date Manipulation</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>addDays (+7):</strong>{' '}
                        {formatDate(addDays(new Date(), 7), 'MMM dd, yyyy')}
                      </div>
                      <div>
                        <strong>addMonths (+2):</strong>{' '}
                        {formatDate(addMonths(new Date(), 2), 'MMM dd, yyyy')}
                      </div>
                      <div>
                        <strong>addYears (+1):</strong>{' '}
                        {formatDate(addYears(new Date(), 1), 'MMM dd, yyyy')}
                      </div>
                      <div>
                        <strong>addHours (+2):</strong>{' '}
                        {formatDateTime(addHours(new Date(), 2))}
                      </div>
                      <div>
                        <strong>subtractDays (-7):</strong>{' '}
                        {formatDate(
                          subtractDays(new Date(), 7),
                          'MMM dd, yyyy',
                        )}
                      </div>
                      <div>
                        <strong>subtractMonths (-1):</strong>{' '}
                        {formatDate(
                          subtractMonths(new Date(), 1),
                          'MMM dd, yyyy',
                        )}
                      </div>
                      <div>
                        <strong>subtractYears (-1):</strong>{' '}
                        {formatDate(
                          subtractYears(new Date(), 1),
                          'MMM dd, yyyy',
                        )}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Date Comparisons</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>isSameDay:</strong>{' '}
                        {isSameDay(new Date(), new Date()) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isSameMonth:</strong>{' '}
                        {isSameMonth(new Date(), new Date()) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isSameYear:</strong>{' '}
                        {isSameYear(new Date(), new Date()) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isAfter (future):</strong>{' '}
                        {isAfter(addDays(new Date(), 1), new Date())
                          ? 'Yes'
                          : 'No'}
                      </div>
                      <div>
                        <strong>isBefore (past):</strong>{' '}
                        {isBefore(subtractDays(new Date(), 1), new Date())
                          ? 'Yes'
                          : 'No'}
                      </div>
                      <div>
                        <strong>isBetween:</strong>{' '}
                        {isBetween(
                          new Date(),
                          subtractDays(new Date(), 1),
                          addDays(new Date(), 1),
                        )
                          ? 'Yes'
                          : 'No'}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Month/Year Operations
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>formatMonth:</strong> {formatMonth(new Date())}
                      </div>
                      <div>
                        <strong>formatYear:</strong> {formatYear(new Date())}
                      </div>
                      <div>
                        <strong>getDaysInMonth:</strong>{' '}
                        {getDaysInMonth(new Date())}
                      </div>
                      <div>
                        <strong>getFirstDayOfMonth:</strong>{' '}
                        {formatDate(
                          getFirstDayOfMonth(new Date()),
                          'MMM dd, yyyy',
                        )}
                      </div>
                      <div>
                        <strong>getLastDayOfMonth:</strong>{' '}
                        {formatDate(
                          getLastDayOfMonth(new Date()),
                          'MMM dd, yyyy',
                        )}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Date Periods</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Last 7 days:</strong>{' '}
                        {formatDate(
                          startOfPeriod('Last 7 days'),
                          'MMM dd, yyyy',
                        )}
                      </div>
                      <div>
                        <strong>This month:</strong>{' '}
                        {formatDate(
                          startOfPeriod('This month'),
                          'MMM dd, yyyy',
                        )}
                      </div>
                      <div>
                        <strong>Next 30 days:</strong>{' '}
                        {formatDate(
                          endOfPeriod('Next 30 days'),
                          'MMM dd, yyyy',
                        )}
                      </div>
                      <div>
                        <strong>startOfToday:</strong>{' '}
                        {formatDateTime(startOfToday())}
                      </div>
                      <div>
                        <strong>now():</strong> {now()}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Date Parsing</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>parseDate:</strong>{' '}
                        {formatDateTime(parseDate('2024-01-15'))}
                      </div>
                      <div>
                        <strong>parseToDateTime:</strong>{' '}
                        {parseToDateTime('2024-01-15T10:30:00Z').toISO()}
                      </div>
                      <div>
                        <strong>toDate:</strong>{' '}
                        {formatDateTime(toDate(parseToDateTime(new Date())))}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Custom Formatting</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Custom format:</strong>{' '}
                        {formatDate(new Date(), 'yyyy-MM-dd')}
                      </div>
                      <div>
                        <strong>With bullet:</strong>{' '}
                        {formatRelativeTime(new Date())}
                      </div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Validation Utilities */}
        {activeTab === 'validation' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Validation Utilities</CardTitle>
                <CardDescription>
                  Zod-based validation utilities with error formatting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Valid Data</h4>
                    <Button onClick={handleValidation} className="mb-2">
                      Test Validation
                    </Button>
                    {validationResult && (
                      <div className="text-sm">
                        <div>
                          <strong>Success:</strong>{' '}
                          {validationResult.success ? 'Yes' : 'No'}
                        </div>
                        {validationResult.success && (
                          <div>
                            <strong>Data:</strong>{' '}
                            {JSON.stringify(validationResult.values)}
                          </div>
                        )}
                        {!validationResult.success && (
                          <div>
                            <strong>Errors:</strong>{' '}
                            {JSON.stringify(validationResult.errors)}
                          </div>
                        )}
                      </div>
                    )}
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Error Formatting</h4>
                    <div className="text-sm space-y-2">
                      <div>
                        <strong>Humanized:</strong> {humanize('user_name')}
                      </div>
                      <div>
                        <strong>Humanized:</strong> {humanize('emailAddress')}
                      </div>
                      <div>
                        <strong>Humanized:</strong> {humanize('phone_number')}
                      </div>
                      <div>
                        <strong>Humanized:</strong> {humanize('first_name')}
                      </div>
                      <div>
                        <strong>Humanized:</strong> {humanize('last_name')}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Validation Examples</h4>
                    <div className="space-y-4">
                      <div>
                        <Button
                          onClick={() => {
                            const invalidData = {
                              name: 'J',
                              email: 'invalid',
                              age: 15,
                            };
                            const result = userSchema.parse(invalidData);
                            setValidationResult(result);
                          }}
                          variant="outline"
                          buttonSize="sm"
                        >
                          Test Invalid Data
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const partialData = { name: 'John' } as any;
                            const result = userSchema.parse(partialData);
                            setValidationResult(result);
                          }}
                          variant="outline"
                          buttonSize="sm"
                        >
                          Test Partial Data
                        </Button>
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Schema Examples</h4>
                    <div className="text-sm space-y-2">
                      <div>
                        <strong>User Schema:</strong> Name (min 2), Email, Age
                        (min 18)
                      </div>
                      <div>
                        <strong>Validation Modes:</strong> sync, async, safe
                      </div>
                      <div>
                        <strong>Error Handling:</strong> Formatted, humanized
                      </div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Misc Utilities */}
        {activeTab === 'misc' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Miscellaneous Utilities</CardTitle>
                <CardDescription>
                  General-purpose utility functions for common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">String Processing</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Original:</strong> {sampleText}
                      </div>
                      <div>
                        <strong>Truncated (30):</strong>{' '}
                        {truncate(sampleText, 30)}
                      </div>
                      <div>
                        <strong>Truncate Middle (20):</strong>{' '}
                        {truncateMiddle(sampleText, 20)}
                      </div>
                      <div>
                        <strong>Email to Username:</strong>{' '}
                        {emailToUserName(sampleEmail)}
                      </div>
                      <div>
                        <strong>Initials:</strong> {getInitials(sampleName)}
                      </div>
                      <div>
                        <strong>Highlight 'text':</strong>{' '}
                        <span
                          dangerouslySetInnerHTML={createMarkup(
                            highlight(sampleText, 'text'),
                          )}
                        />
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Path & URL Utilities</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Combine Paths:</strong>{' '}
                        {combinePaths('api', 'users', 'profile')}
                      </div>
                      <div>
                        <strong>Random Items:</strong>{' '}
                        {getRandom(['a', 'b', 'c', 'd', 'e'], 3).join(', ')}
                      </div>
                      <div>
                        <strong>getDomainUrl (simulated):</strong>{' '}
                        {(() => {
                          // Simulate a Request object for demonstration
                          const mockRequest = {
                            url: 'https://example.com/dashboard/profile',
                            headers: {
                              get: (name: string) => {
                                if (name === 'host') return 'example.com';
                                if (name === 'X-Forwarded-Host') return null;
                                return null;
                              },
                            },
                          } as unknown as Request;
                          return getDomainUrl(mockRequest);
                        })()}
                      </div>
                      <div>
                        <strong>getReferrerRoute (simulated):</strong>{' '}
                        {(() => {
                          // Simulate a Request object for demonstration
                          const mockRequest = {
                            url: 'https://example.com/dashboard/profile',
                            headers: {
                              get: (name: string) => {
                                if (name === 'host') return 'example.com';
                                if (name === 'X-Forwarded-Host') return null;
                                if (name === 'referer')
                                  return 'https://example.com/dashboard';
                                if (name === 'referrer') return null;
                                return null;
                              },
                            },
                            referrer: 'https://example.com/dashboard',
                          } as unknown as Request;
                          return getReferrerRoute(mockRequest);
                        })()}
                      </div>
                      <div>
                        <strong>getReferrerRoute (external):</strong>{' '}
                        {(() => {
                          // Simulate external referrer
                          const mockRequest = {
                            url: 'https://example.com/dashboard/profile',
                            headers: {
                              get: (name: string) => {
                                if (name === 'host') return 'example.com';
                                if (name === 'X-Forwarded-Host') return null;
                                if (name === 'referer')
                                  return 'https://google.com/search';
                                if (name === 'referrer') return null;
                                return null;
                              },
                            },
                            referrer: 'https://google.com/search',
                          } as unknown as Request;
                          return getReferrerRoute(mockRequest);
                        })()}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Number Utilities</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Round to Decimal (3.14159, 2):</strong>{' '}
                        {roundToDecimal(3.14159, 2)}
                      </div>
                      <div>
                        <strong>Round to Two (3.14159):</strong>{' '}
                        {roundToTwo(3.14159)}
                      </div>
                      <div>
                        <strong>Round to Decimal (2.71828, 3):</strong>{' '}
                        {roundToDecimal(2.71828, 3)}
                      </div>
                      <div>
                        <strong>Round to Two (1.99999):</strong>{' '}
                        {roundToTwo(1.99999)}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Type Checking</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>isObject({}):</strong>{' '}
                        {isObject({}) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isObjectLike([]):</strong>{' '}
                        {isObjectLike([]) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isSymbol('test'):</strong>{' '}
                        {isSymbol('test') ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isSymbol(Symbol()):</strong>{' '}
                        {isSymbol(Symbol()) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>toNumber('123.45'):</strong>{' '}
                        {toNumber('123.45')}
                      </div>
                      <div>
                        <strong>toNumber('abc'):</strong> {toNumber('abc')}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Utility Functions</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>cn:</strong> Combines class names with Tailwind
                        merge
                      </div>
                      <div>
                        <strong>getErrorMessage:</strong> Extracts error
                        messages
                      </div>
                      <div>
                        <strong>invariant:</strong> Runtime assertion utility
                      </div>
                      <div>
                        <strong>callAll:</strong> Calls multiple functions with
                        same args
                      </div>
                      <div>
                        <strong>wait:</strong> Async delay utility
                      </div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* DOM Utilities */}
        {activeTab === 'dom' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>DOM Utilities</CardTitle>
                <CardDescription>
                  Utilities for DOM manipulation and HTML processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">HTML Processing</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Original HTML:</strong> {sampleHTML}
                      </div>
                      <div>
                        <strong>Strip HTML Tags:</strong>{' '}
                        {stripHTMLTags(sampleHTML)}
                      </div>
                      <div>
                        <strong>Highlight 'HTML':</strong>{' '}
                        <span
                          dangerouslySetInnerHTML={createMarkup(
                            highlight(sampleHTML, 'HTML'),
                          )}
                        />
                      </div>
                      <div>
                        <strong>Highlight 'strong':</strong>{' '}
                        <span
                          dangerouslySetInnerHTML={createMarkup(
                            highlight(sampleHTML, 'strong'),
                          )}
                        />
                      </div>
                      <div>
                        <strong>Highlight 'links':</strong>{' '}
                        <span
                          dangerouslySetInnerHTML={createMarkup(
                            highlight(sampleHTML, 'links'),
                          )}
                        />
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Text Highlighting</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Original Text:</strong> {sampleText}
                      </div>
                      <div>
                        <strong>Highlight 'sample':</strong>{' '}
                        <span
                          dangerouslySetInnerHTML={createMarkup(
                            highlight(sampleText, 'sample'),
                          )}
                        />
                      </div>
                      <div>
                        <strong>Highlight 'text':</strong>{' '}
                        <span
                          dangerouslySetInnerHTML={createMarkup(
                            highlight(sampleText, 'text'),
                          )}
                        />
                      </div>
                      <div>
                        <strong>Highlight 'utility':</strong>{' '}
                        <span
                          dangerouslySetInnerHTML={createMarkup(
                            highlight(sampleText, 'utility'),
                          )}
                        />
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">DOM Utilities</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>createMarkup:</strong> Creates React-compatible
                        HTML markup
                      </div>
                      <div>
                        <strong>setReactInputValue:</strong> Sets React input
                        values programmatically
                      </div>
                      <div>
                        <strong>closestParent:</strong> Finds closest parent
                        element by selector
                      </div>
                      <div>
                        <strong>getScrollPosition:</strong> Detects scroll
                        position in elements
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Usage Examples</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Search Highlighting:</strong> Highlight search
                        terms in content
                      </div>
                      <div>
                        <strong>HTML Sanitization:</strong> Remove unwanted HTML
                        tags
                      </div>
                      <div>
                        <strong>DOM Traversal:</strong> Find parent elements by
                        class/ID
                      </div>
                      <div>
                        <strong>Scroll Detection:</strong> Monitor scroll
                        position for UI updates
                      </div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Slugify Utilities */}
        {activeTab === 'slugify' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Slugify Utilities</CardTitle>
                <CardDescription>
                  String slugification and URL-friendly text processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Slug Generation</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Original:</strong> {sampleSlug}
                      </div>
                      <div>
                        <strong>slugify:</strong> {slugify(sampleSlug)}
                      </div>
                      <div>
                        <strong>createUniqueSlug:</strong>{' '}
                        {createUniqueSlug({ string: sampleSlug })}
                      </div>
                      <div>
                        <strong>createUniqueString:</strong>{' '}
                        {createUniqueString(sampleSlug)}
                      </div>
                      <div>
                        <strong>createUriString:</strong>{' '}
                        {createUriString(sampleSlug)}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Random String Generation
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Random String (5):</strong>{' '}
                        {createRandomString(5)}
                      </div>
                      <div>
                        <strong>Random String (10):</strong>{' '}
                        {createRandomString(10)}
                      </div>
                      <div>
                        <strong>Random String (15):</strong>{' '}
                        {createRandomString(15)}
                      </div>
                      <div>
                        <strong>Random String (20):</strong>{' '}
                        {createRandomString(20)}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Different Text Examples
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Simple:</strong> {slugify('Hello World')}
                      </div>
                      <div>
                        <strong>With Numbers:</strong>{' '}
                        {slugify('Product 123 - Special Edition')}
                      </div>
                      <div>
                        <strong>With Special Chars:</strong>{' '}
                        {slugify('User@Domain.com & Co.')}
                      </div>
                      <div>
                        <strong>With Spaces:</strong>{' '}
                        {slugify('Multiple   Spaces   Here')}
                      </div>
                      <div>
                        <strong>With Punctuation:</strong>{' '}
                        {slugify("What's up, world?!")}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Unique Slug Examples</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Simple Unique:</strong>{' '}
                        {createUniqueSlug({ string: 'Hello World' })}
                      </div>
                      <div>
                        <strong>With Options:</strong>{' '}
                        {createUniqueSlug({ string: 'Hello World' })}
                      </div>
                      <div>
                        <strong>With Options:</strong>{' '}
                        {createUniqueSlug({ string: 'Hello World' })}
                      </div>
                      <div>
                        <strong>Complex Unique:</strong>{' '}
                        {createUniqueSlug({
                          string: 'Product Name with Special Characters!@#$%',
                        })}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">URI String Examples</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Simple URI:</strong>{' '}
                        {createUriString('Hello World')}
                      </div>
                      <div>
                        <strong>With Protocol:</strong>{' '}
                        {createUriString('https://example.com')}
                      </div>
                      <div>
                        <strong>With Path:</strong>{' '}
                        {createUriString('/api/users/profile')}
                      </div>
                      <div>
                        <strong>Complex URI:</strong>{' '}
                        {createUriString(
                          'https://example.com/api/users?name=john&age=25',
                        )}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Use Cases</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>URL Slugs:</strong> Blog posts, product pages
                      </div>
                      <div>
                        <strong>File Names:</strong> Safe file naming
                      </div>
                      <div>
                        <strong>CSS Classes:</strong> Dynamic class generation
                      </div>
                      <div>
                        <strong>API Endpoints:</strong> Resource identifiers
                      </div>
                      <div>
                        <strong>Database Keys:</strong> Unique identifiers
                      </div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Size Utilities */}
        {activeTab === 'size' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Size Utilities</CardTitle>
                <CardDescription>
                  Responsive sizing utilities with Tailwind CSS integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Size Classes</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Square 16:</strong> {getSizeClasses(16)}
                      </div>
                      <div>
                        <strong>Rectangle 20x32:</strong>{' '}
                        {getSizeClasses({ w: 20, h: 32 })}
                      </div>
                      <div>
                        <strong>Responsive:</strong>{' '}
                        {getSizeClasses({ xs: 16, md: 24, lg: 32 })}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Size Dimensions</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Size 16:</strong> {JSON.stringify(getSize(16))}
                      </div>
                      <div>
                        <strong>Size 20x32:</strong>{' '}
                        {JSON.stringify(getSize({ w: 20, h: 32 }))}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Size Scale</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Available Sizes:</strong>{' '}
                        {sizeScale.slice(0, 10).join(', ')}...
                      </div>
                      <div>
                        <strong>Breakpoints:</strong> {breakpoints.join(', ')}
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Visual Examples</h4>
                    <div className="space-y-4">
                      <div className="bg-blue-200 size-16 flex items-center justify-center text-xs">
                        16x16
                      </div>
                      <div className="bg-green-200 w-20 h-32 flex items-center justify-center text-xs">
                        20x32
                      </div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Scroll Utilities */}
        {activeTab === 'scroll' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scroll Utilities</CardTitle>
                <CardDescription>
                  Utilities for detecting scroll position and direction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Scroll Position Detection
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>getScrollPosition:</strong> Detects scroll
                        position in elements
                      </div>
                      <div>
                        <strong>Vertical:</strong> Returns top/bottom position
                      </div>
                      <div>
                        <strong>Horizontal:</strong> Returns left/right position
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Usage Example</h4>
                    <div className="space-y-2 text-sm">
                      <div>Use with scrollable containers to detect:</div>
                      <ul className="list-disc list-inside ml-2">
                        <li>If scrolled to top</li>
                        <li>If scrolled to bottom</li>
                        <li>If scrolled to left</li>
                        <li>If scrolled to right</li>
                      </ul>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lodash Utilities */}
        {activeTab === 'lodash' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lodash Utilities</CardTitle>
                <CardDescription>
                  Performance optimization utilities for function calls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Debounce & Throttle</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="search">Search Input (Debounced)</Label>
                        <Input
                          id="search"
                          value={searchTerm}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          placeholder="Type to see debounced effect..."
                        />
                        <div className="text-sm mt-2">
                          <strong>Debounced Value:</strong> {debouncedValue}
                        </div>
                        <div className="text-sm">
                          <strong>Throttled Value:</strong> {throttledValue}
                        </div>
                      </div>
                    </div>
                  </Box>

                  <Box className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Utility Functions</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>now():</strong> {now()}
                      </div>
                      <div>
                        <strong>isObject({}):</strong>{' '}
                        {isObject({}) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isObjectLike([]):</strong>{' '}
                        {isObjectLike([]) ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>isSymbol('test'):</strong>{' '}
                        {isSymbol('test') ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>toNumber('123.45'):</strong>{' '}
                        {toNumber('123.45')}
                      </div>
                    </div>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Real-World Integration Examples</CardTitle>
            <CardDescription>
              How these utilities work together in practical scenarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Box className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">User Profile Card</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Name:</strong> {sampleName}
                  </div>
                  <div>
                    <strong>Email:</strong> {sampleEmail}
                  </div>
                  <div>
                    <strong>Username:</strong> {emailToUserName(sampleEmail)}
                  </div>
                  <div>
                    <strong>Initials:</strong> {getInitials(sampleName)}
                  </div>
                  <div>
                    <strong>Profile Slug:</strong> {slugify(sampleName)}
                  </div>
                  <div>
                    <strong>Joined:</strong>{' '}
                    {formatRelativeTime(subtractDays(new Date(), 30))}
                  </div>
                </div>
              </Box>

              <Box className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Content Management</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Original Title:</strong> {sampleSlug}
                  </div>
                  <div>
                    <strong>URL Slug:</strong>{' '}
                    {createUniqueSlug({ string: sampleSlug })}
                  </div>
                  <div>
                    <strong>Meta Description:</strong>{' '}
                    {truncate(sampleText, 50)}
                  </div>
                  <div>
                    <strong>Published:</strong> {formatDateTime(new Date())}
                  </div>
                  <div>
                    <strong>Time Ago:</strong> {formatRelativeTime(new Date())}
                  </div>
                </div>
              </Box>
            </div>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
}
