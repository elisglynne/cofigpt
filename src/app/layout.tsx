import './globals.css'
import Head from 'next/head'

export const metadata = {
title: "Cofi GPT",
  description: "Waw! Gret. Ma technoleg yn awful.",
  
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
