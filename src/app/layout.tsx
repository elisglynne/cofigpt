import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
