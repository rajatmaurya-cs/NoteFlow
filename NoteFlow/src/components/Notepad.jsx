import React, { useState,  useMemo } from "react";
import JoditEditor from "jodit-react";

const Notepad = () => {


  
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
      
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)} 
      />

      <button
        onClick={() => console.log(content)}
       

        className="mt-8 px-8 py-5 bg-blue-700 text-black rounded-2xl"
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

export default Notepad;