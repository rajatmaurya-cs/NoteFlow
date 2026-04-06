import React, { useState, useMemo } from "react";
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

            <div className="flex items-center justify-center space-x-6 mt-10">
                <button
                    onClick={() => console.log(content)}
                    className="px-6 py-3 bg-blue-700 text-white rounded-2xl"
                >
                    Submit
                </button>

                <img
                        onClick={()=>setContent('')}
                    src="https://img.icons8.com/3d-fluency/94/trash.png"
                    alt="trash"
                    className="w-15 h-15 object-contain"
                />
            </div>

            <div style={{ marginTop: "30px" }}>

                <h3>Preview:</h3>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>

        </div>
    );
};

export default Notepad;