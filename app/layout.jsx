import "./globals.css";
import { NextAuthProvider } from "./providers";

export const metadata = {
  title: "Product App",
  description: "Next.js + NextAuth Product App"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
