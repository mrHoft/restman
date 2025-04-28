import { prettifyString, prettyJSON, sanitize } from './pretty';

describe('Prettify Utilities', () => {
  describe('sanitize', () => {
    it('should replace < and > with &lt; and &gt;', () => {
      expect(sanitize('<div>Test</div>')).toBe('&lt;div&gt;Test&lt;/div&gt;');
    });
  });

  describe('PrettyJsonString', () => {
    it('should return JSON format if JSON is valid', () => {
      const value = JSON.stringify({ name: 'test', value: 5 });
      const result = prettyJSON(value);

      expect(result.format).toBe('JSON');

      expect(result.result.length).toBe(4);
    });

    it('should return plain format if JSON is invalid', () => {
      const value = '{ invalid: json }';
      const result = prettyJSON(value);

      expect(result.format).toBe('plain');

      expect(result.result[0]).toContain('{ invalid: json }');
    });
  });

  describe('prettifyString', () => {
    it('should format JSON strings', () => {
      const result = prettifyString('{"id": 5, "title": "test"}');

      expect(result.format).toBe('JSON');

      expect(result.result.length).toBe(4);
    });

    it('should format HTML strings', () => {
      const result = prettifyString('<div>test</div>');

      expect(result.format).toBe('XML');

      expect(result.result.some(line => line.includes('&lt;div&gt;'))).toBe(true);
    });

    it('should handle plain text strings', () => {
      const result = prettifyString('plain text');

      expect(result.format).toBe('plain');

      expect(result.result.length).toBe(1);
    });
  });
});
