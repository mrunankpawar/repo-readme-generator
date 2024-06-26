import { useState } from "react";
import { fetchRepoDetails } from "./services/githubService";
import { generateReadme } from "./services/openAIService";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchRepoDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const details = await fetchRepoDetails(username, repo);
      const generatedReadme = await generateReadme(details);
      setReadme(generatedReadme);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    const readmeText = readme.trim();
    if (readmeText) {
      navigator.clipboard.writeText(readmeText)
        .then(() => {
          alert("README copied to clipboard!");
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 pb-5">GitHub Repo README Generator</h1>
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 mr-2 bg-inherit rounded-md text-purple-300 font-semibold" 
            placeholder="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 mr-2 bg-inherit rounded-md text-purple-300 font-semibold"
            placeholder="Repository Name"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
          <button
            className="rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-gray-200 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-white p-2 font-semibold"
            onClick={handleFetchRepoDetails}
            disabled={loading}
          > 
            {loading ? "Loading..." : "Generate README"}
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {readme && (
          <div>
            <h2 className="text-xl font-bold m-3 pt-5">Generated README</h2>
            <div className="relative">
            <button
              className="absolute top-2 right-2 bg-white text-gray-700 p-2 rounded-md hover:bg-gray-200 border-none"
              onClick={handleCopyToClipboard}
            >
              Copy
            </button>
            <pre className="bg-gray-700 p-2 whitespace-pre-wrap rounded-md">{readme}</pre>
          </div>
          </div>
        )}
        <footer>
        <h2 className="text-md font-bold mb-4 pb-5 pt-5">Developed with &#128151; by Mrunank Pawar</h2>
        </footer>
      </div>
  );
}

export default App;
