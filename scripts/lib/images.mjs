import {mkdir} from "node:fs/promises";
import {dirname} from "node:path";
import sharp from "sharp";

const withHeadroom = async (input, headroom) => {
    const {height} = await sharp(input).metadata();
    return sharp(input).extend({top: Math.round(height * headroom), extendWith: "copy"}).toBuffer();
};

export async function writeVariants(input, outputBase, widths, {crop, headroom} = {}) {
    await mkdir(dirname(outputBase), {recursive: true});
    const source = headroom ? await withHeadroom(input, headroom) : input;
    const results = [];
    for (const width of widths) {
        const pipeline = () => {
            const image = sharp(source);
            if (headroom) return image.resize(width, width, {fit: "cover", position: "top"});
            return crop ? image.resize(width, Math.round(width * crop), {
                fit: "cover",
                position: "top"
            }) : image.resize({width});
        };
        const avif = `${outputBase}-${width}.avif`;
        const webp = `${outputBase}-${width}.webp`;
        const [a, w] = await Promise.all([
            pipeline().avif({quality: 55, effort: 6}).toFile(avif),
            pipeline().webp({quality: 78, effort: 6}).toFile(webp),
        ]);
        results.push({width, avif: a.size, webp: w.size});
    }
    return results;
}
