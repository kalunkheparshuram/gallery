const fs = require("fs");
const path = require("path");
const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp)$/i;
const root = process.cwd();
const categories = [];

for (const dir of fs.readdirSync(root, { withFileTypes: true })) {
    if (!dir.isDirectory() || dir.name.startsWith(".") || dir.name === "scripts")
        continue;

    const folder = path.join(root, dir.name);
    const images = fs.readdirSync(folder)
        .filter(file => IMAGE_EXT.test(file))
        .sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}))
        .map(file => ({file, title: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")}));
    if(images.length){
        categories.push({name: dir.name,images});
    }
}

fs.writeFileSync("gallery.json",JSON.stringify({updated: new Date().toISOString(),categories},null,2));
// console.log("gallery.json created.");
