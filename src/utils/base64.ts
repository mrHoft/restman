export const base64Encode = (value: string) => btoa(value);

export const base64Decode = (value: string) => atob(decodeURIComponent(value));
