import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from the 'src' directory
app.use(express.static(join(__dirname, "src")));

// Serve index.html for the root route or other specific routes
app.get(["/", "/home", "/songs", "/favorites"], (req, res) => {
  res.sendFile(join(__dirname, "src", "index.html"));
});

// Set up other routes for specific pages if necessary
app.get("/account.html", (req, res) => {
  res.sendFile(join(__dirname, "src", "account.html"));
});

// Catch-all route for non-existing pages (404 handling)
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
