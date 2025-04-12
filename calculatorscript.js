
// This function updates the visibility of input fields based on the selected data range from dropdown
function updateInputFields() {
    const selection = document.getElementById("dataRange").value;
    const avgDiv = document.getElementById("averageInputs");
    const periodDiv = document.getElementById("periodInputs");

    if (selection === "average") {
        avgDiv.style.display = "block";
        periodDiv.style.display = "none";
    } else if (selection === "period") {
        avgDiv.style.display = "none";
        periodDiv.style.display = "block";
    }
}

// Optional: set the correct visibility when the page loads
window.onload = function() {
    updateInputFields();
};
