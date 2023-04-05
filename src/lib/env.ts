export const isServer = !(typeof window != 'undefined')

export const isDevelopement = process.env.NODE_ENV === 'development'

export const isProduction = process.env.NODE_ENV === 'production'
