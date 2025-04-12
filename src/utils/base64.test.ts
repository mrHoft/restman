import { base64Decode, base64Encode } from './base64';

describe('base64', () => {
  it('encodes a string', () => {
    const value = 'Test string';
    const encodedValue = 'VGVzdCBzdHJpbmc=';
    const encoded = base64Encode(value);
    expect(encoded).toEqual(encodedValue);
  });

  it('decodes a string', () => {
    const value = 'VGVzdCBzdHJpbmc=';
    const decodedValue = 'Test string';
    const decoded = base64Decode(value);

    expect(decoded).toEqual(decodedValue);
  });

  it('encodes and decodes a string with russian letters', () => {
    const value = 'Строка с русскими символами';
    const encoded = base64Encode(value);
    const decoded = base64Decode(encoded);

    expect(decoded).toEqual(value);
  });
});
