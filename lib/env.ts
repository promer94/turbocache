import { serverEnv } from '~/env/server-env'

export const isServer = !(typeof window != 'undefined')
export const isDevelopement = serverEnv.NODE_ENV === 'development'
export const isProduction = serverEnv.NODE_ENV === 'production'
