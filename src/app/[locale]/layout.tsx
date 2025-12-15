import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n/config';
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

// Generate metadata based on locale
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;

  // Fetch messages to get metadata
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    icons: {
      icon: "/Isotype-1.ico"
    }
  };
}

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={roboto.variable}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Provider>
            {children}
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
