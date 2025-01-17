import { ClerkProvider } from '@clerk/nextjs';
import './global.css';
import Providers from './providers';

export const metadata = {
  title: 'Jobify',
  description: 'Job application tracking system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
