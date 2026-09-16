import { ImmutableObject } from 'seamless-immutable'

export type SpatialRelationship = 'intersects' | 'contains'

export interface Config {
  spatialRelationship: SpatialRelationship
  maxCategories: number
}

export type IMConfig = ImmutableObject<Config>
