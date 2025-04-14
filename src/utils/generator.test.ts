import { generateCode } from './generator';

describe('generateCode', () => {
  const body = '{"useId": 55}';
  const headers = [{ key: 'connection', value: 'keep-alive', enabled: true }];
  const url = 'https://exampleurl.com';
  const method = 'POST';
  // const getMethod = 'GET';

  it('should generate fetch code', () => {
    const result = generateCode('fetch', method, url, body, headers);
    const expectedResult = `fetch('${url}', {
  method: '${method}',
  body: '${body}',
  headers: {
    ${headers.map(({ key, value }) => `'${key}': '${value}'`).join(', ')}
  }
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error(error));`;
    expect(result).toBe(expectedResult);

    // const resultGetMethod = generateCode('fetch', getMethod, url, body, headers);
    // expect(resultGetMethod).toMatchSnapshot();
  });

  // it('should generate fetch code', () => {
  //   const result = generateCode('fetch', method, url, body, headers);
  //   expect(result).toMatchSnapshot();

  //   const resultGetMethod = generateCode('fetch', getMethod, url, body, headers);
  //   expect(resultGetMethod).toMatchSnapshot();
  // });

  // it('should generate xhr code', () => {
  //   const result = generateCode('xhr', method, url, body, headers);
  //   expect(result).toMatchSnapshot();

  //   const resultGetMethod = generateCode('xhr', getMethod, url, body, headers);
  //   expect(resultGetMethod).toMatchSnapshot();
  // });

  // it('should generate curl code', () => {
  //   const result = generateCode('curl', method, url, body, headers);
  //   expect(result).toMatchSnapshot();

  //   const resultGetMethod = generateCode('curl', getMethod, url, body, headers);
  //   expect(resultGetMethod).toMatchSnapshot();
  // });

  // it('should generate node code', () => {
  //   const result = generateCode('node', method, url, body, headers);
  //   expect(result).toMatchSnapshot();

  //   const resultGetMethod = generateCode('node', getMethod, url, body, headers);
  //   expect(resultGetMethod).toMatchSnapshot();

  //   const urlHttp = 'http://exampleurl.com';
  //   const resultHttp = generateCode('node', method, urlHttp, body, headers);
  //   expect(resultHttp).toMatchSnapshot();
  // });

  // it('should generate python code', () => {
  //   const result = generateCode('python', method, url, body, headers);
  //   expect(result).toMatchSnapshot();

  //   const resultGetMethod = generateCode('python', getMethod, url, body, headers);
  //   expect(resultGetMethod).toMatchSnapshot();
  // });

  // it('should generate java code', () => {
  //   const result = generateCode('java', method, url, body, headers);
  //   expect(result).toMatchSnapshot();

  //   const resultGetMethod = generateCode('java', getMethod, url, body, headers);
  //   expect(resultGetMethod).toMatchSnapshot();
  // });

  // it('should generate csharp code', () => {
  //   const result = generateCode('csharp', method, url, body, headers);
  //   expect(result).toMatchSnapshot();

  //   const resultGetMethod = generateCode('csharp', getMethod, url, body, headers);
  //   expect(resultGetMethod).toMatchSnapshot();
  // });

  // it('should generate go code', () => {
  //   const result = generateCode('go', method, url, body, headers);
  //   expect(result).toMatchSnapshot();

  //   const resultGetMethod = generateCode('go', getMethod, url, body, headers);
  //   expect(resultGetMethod).toMatchSnapshot();
  // });

  // it('should return an error message for unsupported runtime', () => {
  //   const result = generateCode('C', method, url, body, headers);
  //   expect(result).toBe('C not supported');
  // });
});
