import * as utils from './misc';

describe('utils.getErrorMessage', () => {
  it('should return the error message if it is a string', () => {
    expect(utils.getErrorMessage('error message')).toBe('error message');
  });

  it('should return the error message if it is an object with a message property', () => {
    expect(utils.getErrorMessage({ message: 'error message' })).toBe(
      'error message',
    );
  });

  it('should return "Unknown Error" if the error does not have a message property', () => {
    expect(utils.getErrorMessage({})).toBe('Unknown Error');
  });
});

describe('utils.cn', () => {
  it('should merge class names', () => {
    expect(utils.cn('class1', 'class2')).toBe('class1 class2');
  });
});

describe('utils.getDomainUrl', () => {
  it('should return the domain URL', () => {
    const request = new Request('https://example.com/path');
    expect(utils.getDomainUrl(request)).toBe('https://example.com');
  });
});

describe('utils.getReferrerRoute', () => {
  it('should return the referrer path', () => {
    const request = new Request('https://example.com/path', {
      headers: { referer: 'https://example.com/referrer' },
    });
    expect(utils.getReferrerRoute(request)).toBe('/referrer');
  });

  it('should return / if the referrer is not set', () => {
    const request = new Request('https://example.com/path');
    expect(utils.getReferrerRoute(request)).toBe('/');
  });
});

describe('utils.invariant', () => {
  it('should throw an error if the condition is falsey', () => {
    expect(() => utils.invariant(false, 'error message')).toThrowError(
      'error message',
    );
  });

  it('should not throw an error if the condition is truthy', () => {
    expect(() => utils.invariant(true, 'error message')).not.toThrow();
  });
});

