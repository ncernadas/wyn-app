import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
});

export default intlMiddleware;

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|_static|.*\\..*).*)' ,
  ],
};
