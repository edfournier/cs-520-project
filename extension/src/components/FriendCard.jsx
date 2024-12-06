import { FaTimes } from "react-icons/fa"; 

// TODO: highlight classes that you have common interests

function FriendCard({ friend, onClose, onUnfriend }) {
    // TODO: api call that gets the friends should return this data
    const interests = [
        { name: "Data Structures", code: "CS 187" },
        { name: "Algorithms", code: "CS 201" },
        { name: "Operating Systems", code: "CS 350" },
        { name: "Machine Learning", code: "CS 500" }
    ];

    return (
        <div className="card">
            <div className="flex justify-between">
                <p className="text-xs text-gray-400">{friend.email}</p>
                <FaTimes onClick={onClose} className="cursor-pointer hover:text-indigo-600" />
            </div>
            <h2 className="mb-3 mt-2">{friend.name}'s Interests</h2>
            <ul className="overflow-y-auto max-h-36 mb-6 space-y-1 mr-1 ml-2">
                {interests.length === 0 
                    ? <span className="font-semibold text-indigo-200">{friend.name} has no interests!</span>
                    : interests.map((interest, i) => 
                        <li key={i}>
                            <span className="font-semibold text-indigo-200">{interest.name}</span>
                            <span className="text-gray-400"> {interest.code}</span>
                        </li>
                    )
                }
            </ul>
            <div className="flex justify-center">
                <button onClick={onUnfriend} className="w-20 hover:bg-red-500">
                    Unfriend
                </button>
            </div>
        </div>
    );
}

export default FriendCard;