describe('utils.callAll', () => {
  it('should call all functions with the given arguments', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    utils.callAll(fn1, fn2)('arg1', 'arg2');
    expect(fn1).toHaveBeenCalledWith('arg1', 'arg2');
    expect(fn2).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('utils.roundToDecimal', () => {
  it('should round a number to the given decimal places', () => {
    expect(utils.roundToDecimal(1.2345)).toBe(1.23);
    expect(utils.roundToDecimal(1.2345, 1)).toBe(1.2);
  });

  it('should round a string to the given decimal places', () => {
    expect(utils.roundToDecimal('1.2345')).toBe(1.23);
    expect(utils.roundToDecimal('1.2345', 1)).toBe(1.2);
  });
});

describe('utils.wait', () => {
  it('should wait for the given time', async () => {
    const start = Date.now();
    await utils.wait(100);
    expect(Date.now() - start).toBeGreaterThanOrEqual(100);
  });
});

describe('utils.downloadFile', () => {
  it('should download a file', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response('file content', {
        headers: { 'Content-Disposition': 'attachment; filename=file.txt' },
      }),
    );

    await utils.downloadFile('https://example.com/file.txt');
    expect(fetchSpy).toHaveBeenCalledWith('https://example.com/file.txt');
  });

  it('should retry downloading the file if it fails', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response('file content', {
        headers: { 'Content-Disposition': 'attachment; filename=file.txt' },
      }),
    );
    await utils.downloadFile('https://example.com/file.txt', 2);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});

describe('utils.humanize', () => {
  describe('basic functionality', () => {
    it('should return empty string for empty input', () => {
      expect(utils.humanize('')).toBe('');
    });

    it('should return empty string for null/undefined input', () => {
      expect(utils.humanize(null as any)).toBe('');
      expect(utils.humanize(undefined as any)).toBe('');
    });

    it('should capitalize first letter', () => {
      expect(utils.humanize('hello')).toBe('Hello');
    });

    it('should handle single word', () => {
      expect(utils.humanize('world')).toBe('World');
    });
  });

  describe('underscore handling', () => {
    it('should replace single underscore with space', () => {
      expect(utils.humanize('hello_world')).toBe('Hello world');
    });

    it('should replace multiple underscores with spaces', () => {
      expect(utils.humanize('hello_world_and_universe')).toBe(
        'Hello world and universe',
      );
    });

    it('should handle consecutive underscores', () => {
      expect(utils.humanize('hello__world')).toBe('Hello  world');
    });

    it('should handle leading underscore', () => {
      expect(utils.humanize('_hello_world')).toBe('Hello world');
    });

    it('should handle trailing underscore', () => {
      expect(utils.humanize('hello_world_')).toBe('Hello world');
    });
  });

  describe('camelCase handling', () => {
    it('should break camelCase words', () => {
      expect(utils.humanize('firstName')).toBe('First name');
    });

    it('should break PascalCase words', () => {
      expect(utils.humanize('FirstName')).toBe('First name');
    });

    it('should handle multiple camelCase words', () => {
      expect(utils.humanize('userProfileData')).toBe('User profile data');
    });

    it('should handle mixed camelCase and underscores', () => {
      expect(utils.humanize('user_profileData')).toBe('User profile data');
    });

    it('should handle camelCase with numbers', () => {
      expect(utils.humanize('user2Profile')).toBe('User2 profile');
    });
  });

  describe('acronym handling', () => {
    it('should handle JSONData pattern', () => {
      expect(utils.humanize('JSONData')).toBe('JSON data');
    });
  });

  describe('punctuation and sentence capitalization', () => {
    it('should capitalize after exclamation mark', () => {
      expect(utils.humanize('hello! world')).toBe('Hello! World');
    });

    it('should capitalize after question mark', () => {
      expect(utils.humanize('hello? world')).toBe('Hello? World');
    });

    it('should capitalize after period', () => {
      expect(utils.humanize('hello. world')).toBe('Hello. World');
    });

    it('should handle multiple punctuation marks', () => {
      expect(utils.humanize('hello! how? are. you')).toBe(
        'Hello! How? Are. You',
      );
    });

    it('should not capitalize after comma', () => {
      expect(utils.humanize('hello, world')).toBe('Hello, world');
    });
  });

  describe('escape syntax with square brackets', () => {
    it('should preserve escaped content', () => {
      expect(utils.humanize('user[McLaren]Profile')).toBe(
        'User McLaren profile',
      );
    });

    it('should handle multiple escaped segments', () => {
      expect(utils.humanize('firstName[Clinton-Agada]Data')).toBe(
        'First name Clinton-Agada data',
      );
    });

    it('should handle escaped content with spaces', () => {
      expect(utils.humanize('user[John Smith]Profile')).toBe(
        'User John Smith profile',
      );
    });

    it('should handle escaped content with special characters', () => {
      expect(utils.humanize("user[O'Connor]Data")).toBe("User O'Connor data");
    });

    it('should handle empty escaped content', () => {
      expect(utils.humanize('user[]Profile')).toBe('User profile');
    });

    it('should handle escaped content with underscores', () => {
      expect(utils.humanize('user[Mc_Laren]Profile')).toBe(
        'User Mc_Laren profile',
      );
    });

    it('should handle escaped content with camelCase', () => {
      expect(utils.humanize('user[McLaren]ProfileData')).toBe(
        'User McLaren profile data',
      );
    });
  });

  describe('complex combinations', () => {
    it('should handle mixed underscore, camelCase, and escaped content', () => {
      expect(utils.humanize('user_profile[McLaren]Data')).toBe(
        'User profile McLaren data',
      );
    });

    it('should handle acronyms with escaped content', () => {
      expect(utils.humanize('JSON[McLaren]Data')).toBe('JSON McLaren data');
    });

    it('should handle punctuation with escaped content', () => {
      expect(utils.humanize('hello[McLaren]! world')).toBe(
        'Hello McLaren! World',
      );
    });

    it('should handle multiple escaped segments with mixed content', () => {
      expect(utils.humanize('user[McLaren]Profile[Clinton-Agada]Data')).toBe(
        'User McLaren profile Clinton-Agada data',
      );
    });
  });

  describe('edge cases', () => {
    it('should handle single character', () => {
      expect(utils.humanize('a')).toBe('A');
    });

    it('should handle all uppercase', () => {
      expect(utils.humanize('HELLO')).toBe('HELLO');
    });

    it('should handle all lowercase', () => {
      expect(utils.humanize('hello')).toBe('Hello');
    });

    it('should handle numbers', () => {
      expect(utils.humanize('user123')).toBe('User123');
    });

    it('should handle numbers with underscores', () => {
      expect(utils.humanize('user_123')).toBe('User 123');
    });

    it('should handle special characters', () => {
      expect(utils.humanize('user@domain')).toBe('User@domain');
    });

    it('should handle bracket without content', () => {
      expect(utils.humanize('user[Profile')).toBe('User[Profile');
    });

    it('should handle whitespace around input', () => {
      expect(utils.humanize('  hello_world  ')).toBe('Hello world');
    });

    it('should handle multiple spaces', () => {
      expect(utils.humanize('hello   world')).toBe('Hello   world');
    });
  });

  describe('real-world examples', () => {
    it('should handle common variable names', () => {
      expect(utils.humanize('firstName')).toBe('First name');
      expect(utils.humanize('lastName')).toBe('Last name');
      expect(utils.humanize('emailAddress')).toBe('Email address');
      expect(utils.humanize('phoneNumber')).toBe('Phone number');
    });

    it('should handle API response fields', () => {
      expect(utils.humanize('userProfileData')).toBe('User profile data');
      expect(utils.humanize('JSONResponseData')).toBe('JSON response data');
      expect(utils.humanize('apiEndpointUrl')).toBe('Api endpoint url');
    });

    it('should handle database column names', () => {
      expect(utils.humanize('created_at')).toBe('Created at');
      expect(utils.humanize('updatedAt')).toBe('Updated at');
      expect(utils.humanize('is_active')).toBe('Is active');
    });

    it('should handle compound names with escape syntax', () => {
      expect(utils.humanize('user[McLaren]Profile')).toBe(
        'User McLaren profile',
      );
      expect(utils.humanize('customer[Clinton-Agada]Data')).toBe(
        'Customer Clinton-Agada data',
      );
      expect(utils.humanize("employee[O'Connor]Info")).toBe(
        "Employee O'Connor info",
      );
    });
  });
});

describe('utils.substring', () => {
  it('should return the string if it is shorter than the length', () => {
    expect(utils.truncate('Hello World', 20)).toBe('Hello World');
  });

  it('should return the string if it is equal to the length', () => {
    expect(utils.truncate('Hello World', 11)).toBe('Hello World');
  });

  it('should return the string with an ellipsis if it is longer than the length', () => {
    expect(utils.truncate('Hello World', 5)).toBe('Hello ...');
  });
});

describe('utils.emailToUserName', () => {
  it('should return the username from an email', () => {
    expect(utils.emailToUserName('example@email.com')).toBe('example');
  });

  it('should return the email if the username is not found', () => {
    expect(utils.emailToUserName('email.com')).toBe('email.com');
  });
});

describe('utils.getRandom', () => {
  it('should return random elements from an array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = utils.getRandom(arr, 3);
    expect(result).toHaveLength(3);
    result.forEach((item) => expect(arr).toContain(item));
  });

  it('should throw an error if the number of elements to take is more than the array length', () => {
    expect(() => utils.getRandom([1, 2, 3], 4)).toThrowError(
      'getRandom: more elements taken than available',
    );
  });
});

describe('utils.truncateMiddle', () => {
  it('should truncate the middle of the text if it is longer than the length', () => {
    expect(utils.truncateMiddle('Hello World', 5)).toBe('He…ld');
  });

  it('should return the text if it is shorter than the length', () => {
    expect(utils.truncateMiddle('Hello World', 20)).toBe('Hello World');
  });

  it('should return the text if it is equal to the length', () => {
    expect(utils.truncateMiddle('Hello World', 11)).toBe('Hello World');
  });
});

describe('utils.combinePaths', () => {
  it('should combine paths', () => {
    expect(utils.combinePaths('/path1', '/path2', '/path3')).toBe(
      'path1/path2/path3',
    );
  });

  it('should remove leading and trailing slashes', () => {
    expect(utils.combinePaths('/path1/', '/path2/', '/path3/')).toBe(
      'path1/path2/path3',
    );
  });

  it('should remove empty paths', () => {
    expect(utils.combinePaths('/path1', '', '/path3')).toBe('path1/path3');
  });
});
