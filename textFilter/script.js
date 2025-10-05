// Function to replace non-English characters
document.getElementById("replaceButton").addEventListener("click", function () {
  // Get input text
  const inputText = document.getElementById("userInput").value;

  // Regular expression to keep only English alphabets (A-Z and a-z)
  const filteredText = inputText.replace(/[^a-zA-Z\s]/g, "");

  // Display the filtered text
  document.getElementById("outputText").value = filteredText;

  // Show the result container
  document.getElementById("resultContainer").style.display = "block";
});

// Function to copy text
document.getElementById("copyButton").addEventListener("click", function () {
  const outputText = document.getElementById("outputText");

  // Select the text and copy it to clipboard
  outputText.select();
  outputText.setSelectionRange(0, 9999999); // For mobile compatibility
  document.execCommand("copy");

  // Alert user about successful copy
  alert("Text copied to clipboard!");
});
