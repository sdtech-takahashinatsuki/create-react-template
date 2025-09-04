import { PopupBase } from "@/components/layout";
import { PopupProvider } from "@/lib/popup";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
