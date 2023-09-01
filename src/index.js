import { readdirSync } from "fs";
import Jimp from "jimp";

const sizes = [
  [16, 16],
  [32, 32],
  [64, 64],
  [128, 128],
  [144, 144],
  [256, 256],
  [512, 512],
  [1024, 1024],
];
const revert = sizes.reverse();

readdirSync("./image").forEach(async (file) => {
  console.log("Processing: " + file);
  await Jimp.read(`./image/${file}`)
    .then((image) => {
      // Do stuff with the image.
      revert.forEach((size) => {
        const newImage = image.resize(size[0], size[1]);
        newImage.write(`./res/${file.substring(0, file.length - 4)}-${size[0]}x${size[1]}.png`);
      });
      console.log("Finished: " + file);
    })
    .catch((err) => {
      // Handle an exception.
      console.error(err);
    });
});
