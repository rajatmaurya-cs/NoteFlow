import React, { useState } from "react";
import { YoutubeTranscript } from "youtube-transcript";

function App() {
  const [url, setUrl] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to clean HTML entities like &#39; into readable text
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

//   const getTranscript = async () => {
//     const videoId = extractVideoId(url);
    
//     if (!videoId) {
//       alert("Please enter a valid YouTube URL");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setTranscript([]);

//     try {
//       const data = await YoutubeTranscript.fetchTranscript(videoId);
//       setTranscript(data);
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Failed to fetch transcript. Ensure the 'Allow CORS' extension is ON and the video has captions.");
//     } finally {
//       setLoading(false);
//     }
//   };

  // Inline Styles
  
const getTranscript = async () => {
  const videoId = extractVideoId(url);
  if (!videoId) return alert("Invalid URL");

  setLoading(true);
  setError("");
  
  try {
    // 1. We use a public CORS proxy
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const targetUrl = encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`);
    
    // 2. Fetch the page HTML through the proxy
    const response = await fetch(`${proxyUrl}${targetUrl}`);
    const data = await response.json();
    const html = data.contents;

    // 3. Extract the transcript metadata from the HTML
    // (This is what the library does, but we're doing it manually to bypass the error)
    const captionsMatch = html.match(/"captionTracks":\s*(\[.*?\])/);
    
    if (!captionsMatch) {
      throw new Error("No captions found for this video.");
    }

    const captionTracks = JSON.parse(captionsMatch[1]);
    const englishTrack = captionTracks.find(track => track.languageCode === 'en') || captionTracks[0];

    // 4. Fetch the actual XML transcript
    const transcriptResponse = await fetch(`${proxyUrl}${encodeURIComponent(englishTrack.baseUrl)}`);
    const transcriptData = await transcriptResponse.json();
    
    // 5. Parse the XML string into a list of lines
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(transcriptData.contents, "text/xml");
    const textNodes = xmlDoc.getElementsByTagName("text");
    
    const parsedTranscript = Array.from(textNodes).map(node => ({
      text: node.textContent,
      offset: node.getAttribute("start") * 1000 // converting to ms to match your code
    }));

    setTranscript(parsedTranscript);
  } catch (err) {
    console.error(err);
    setError("Error: YouTube is blocking this request. You might need a more robust backend proxy.");
  } finally {
    setLoading(false);
  }
};

  
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: "800px",
      margin: "40px auto",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      borderRadius: "12px",
    },
    input: {
      width: "70%",
      padding: "12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "16px",
      marginRight: "10px",
    },
    button: {
      padding: "12px 24px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#FF0000",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
    },
    transcriptBox: {
      marginTop: "30px",
      textAlign: "left",
      maxHeight: "500px",
      overflowY: "auto",
      padding: "15px",
      border: "1px solid #eee",
      borderRadius: "8px",
      backgroundColor: "#fdfdfd",
      lineHeight: "1.6",
    },
    timestamp: {
      color: "#888",
      fontSize: "12px",
      marginRight: "10px",
      display: "inline-block",
      width: "45px",
    }
  };

  return (
    <div style={styles.container}>
      <h2>🎥 YouTube Transcript Generator</h2>
      <p style={{ color: "#666" }}>Paste a link below to extract the text.</p>
      
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <button onClick={getTranscript} style={styles.button} disabled={loading}>
          {loading ? "Loading..." : "Get Transcript"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {transcript.length > 0 && (
        <div style={styles.transcriptBox}>
          {transcript.map((line, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <span style={styles.timestamp}>
                {Math.floor(line.offset / 1000)}s
              </span>
              <span>{decodeHTML(line.text)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;