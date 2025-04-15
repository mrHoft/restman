import { generateCode } from './generator';

describe('generateCode', () => {
  const body = '{"useId": 55}';
  const headers = [{ key: 'connection', value: 'keep-alive', enabled: true }];
  const url = 'https://exampleurl.com';
  const method = 'POST';
  const getMethod = 'GET';

  it('should generate fetch code', () => {
    const result = `fetch('${url}', {
  method: '${method}',
  body: '${body}',
  headers: {
    ${headers.map(({ key, value }) => `'${key}': '${value}'`).join(', ')}
  }
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error(error));`;

    expect(generateCode('fetch', method, url, body, headers)).toBe(result);

    const resultGetMethod = `fetch('${url}', {
  method: '${getMethod}',
  
  headers: {
    ${headers.map(({ key, value }) => `'${key}': '${value}'`).join(', ')}
  }
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error(error));`;

    expect(generateCode('fetch', getMethod, url, body, headers)).toBe(resultGetMethod);
  });

  it('should generate xhr code', () => {
    const result = `const xhr = new XMLHttpRequest();
xhr.open('${method}', '${url}', true);

${headers.map(({ key, value }) => `xhr.setRequestHeader('${key}', '${value}');`).join('\n')}

xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    } else {
      console.error('Error:', xhr.statusText);
    }
  }
};

xhr.send('${body}');`;

    expect(generateCode('xhr', method, url, body, headers)).toBe(result);

    const resultGetMethod = `const xhr = new XMLHttpRequest();
xhr.open('${getMethod}', '${url}', true);

${headers.map(({ key, value }) => `xhr.setRequestHeader('${key}', '${value}');`).join('\n')}

xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.log(xhr.responseText);
    } else {
      console.error('Error:', xhr.statusText);
    }
  }
};

xhr.send();`;

    expect(generateCode('xhr', getMethod, url, body, headers)).toBe(resultGetMethod);
  });

  it('should generate curl code', () => {
    const result = `curl -X ${method} ${url} -H '${headers[0].key}: ${headers[0].value}' --data '${body}'`;

    expect(generateCode('curl', method, url, body, headers)).toBe(result);

    const resultGetMethod = `curl -X ${getMethod} ${url} -H '${headers[0].key}: ${headers[0].value}'`;

    expect(generateCode('curl', getMethod, url, body, headers)).toBe(resultGetMethod);
  });

  it('should generate node code', () => {
    const result = `const https = require('https');

const options = {
  hostname: '${new URL(url).hostname}',
  port: ${new URL(url).port || (new URL(url).protocol === 'https:' ? 443 : 80)},
  path: '${new URL(url).pathname}',
  method: '${method}',
  headers: {
    '${headers[0].key}': '${headers[0].value}'
  }
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write('${body}');

req.end();`;

    expect(generateCode('node', method, url, body, headers)).toBe(result);

    const resultGetMethod = `const https = require('https');

const options = {
  hostname: '${new URL(url).hostname}',
  port: ${new URL(url).port || (new URL(url).protocol === 'https:' ? 443 : 80)},
  path: '${new URL(url).pathname}',
  method: '${getMethod}',
  headers: {
    '${headers[0].key}': '${headers[0].value}'
  }
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});



req.end();`;

    expect(generateCode('node', getMethod, url, body, headers)).toBe(resultGetMethod);
  });

  it('should generate python code', () => {
    const result = `import requests

url = '${url}'
headers = {'${headers[0].key}': '${headers[0].value}'}
body = '${body}'

response = requests.${method.toLowerCase()}(${url}, data=body, headers=headers)

print(response.text)`;

    expect(generateCode('python', method, url, body, headers)).toBe(result);

    const resultGetMethod = `import requests

url = '${url}'
headers = {'${headers[0].key}': '${headers[0].value}'}


response = requests.${getMethod.toLowerCase()}(${url}, data=body, headers=headers)

print(response.text)`;

    expect(generateCode('python', getMethod, url, body, headers)).toBe(resultGetMethod);
  });

  it('should generate java code', () => {
    const result = `import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class Main {
  public static void main(String[] args) throws IOException {
    URL obj = new URL("${url}");
    HttpURLConnection con = (HttpURLConnection) obj.openConnection();

    con.setRequestMethod("${method}");

    .setHeader("${headers[0].key}", "${headers[0].value}")
    con.setDoOutput(true); con.getOutputStream().write("${body}".getBytes());

    int responseCode = con.getResponseCode();
    System.out.println("Response Code: " + responseCode);

    java.io.BufferedReader in = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
    }
    in.close();

    System.out.println("Response Content: " + content.toString());
  }
}`;
    expect(generateCode('java', method, url, body, headers)).toBe(result);

    const resultGetMethod = `import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class Main {
  public static void main(String[] args) throws IOException {
    URL obj = new URL("${url}");
    HttpURLConnection con = (HttpURLConnection) obj.openConnection();

    con.setRequestMethod("${getMethod}");

    .setHeader("${headers[0].key}", "${headers[0].value}")
    

    int responseCode = con.getResponseCode();
    System.out.println("Response Code: " + responseCode);

    java.io.BufferedReader in = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuffer content = new StringBuffer();
    while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
    }
    in.close();

    System.out.println("Response Content: " + content.toString());
  }
}`;
    expect(generateCode('java', getMethod, url, body, headers)).toBe(resultGetMethod);
  });

  it('should generate csharp code', () => {
    const result = `using System;
using System.IO;
using System.Net;

class Program
{{
  static void Main(string[] args)
  {{
    var httpWebRequest = (HttpWebRequest)WebRequest.Create("${url}");
    httpWebRequest.Method = "${method}";

    httpWebRequest.Headers.Add("${headers[0].key}", "${headers[0].value}");
    
    {{
        var byteArray = System.Text.Encoding.UTF8.GetBytes("${body}");
        httpWebRequest.ContentLength = byteArray.Length;
        using (var stream = httpWebRequest.GetRequestStream())
        {{
            stream.Write(byteArray, 0, byteArray.Length);
        }}
    }}

    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
    Console.WriteLine("Response Status Code: " + httpResponse.StatusCode);
    Console.WriteLine("Response Status Description: " + httpResponse.StatusDescription);

    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
    {{
        Console.WriteLine("Response Content: " + streamReader.ReadToEnd());
    }}
  }}
}}`;

    expect(generateCode('csharp', method, url, body, headers)).toBe(result);

    const resultGetMethod = `using System;
using System.IO;
using System.Net;

class Program
{{
  static void Main(string[] args)
  {{
    var httpWebRequest = (HttpWebRequest)WebRequest.Create("${url}");
    httpWebRequest.Method = "${getMethod}";

    httpWebRequest.Headers.Add("${headers[0].key}", "${headers[0].value}");
    

    var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
    Console.WriteLine("Response Status Code: " + httpResponse.StatusCode);
    Console.WriteLine("Response Status Description: " + httpResponse.StatusDescription);

    using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
    {{
        Console.WriteLine("Response Content: " + streamReader.ReadToEnd());
    }}
  }}
}}`;

    expect(generateCode('csharp', getMethod, url, body, headers)).toBe(resultGetMethod);
  });

  it('should generate go code', () => {
    const result = `package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, err := http.NewRequest("${method}", "${url}", []byte("${body}"))
    if err != nil {
        panic(err)
    }

    client.Header.Add("${headers[0].key}", "${headers[0].value}")

    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    bodyBytes, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }
    fmt.Println("Response Status Code:", resp.StatusCode)
    fmt.Println("Response Body:", string(bodyBytes))
}`;

    expect(generateCode('go', method, url, body, headers)).toBe(result);

    const resultGetMethod = `package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    client := &http.Client{}
    req, err := http.NewRequest("${getMethod}", "${url}")
    if err != nil {
        panic(err)
    }

    client.Header.Add("${headers[0].key}", "${headers[0].value}")

    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    bodyBytes, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }
    fmt.Println("Response Status Code:", resp.StatusCode)
    fmt.Println("Response Body:", string(bodyBytes))
}`;

    expect(generateCode('go', getMethod, url, body, headers)).toBe(resultGetMethod);
  });

  it('should return an error message for unsupported runtime', () => {
    const result = generateCode('C', method, url, body, headers);
    expect(result).toBe('C not supported');
  });
});
