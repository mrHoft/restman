import { getCookie, getLifespan, setCookie } from './cookie';

describe('cookie', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('should return the correct lifespan', () => {
    Date.now = jest.fn(() => new Date('2025-04-12T00:00:00').getTime());
    expect(getLifespan(1)).toBe('Sat, 12 Apr 2025 19:00:00 GMT');
  });

  it('should set correct cookie', () => {
    setCookie({ testKey: 'testValue' });
    expect(document.cookie).toContain('testKey=testValue');
  });

  it('should get correct cookie', () => {
    setCookie({ testKey: 'testValue' });
    const value = getCookie('testKey');
    expect(value).toBe('testValue');
  });

  it('should return an empty string if the cookie does not exist', () => {
    const value = getCookie('randomKey');
    expect(value).toBe('');
  });
});
