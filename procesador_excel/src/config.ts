import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  submitJobUrl: string
  publishSubmitJobUrl: string
  fallbackToken: string
}

export type IMConfig = ImmutableObject<Config>
