document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".track-btn");
    const searchBar = document.getElementById("searchBar");
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    const loadingOverlay = document.getElementById("loadingOverlay");

    // Function to handle file download
    async function downloadFile(fileName) {
        try {
            // Show loading overlay
            loadingOverlay.style.display = "flex";

            // Define the server URL to fetch the file
            const response = await fetch(`/Macros/${encodeURIComponent(fileName)}`);

            if (!response.ok) throw new Error("File not found on the server");

            // Convert response to a Blob
            const blob = await response.blob();

            // Create a temporary download link
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName;

            // Append and click to trigger download
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

            alert(`Download completed successfully! Saved as ${fileName}`);
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            // Hide loading overlay
            loadingOverlay.style.display = "none";
        }
    }

    // Button Click Event for Download
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const fileName = button.getAttribute("data-file");
            if (fileName) {
                downloadFile(fileName);
            } else {
                alert("Error: No file specified.");
            }
        });
    });

    // Search Functionality
    searchBar.addEventListener("input", () => {
        const searchText = searchBar.value.toLowerCase();
        buttons.forEach(button => {
            const text = button.textContent.toLowerCase();
            button.style.display = text.includes(searchText) ? "block" : "none";
        });
    });

    // Live Clock & Date
    function updateDateTime() {
        const now = new Date();
        document.getElementById("date").textContent = now.toDateString();
        document.getElementById("clock").textContent = now.toLocaleTimeString();
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Dark Mode Toggle
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleDarkMode.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});
