const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.use(bodyParser.json());

// Chatbot response function
function chatbotResponse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return "Hello! How can I help you today?";
    }
    if (lowerCaseMessage.includes('issue') || lowerCaseMessage.includes('problem')) {
        return "Can you please describe the issue you're facing?";
    }
    if (lowerCaseMessage.includes('how is weather outside') || lowerCaseMessage.includes('climate condition')) {
        return "too cool";
    }
    if (lowerCaseMessage.includes('thank you')) {
        return "You're welcome! Let me know if you need anything else.";
    }
    return "I'm sorry, I didn't quite understand that. Can you please rephrase?";
}

// Endpoint for chatbot messages
app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    const botReply = chatbotResponse(userMessage);
    res.json({ reply: botReply });
});

// Redirect the root URL to index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});