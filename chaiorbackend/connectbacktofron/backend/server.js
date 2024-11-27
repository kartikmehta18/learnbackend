import express from "express";

const app = express();
const port = process.env.PORT || 3000;
//bad practice 
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// get a list of 5 jokes

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      content:
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
    }, 
    {
      id: 2,
      content:
        "What do you get when you cross a snowman and a vampire? Frostbite.",
    },
    {
      id: 3,
      content: "What do you call a belt made out of watches? A waist of time.",
    },
    {
      id: 4,
      content:
        "Why don't scientists trust atoms? Because they make up everything.",
    },
    {
      id: 5,
      content:
        "I invented a new word! Plagiarism!",
    },
  ]; 
res.send(jokes);


});

app.listen(port, () => {
  console.log("server is running on port 3000");
});
