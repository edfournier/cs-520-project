import { useState } from "react";
import Navbar from "./Navbar";
import { FaTimes, FaSearch } from "react-icons/fa"; 
import { useLocation } from 'react-router-dom';
import { fetchCourseResults } from "../api/courses";

function Course({ course, setCourse }) {
    return (
        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700 flex flex-col">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold">{course.name}</h1>
                <FaTimes onClick={() => setCourse(null)} className="cursor-pointer" />
            </div>
            <p className="text-sm text-gray-400 mb-2">{course.code}</p>
            <div className="mb-2">👍 {course.likes} | 👎 {course.dislikes}</div>
            <p className="flex-grow">{course.description}</p>
        </div>
    );
}

function Courses() {
    const location = useLocation();
    const [query, setQuery] = useState(location?.state?.course || "");
    const [course, setCourse] = useState(null); 
    const [results, setResults] = useState([]); 

    async function search() {
        // Fetch results and map each matched course to a search result tile
        const courses = await fetchCourseResults(query);
        setResults(courses.map((course) => (
            <li
                key={course.id}
                className="flex justify-between border border-gray-700 hover:bg-gray-700 rounded-lg p-3 cursor-pointer"
                onClick={() => setCourse(course)}
            >
                <span className="text-sm text-white">{course.name}</span>
                <span className="text-sm text-gray-400">{course.code}</span>
            </li>
        )));
    }

    return (
        <>
            <Navbar />
            <div className="max-w-xl mx-auto px-4 py-3">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-60"
                        placeholder="Search a course by code or name..."
                    />
                    <button onClick={search} className="ml-1">
                        <FaSearch />
                    </button>
                </div>
                {course 
                    // Either render the search results or the selected course
                    ? <Course course={course} setCourse={setCourse} />
                    : results.length > 0 && <ul className="space-y-1">{results}</ul>
                }
            </div>
        </>
    );
}

export default Courses;
