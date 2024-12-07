function createExtensionButton(course) {
    const button = document.createElement("button");
    button.textContent = "🔍"; 
    button.style.marginLeft = "10px";
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();

        // Tell background script to open popup with this course
        chrome.runtime.sendMessage({ type: "open-popup", course: course.title });
    });
    return button;
}

function createRatingsDisplay(course) {
    // TODO: hit API to get course likes/dislikes
    const likes = 0;
    const dislikes = 0;

    // Create a display for the two spans
    const display = document.createElement("span");
    display.style.display = "inline-flex"; 
    display.style.alignItems = "center"; 
    display.style.padding = "4px 10px";
    display.style.backgroundColor = "#4c6ef5"; 
    display.style.color = "white"; 
    display.style.borderRadius = "12px"; 
    display.style.fontSize = "14px";
    display.style.fontWeight = "bold"; 
    display.style.marginLeft = "10px"; 
    display.style.cursor = "default";

    const likesSpan = document.createElement("span");
    likesSpan.textContent = `${likes} 👍`;

    const dislikesSpan = document.createElement("span");
    dislikesSpan.textContent = `${dislikes} 👎`;
    dislikesSpan.style.marginLeft = "10px"; 

    // Append both spans inside the display
    display.appendChild(likesSpan);
    display.appendChild(dislikesSpan);

    return display;
}

function embed() {
    console.log("Parsing course search results...");
    const courses = []
    const first = document.getElementById("PTS_RSLTS_LIST$0_row_0"); // First search result
    if (first) {
        const results = first.parentElement;
        results.childNodes.forEach((result) => 
            courses.push({ 
                // Parse course title, removing excess whitespace
                title: result.querySelector("p[hidden]").textContent.trim().replace(/\s+/g, ' '), 
                element: result.querySelector(".ps-link")
            })
        );
    }

    console.log(`Embedding content into ${courses.length} listings...`);
    for (const course of courses) {
        course.element.appendChild(createRatingsDisplay(course));
        course.element.appendChild(createExtensionButton(course));
    }
}

const title = document.getElementById("PT_PAGETITLE1lbl");
if (title && title.textContent === "Class Search Results") {
    // Embed and re-embed whenever user changes filters
    embed();
    const filters = document.querySelector("table.ps_grid-flex[title=\"Selected Filters\"]");
    const observer = new MutationObserver(embed);

    // Monitor the ancestor because SPIRE deletes the filters element
    // Unholy chaining is required because element IDs change per session
    observer.observe(filters.parentElement.parentElement.parentElement.parentElement, {
        childList: true,   
        subtree: true,     
        characterData: true, 
        attributes: true
    });
}