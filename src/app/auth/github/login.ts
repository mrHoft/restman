const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? 'unknown';
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI ?? 'http://localhost:3000/auth/github/callback';

export function initiateGitHubOAuth() {
  const scope = 'user:email,read:org';
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}`;

  window.location.href = url;
}
