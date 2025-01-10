import express from "express";
import ffmpeg from "fluent-ffmpeg";
const app = express();

app.use(express.json());

app.post("/process-video", (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad request: No file path Found");
  }

  ffmpeg(inputFilePath)
    .outputOption("-vf", "scale=-1:360")
    .on("end", () => {
      res.status(200).send("Video Proccessing Finished");
    })
    .on("error", (err) => {
      console.log(`Error occured ${err.message}`);
      return res.status(500).send(`Internal Server error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.Port || 4000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
