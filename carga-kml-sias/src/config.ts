import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  gpTaskUrl: string
  dashboardUrl: string
  surveyFormUrl: string
  maxFileSizeMb: number
}

export type IMConfig = ImmutableObject<Config>
