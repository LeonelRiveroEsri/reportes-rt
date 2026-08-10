import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  submitJobUrl: string
  fallbackToken: string
}

export type IMConfig = ImmutableObject<Config>
