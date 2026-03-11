import React from 'react'

// Layout raiz mínimo - NÃO renderiza <html> nem <body>
// Cada route group gerencia o seu próprio layout:
// - (payload) -> RootLayout do Payload (com seu html/body e CSS)
// - (main), lp, etc -> layout próprio com html/body do site

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
