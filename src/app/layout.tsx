import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeForge — Build Professional Resumes for Free",
  description:
    "Create stunning, ATS-friendly resumes with our free online builder. Choose from beautiful templates, customize colors, preview in real-time, and download as PDF.",
  keywords: ["resume builder", "free resume maker", "PDF resume", "professional resume templates", "ATS resume"],
  openGraph: {
    title: "ResumeForge — Build Professional Resumes for Free",
    description: "Create stunning resumes in minutes. Free, open-source, and beautifully designed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
