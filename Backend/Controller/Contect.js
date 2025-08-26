const Contact = require("../Model/Contect");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ msg: "Message received successfully!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ msg: "Something went wrong. Please try again." });
  }
};

module.exports = { submitContactForm };
