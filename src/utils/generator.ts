import { HeadersItem } from '~/widgets/headersEditor/editor';

export type TRuntime = 'node' | 'go' | 'python' | 'java' | 'csharp' | 'curl' | 'fetch' | 'xhr';

export function generateCode(runtime: TRuntime, method: string, url: string, body: string, headers: HeadersItem[]) {
  switch (runtime) {
    case 'fetch': {
      return `
fetch('${url}', {
  method: '${method}',
  body: '${body}',
  headers: {
    ${headers.map(({ key, value }) => `'${key}': '${value}'`).join(', ')}
  }
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error(error));`;
    }

    case 'xhr': {
      return `
const xhr = new XMLHttpRequest();
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
    }

    case 'curl': {
      const headersString = headers.map(({ key, value }) => `-H '${key}: ${value}'`).join(' ');

      return `curl -X ${method} ${url} ${headersString} -d '${body}'`;
    }

    case 'node': {
      const headersString = headers.map(({ key, value }) => `'${key}': '${value}'`).join(', ');

      return `
const https = require('https');

const options = {
  hostname: '${new URL(url).hostname}',
  port: ${new URL(url).port || (new URL(url).protocol === 'https:' ? 443 : 80)},
  path: '${new URL(url).pathname}',
  method: '${method}',
  headers: {
    ${headersString}
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

if (body) {
  req.write('${body}');
}

req.end();`;
    }

    case 'python': {
      const headersString = headers.map(({ key, value }) => `'${key}': '${value}'`).join(', ');

      return `
import requests

url = '${url}'
headers = {${headersString}}
body = '${body}'

response = requests.${method.toLowerCase()}(${url}, data=body, headers=headers)

print(response.text)`;
    }

    case 'java': {
      const headersString = headers.map(({ key, value }) => `.setHeader("${key}", "${value}")`).join('\n');

      return `
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

public class Main {
  public static void main(String[] args) throws IOException {
    URL obj = new URL("${url}");
    HttpURLConnection con = (HttpURLConnection) obj.openConnection();

    con.setRequestMethod("${method}");

    ${headersString}

    if ("${body}" != null) {
        con.setDoOutput(true);
        con.getOutputStream().write("${body}".getBytes());
    }

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
    }

    case 'csharp': {
      const headersString = headers
        .map(({ key, value }) => `httpWebRequest.Headers.Add("${key}", "${value}");`)
        .join('\n');

      return `
using System;
using System.IO;
using System.Net;

class Program
{{
  static void Main(string[] args)
  {{
    var httpWebRequest = (HttpWebRequest)WebRequest.Create("${url}");
    httpWebRequest.Method = "${method}";

    ${headersString}

    if ("${body}" != null)
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
    }

    case 'go': {
      const headersString = headers.map(({ key, value }) => `client.Header.Add("${key}", "${value}")`).join('\n');

      return `
package main

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

    ${headersString}

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
    }

    default:
      return `${runtime} not supported`;
  }
}
