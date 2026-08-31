import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  groupTitle: string
  exclusiveVisibility: boolean
  zoomOnSelect: boolean
}

export type IMConfig = ImmutableObject<Config>
