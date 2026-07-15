import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  serviceUrl: string
  reportSubmitUrl: string
  fallbackToken: string
}

export type IMConfig = ImmutableObject<Config>
