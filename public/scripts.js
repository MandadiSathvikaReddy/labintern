// Get the necessary DOM elements
const chatbox = document.getElementById("chatbox");
const inputBox = document.getElementById("input-box");
const sendBtn = document.getElementById("send-btn");

// Function to add messages to the chatbox
function addMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender); // Add user or bot class
  messageElement.innerHTML = `<span>${
    sender === "user" ? "You" : "Bot"
  }: </span>${message}`;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
}

// Handle sending messages when the button is clicked
sendBtn.onclick = async () => {
  const userMessage = inputBox.value.trim();

  if (userMessage === "") return; // Ignore empty input

  addMessage(userMessage, "user"); // Display the user's message
  inputBox.value = ""; // Clear input box

  // Send the user message to the backend for bot response
  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    const botReply = data.reply;

    addMessage(botReply, "bot"); // Display the bot's response
  } catch (error) {
    addMessage("Sorry, something went wrong. Please try again.", "bot");
  }
};

// Optionally, handle "Enter" key press for sending messages
inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});
