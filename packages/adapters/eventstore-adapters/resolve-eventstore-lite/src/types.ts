import type { open } from 'sqlite'
import type { BaseAdapterPool, AdapterFunctions } from 'resolve-eventstore-base'
export type SqliteOpen = typeof open

export type MemoryStore = {
  name: string
  drop: () => void
}

export type AdapterPool = BaseAdapterPool & {
  config: {
    databaseFile: string
    secretsTableName: string
    eventsTableName: string
    snapshotsTableName: string
  }
  database: any
  eventsTableName: string
  snapshotsTableName: string
  secretsTableName: string
  escapeId: (source: string) => string
  escape: (source: string) => string
  memoryStore: MemoryStore
}

export type AdapterSpecific = {
  sqlite: { open: SqliteOpen }
  tmp: any
  os: any
  fs: any
}

export type SqliteAdapterFunctions = AdapterFunctions<AdapterPool> & {
  specific: AdapterSpecific
}
