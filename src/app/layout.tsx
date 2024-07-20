import { Header } from "@/components/customui/Header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/customui/Footer";
import { Analytics } from "@vercel/analytics/react"
import { Montserrat } from "next/font/google";


export const metadata = {
  title: "Chess",
  description: "chess app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen flex flex-col justify-between">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

            <Header />
            <div className="flex justify-center w-full items-center p-5">
              {children}
              <Analytics />
            </div>
            <Footer/>

          </ThemeProvider>
        </body>
      </html>
    </>
  )
}