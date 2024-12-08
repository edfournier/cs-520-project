import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

function Pager({ onLeft, onRight, leftOff, rightOff }) {
    return (
        <div className="flex justify-center mt-4">
            <button aria-label="Back" disabled={leftOff} onClick={onLeft} className="mr-1 disabled:opacity-50">
                <IoArrowBackSharp />
            </button>
            <button aria-label="Next"disabled={rightOff} onClick={onRight} className="ml-1 disabled:opacity-50">
                <IoArrowForwardSharp />
            </button>
        </div>
    );
}

export default Pager;