import ytdl from "ytdl-core";
import fs from "fs";
import path from "path";

async function downloadVideo(url, outputDir = "./downloads") {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const videoInfo = await ytdl.getInfo(url);
    const videoTitle = videoInfo.videoDetails.title.replace(/[/\\?%*:|"<>]/g, "_");
    const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: "highestvideo" });

    if (!videoFormat) {
      throw new Error("No suitable video format found.");
    }

    const outputPath = path.join(outputDir, `${videoTitle}.${videoFormat.container}`);
    const videoStream = ytdl.downloadFromInfo(videoInfo, { format: videoFormat });

    videoStream.pipe(fs.createWriteStream(outputPath));

    videoStream.on("progress", (chunkLength, downloaded, total) => {
      const percent = downloaded / total * 100;
      console.log(`Downloading: ${videoTitle} - ${percent.toFixed(2)}%`);
    });

    videoStream.on("end", () => {
      console.log(`Download finished: ${videoTitle}`);
    });

    videoStream.on("error", (error) => {
      throw new Error(`Error while downloading: ${error.message}`);
    });

  } catch (error) {
    console.error(`Failed to download video: ${error.message}`);
  }
}

export default downloadVideo;