const GITHUB_API_BASE_URL = 'https://api.github.com';

export const fetchRepoDetails = async (username, repo) => {
  const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${username}/${repo}`);
  if (!response.ok) {
    throw new Error('Failed to fetch repository details');
  }
  return response.json();
};
