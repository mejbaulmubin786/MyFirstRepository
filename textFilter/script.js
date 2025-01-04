// Function to filter text
document.getElementById('filterButton').addEventListener('click', function() {
    // Get input text
    const inputText = document.getElementById('inputText').value;
    
    // Regular expression to keep only English alphabets (A-Z and a-z)
    const filteredText = inputText.replace(/[^a-zA-Z\s]/g, '');
    
    // Display the filtered text
    document.getElementById('outputText').value = filteredText;
});
