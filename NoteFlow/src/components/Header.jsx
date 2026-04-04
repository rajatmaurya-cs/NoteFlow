import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Header = () => {

  const editor = useRef(null);
  
  const [content, setContent] = useState("");

  const config = useMemo(() => ({
    readonly: false,
    placeholder: "Start typing...",
    height: 400,
  }), []);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>Jodit Editor in React</h2>

      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)} // ✅ best practice
      />

      <button
        onClick={() => console.log(content)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "orange",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      <div style={{ marginTop: "30px" }}>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default Header;