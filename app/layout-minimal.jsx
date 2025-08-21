import './globals.css';

export const metadata = {
  title: 'Maia Test',
  description: 'Test build',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}