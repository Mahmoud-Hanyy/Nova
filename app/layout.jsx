import "./globals.css";
import { preload } from "react-dom";

export const metadata = {
  title: "Nova — New Balance | Made for what’s next",
  description: "Meet Nova. A new expression of performance, built for the long way forward.",
  openGraph: { title: "Nova — New Balance", description: "A new expression of performance.", type: "website" },
};

export default function RootLayout({ children }) {
  preload("/sneaker-optimized.glb?v=2", {
    as: "fetch",
    crossOrigin: "anonymous",
    fetchPriority: "high",
  });
  preload("/draco/draco_wasm_wrapper.js", {
    as: "fetch",
    crossOrigin: "anonymous",
    fetchPriority: "high",
  });
  preload("/draco/draco_decoder.wasm", {
    as: "fetch",
    crossOrigin: "anonymous",
    fetchPriority: "high",
  });

  return <html lang="en"><body suppressHydrationWarning>{children}</body></html>;
}
