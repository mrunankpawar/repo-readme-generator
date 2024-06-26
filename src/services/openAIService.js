const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; 

export const generateReadme = async (repoDetails) => {
  const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `
      Generate a detailed and professional README for the following GitHub repository:
        
        Repository Name: ${repoDetails.name}
        Description: ${repoDetails.description}
        Author: ${repoDetails.owner.login}
        URL: ${repoDetails.html_url}
        Primary Language: ${repoDetails.language}
        
        ## Sections
        Include the following sections in the README:
        1. **Introduction**: Write a concise and accurate introduction about the project. Ensure you understand the project's purpose and functionality by analyzing the provided repository details and running the project if necessary. Do not make assumptions based solely on the repository name.
        2. **Features**: List the key features of the project.
        3. **Installation**: Provide step-by-step instructions to install the project based on the tech stack.
        4. **Usage**: Explain how to use the project with examples.
        5. **Contributing**: Instructions for contributing to the project.
        6. **License**: Provide the license information.
        7. **Contact Information**: How to reach the author or maintainers.

        ## Badges
        Add appropriate badges for the following:
        - License (use MIT as default if not provided)
        - GitHub last commit
        - Issues
        - Forks
        - Stars
        - Language

        Ensure the README is well-structured, formatted, and easy to read with appropriate headings and bullet points.
      `,
      max_tokens: 500,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to generate README');
  }
  const data = await response.json();
  return data.choices[0].text;
};
