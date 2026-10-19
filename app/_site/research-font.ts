import { Newsreader } from "next/font/google";

// The research edition loads only its editorial face, not the prototype's type experiments.
export const researchFont = Newsreader({
  variable: "--f-newsreader",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
