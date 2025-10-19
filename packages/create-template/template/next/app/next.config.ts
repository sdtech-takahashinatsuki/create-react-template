import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("https://ik.imagekit.io/**"),
            new URL("https://images.dog.ceo/**")
        ]
    }
};

export default withVanillaExtract(nextConfig);
