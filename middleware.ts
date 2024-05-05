// export {default} from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en','fi','hi','ja','zh-CN','ru-RU','ko-KR'],
  defaultLocale:'en'
})

export const config = {
    matcher :[
        "/trips",
        "/reservations",
        "/properties",
        "/favorites",
        "/((?!api|_next|.*\\..*).*)"
    ]
}