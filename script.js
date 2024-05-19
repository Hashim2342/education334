// Array to store open tabs
let openTabs = [];

// Function to navigate to a URL
function navigate() {
    let url = document.getElementById("url-input").value;
    // Update browser content with the entered URL
    document.getElementById("browser-content").innerHTML = `<iframe src="${url}" width="100%" height="100%"></iframe>`;
    // Add the URL to open tabs
    openTabs.push(url);
    // Update tabs display
    updateTabs();
}

// Function to update the display of tabs
function updateTabs() {
    let tabsContainer = document.getElementById("tabs");
    tabsContainer.innerHTML = ""; // Clear previous tabs

    openTabs.forEach((url, index) => {
        let tabElement = document.createElement("div");
        tabElement.classList.add("tab");
        tabElement.innerHTML = `
            <span>${index + 1}</span>
            <span>${url}</span>
            <button onclick="closeTab(${index})"><i class="fas fa-times"></i></button>
        `;
        tabsContainer.appendChild(tabElement);
    });
}

// Function to close a tab
function closeTab(index) {
    openTabs.splice(index, 1); // Remove URL from openTabs array
    // Update browser content if the closed tab was active
    if (index === openTabs.length) {
        let lastActiveUrl = openTabs[index - 1];
        document.getElementById("browser-content").innerHTML = `<iframe src="${lastActiveUrl}" width="100%" height="100%"></iframe>`;
    }
    updateTabs(); // Update tabs display
}

// Initialize tabs display
updateTabs();
// Function to toggle fullscreen mode
function toggleFullscreen() {
    let browserContent = document.getElementById("browser-content");
    if (!document.fullscreenElement) {
        // If browser content is not in fullscreen, enter fullscreen mode
        if (browserContent.requestFullscreen) {
            browserContent.requestFullscreen();
        } else if (browserContent.mozRequestFullScreen) { /* Firefox */
            browserContent.mozRequestFullScreen();
        } else if (browserContent.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            browserContent.webkitRequestFullscreen();
        } else if (browserContent.msRequestFullscreen) { /* IE/Edge */
            browserContent.msRequestFullscreen();
        }
    } else {
        // If browser content is already in fullscreen, exit fullscreen mode
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}