const fs = require("fs");
const path = require("path");

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp)$/i;

const root = process.cwd();

const categories = fs
    .readdirSync(root, { withFileTypes: true })
    .filter(dir =>
        dir.isDirectory() &&
        dir.name !== ".github" &&
        dir.name !== "scripts" &&
        !dir.name.startsWith(".")
    )
    .map(dir => {

        const folder = path.join(root, dir.name);

        const images = fs
            .readdirSync(folder)
            .filter(file => IMAGE_EXT.test(file))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

        return {
            name: dir.name,
            images
        };

    })
    .filter(category => category.images.length);

fs.writeFileSync(
    path.join(root, "gallery.json"),
    JSON.stringify({ categories }, null, 2)
);

console.log("gallery.json generated.");