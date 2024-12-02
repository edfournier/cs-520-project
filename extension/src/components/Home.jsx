import { useState } from "react";
import Navbar from "./Navbar";
import { FaTimes, FaPlus } from "react-icons/fa"; 

function Home() {
    const [tags, setTags] = useState([]); 
    const [tag, setTag] = useState(""); // Captures user input

    function addTag() {
        // Ensure tag isn't duplicate or blank
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
        }
        setTag(""); 
    }

    function removeTag(target) {
        setTags(tags.filter(tag => tag !== target));
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-2 py-3">
                <div className="flex justify-center">
                    <input
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className="w-60"
                        placeholder="Add a tag describing your interests..."
                    />
                    <button onClick={addTag} className="ml-1">
                        <FaPlus />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => (
                        <div
                            key={tag} 
                            className="px-4 py-2 rounded-full border-gray-300 bg-gray-200 font-medium flex items-center gap-2"
                        >
                            <FaTimes onClick={() => removeTag(tag)} className="cursor-pointer" /> {tag}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
