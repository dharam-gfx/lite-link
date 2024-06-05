import { Inter } from "next/font/google"; // Import the Inter font from Google Fonts
import "./globals.css"; // Import global CSS styles
import Footer from "./components/Footer"; // Import Footer component
import NavBar from "./components/NavBar"; // Import NavBar component
import { Toaster } from "react-hot-toast"; // Import Toaster from react-hot-toast for notifications

const inter = Inter( { subsets: ["latin"] } ); // Configure the Inter font with Latin subset

export const metadata = {
  title: "LightLink App",
  description: "A LightLink App is a tool that allows you to create shorter, more manageable links from long URLs. These shortened links are easier to share, especially on social media platforms or in messages. Users can input a lengthy URL, and the tool generates a shorter version that redirects to the original page when clicked.",
};

export default function RootLayout( { children } ) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" /> {/* Position the toaster for notifications */}
        <NavBar /> {/* Render the NavBar component */}
        {children} {/* Render the children passed to the RootLayout */}
        <Footer /> {/* Render the Footer component */}
      </body>
    </html>
  );
}
