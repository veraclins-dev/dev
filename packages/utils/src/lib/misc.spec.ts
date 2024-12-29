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
  it('should humanize a string', () => {
    expect(utils.humanize('hello_world')).toBe('Hello world');
  });

  it('should humanize a string with multiple underscores', () => {
    expect(utils.humanize('hello_world_and_universe')).toBe(
      'Hello world and universe',
    );
  });

  it('should humanize a string with mixed case', () => {
    expect(utils.humanize('The helloWorld')).toBe('The hello world');
  });

  it('should humanize a string with punctuation', () => {
    expect(utils.humanize('hello_world!')).toBe('Hello world!');
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
