import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  const fetchVideoInfo = async () => {
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    setLoading(true);
    setError("");
    setVideoInfo(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/video-info",
        { url },
      );
      setVideoInfo(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch video info");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (quality, format) => {
    setDownloading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/download",
        { url, quality, format },
        { responseType: "blob" },
      );

      // Create download link
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      const extension = format === "audio" ? "mp3" : "mp4";
      link.download = `${videoInfo.title.substring(0, 50)}.${extension}`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError("Failed to download video");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>🎥 YouTube Downloader</h1>
        <p className="subtitle">
          Download YouTube videos in different qualities
        </p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchVideoInfo()}
            className="url-input"
          />
          <button
            onClick={fetchVideoInfo}
            disabled={loading}
            className="fetch-btn"
          >
            {loading ? "Loading..." : "Get Video"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {videoInfo && (
          <div className="video-info">
            <img
              src={videoInfo.thumbnail}
              alt={videoInfo.title}
              className="thumbnail"
            />
            <h2>{videoInfo.title}</h2>
            <p className="duration">
              Duration: {Math.floor(videoInfo.duration / 60)}:
              {(videoInfo.duration % 60).toString().padStart(2, "0")}
            </p>

            <div className="download-options">
              <h3>📹 Video Quality</h3>
              <div className="quality-buttons">
                {videoInfo.qualities.map((quality) => (
                  <button
                    key={quality}
                    onClick={() => handleDownload(quality, "video")}
                    disabled={downloading}
                    className="quality-btn"
                  >
                    {downloading ? "⏳" : "⬇️"} {quality}
                  </button>
                ))}
              </div>

              {videoInfo.hasAudio && (
                <>
                  <h3>🎵 Audio Only</h3>
                  <button
                    onClick={() => handleDownload(null, "audio")}
                    disabled={downloading}
                    className="audio-btn"
                  >
                    {downloading ? "⏳ Downloading..." : "⬇️ Download MP3"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <footer>
          <p>Made with ❤️</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
