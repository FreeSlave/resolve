import createAdapter from './create-adapter'
import importStream from './import'
import exportStream from './export'
import wrapMethod from './wrap-method'
import wrapEventFilter from './wrap-event-filter'
import wrapSaveEvent from './wrap-save-event'
import wrapDispose from './wrap-dispose'
import validateEventFilter from './validate-event-filter'
import { MAINTENANCE_MODE_AUTO, MAINTENANCE_MODE_MANUAL } from './constants'
import ConcurrentError from './concurrent-error'
import {
  ResourceAlreadyExistError,
  ResourceNotExistError,
  maybeThrowResourceError,
} from './resource-errors'
import loadEvents from './load-events'
import getNextCursor from './get-next-cursor'
import throwBadCursor from './throw-bad-cursor'
import snapshotTrigger from './snapshot-trigger'
import incrementalImport from './incremental-import'
import {
  CursorFilter,
  EventsWithCursor,
  EventFilter,
  BaseAdapterPool,
  AdapterFunctions,
} from './types'

function wrappedCreateAdapter<
  AdapterPool extends BaseAdapterPool,
  MyAdapterFunctions extends AdapterFunctions<AdapterPool>
>(adapterFunctions: MyAdapterFunctions, options: any): any {
  return createAdapter<AdapterPool, MyAdapterFunctions>(
    {
      maybeThrowResourceError,
      importStream,
      exportStream,
      wrapMethod,
      wrapEventFilter,
      wrapSaveEvent,
      wrapDispose,
      validateEventFilter,
      loadEvents,
      incrementalImport,
      getNextCursor,
    },
    adapterFunctions,
    options
  )
}

export default wrappedCreateAdapter

export {
  ResourceAlreadyExistError as EventstoreResourceAlreadyExistError,
  ResourceNotExistError as EventstoreResourceNotExistError,
  ConcurrentError,
  MAINTENANCE_MODE_AUTO,
  MAINTENANCE_MODE_MANUAL,
  throwBadCursor,
  getNextCursor,
  snapshotTrigger,
  CursorFilter,
  EventsWithCursor,
  EventFilter,
  BaseAdapterPool,
  AdapterFunctions,
}
