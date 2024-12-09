import { Playfair_Display } from "next/font/google";
import { Roboto } from "next/font/google";

const playfair = Playfair_Display({
     subsets: ['latin'],
     weight: ["500", "700"] })
const roboto = Roboto({
    subsets: ['latin'],
    weight: ["400", "700"]
});

export {playfair, roboto}