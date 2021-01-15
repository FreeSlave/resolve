import { SecretsManager } from 'resolve-core'
import { maybeThrowResourceError } from './resource-errors'

type ShapeEvent = (event: any, additionalFields: any) => any

export type BaseAdapterPool = {
  config: any
  disposed: boolean
  validateEventFilter: any

  injectEvent: any
  loadEventsByCursor: any
  loadEventsByTimestamp: any
  deleteSecret?: any
  getSecret?: any
  setSecret?: any
  waitConnect: any
  wrapMethod: any
  maybeThrowResourceError: (error: Error[]) => void
  coerceEmptyString: (obj: any, fallback?: string) => string
  isFrozen?: any
  connectPromise?: any
  connectPromiseResolve?: any
  shapeEvent: ShapeEvent
  counters: any
  bucketSize: number
}

// export type BaseEventStream = {
//   pool: BaseAdapterPool
//   maintenanceMode: symbol
//   byteOffset: number
// }

// export type Context = {
//   pool: BaseAdapterPool
//   maintenanceMode: symbol
//   cursor: string | null
//   bufferSize: number
//   isBufferOverflow: boolean
// }

export type EventsWithCursor = {
  cursor: string | null
  events: any[]
}

export type EventFilter = {
  eventTypes: Array<string> | null
  aggregateIds: Array<string> | null
  startTime: number
  finishTime: number
}

export type CursorFilter = EventFilter & {
  cursor: string | null
  limit: number
}

export interface CommonAdapterFunctions {
  maybeThrowResourceError: typeof maybeThrowResourceError
  wrapMethod: (...args: any) => Promise<any>
  wrapEventFilter: any
  wrapSaveEvent: any
  wrapDispose: any
  validateEventFilter: any
  loadEvents: any
  importStream: any
  exportStream: any
  incrementalImport: any
  getNextCursor: any
}

export interface AdapterFunctions<AdapterPool extends BaseAdapterPool> {
  beginIncrementalImport: (arg0: AdapterPool) => Promise<string>
  commitIncrementalImport: (
    arg0: AdapterPool,
    importId: string
  ) => Promise<void>
  connect: (pool: any, specific: any) => Promise<any>
  dispose: (pool: AdapterPool) => Promise<any>
  dropSnapshot: (pool: AdapterPool, snapshotKey: string) => Promise<any>
  drop: (pool: AdapterPool) => Promise<any>
  freeze: (arg0: AdapterPool) => Promise<void>
  getLatestEvent: (pool: AdapterPool, filter: EventFilter) => Promise<any>
  getSecretsManager?: (pool: AdapterPool) => SecretsManager
  init: (pool: AdapterPool) => Promise<any>
  injectEvent: (arg0: AdapterPool, event: any) => Promise<any>
  loadEventsByCursor: (
    pool: AdapterPool,
    filter: CursorFilter
  ) => Promise<EventsWithCursor>
  loadEventsByTimestamp: (
    pool: AdapterPool,
    filter: CursorFilter
    // eslint-disable-next-line spellcheck/spell-checker
  ) => Promise<EventsWithCursor>
  loadSnapshot: (pool: AdapterPool, snapshotKey: string) => Promise<any>
  pushIncrementalImport: (
    arg0: AdapterPool,
    events: any[],
    importId: string
  ) => Promise<void>
  rollbackIncrementalImport: (arg0: AdapterPool) => Promise<void>
  saveEvent: (pool: AdapterPool, event: any) => Promise<any>
  saveSnapshot: (
    pool: AdapterPool,
    snapshotKey: string,
    content: string
  ) => Promise<any>
  shapeEvent: (event: any, additionalFields: any) => any
  unfreeze: (arg0: AdapterPool) => Promise<void>
  isFrozen?: () => Promise<boolean>
  getSecret?: (pool: AdapterPool, selector: string) => Promise<string | null>
  setSecret?: (
    pool: AdapterPool,
    selector: string,
    secret: string
  ) => Promise<void>
  deleteSecret?: (pool: AdapterPool, selector: string) => Promise<void>
  specific: any
}
