import { useState } from "react";
import { fetchRepoDetails } from "./services/githubService";
import { generateReadme } from "./services/openAIService";
import { FaGithub } from "react-icons/fa";
import LaunchSVG from './assets/Launch_SVG_Dark.svg';
import "./App.css";
import ReactMarkdown from 'react-markdown';

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
      <div className="mx-auto container p-5">
      <div className="flex justify-center items-center pb-5">
      <div className="image-container">
        <img className="svg-image" src={LaunchSVG} alt="Launch SVG"/>
        <FaGithub className="github-logo text-5xl" />
      </div>
      </div>
        <h1 className="text-4xl font-bold mb-4 pb-5">GitHub Repo README Generator</h1>
        <p className="text-xl font-medium mb-4 pb-5">Effortlessly generate a README file for your project by simply entering GitHub username and repository name. </p>
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 mr-2 mt-3 bg-inherit rounded-md text-purple-300 font-semibold" 
            placeholder="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 mr-2 mt-3 bg-inherit rounded-md text-purple-300 font-semibold"
            placeholder="Repository Name"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
          <button
            className="mt-3 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-gray-200 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-white p-2 font-semibold"
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
            <ReactMarkdown  className="bg-indigo-950 py-2 px-10 rounded-md markdown text-left">{readme}</ReactMarkdown >
          </div>
          </div>
        )}
        
        <footer>
        <h2 className="text-md font-bold mb-4 pb-5 pt-5">Developed with &#128151; by <a className="text-md font-bold" href="https://www.linkedin.com/in/mrunankpawar/" target="__blank">Mrunank Pawar</a></h2>
        </footer>
      </div>
  );
}

export default App;
