import {
  USER_REGISTERED,
  USER_PROFILE_UPDATED,
  USER_PROFILE_DELETED
} from '../user-profile.events'
import { AggregateProjection } from 'resolve-core'

const projection: AggregateProjection = {
  Init: () => ({
    isRegistered: false,
    isDeleted: false
  }),
  [USER_REGISTERED]: (state, { payload: { firstName, lastName } }) => ({
    ...state,
    isRegistered: true,
    firstName,
    lastName
  }),
  [USER_PROFILE_UPDATED]: (state, { payload: { firstName, lastName } }) => ({
    ...state,
    firstName,
    lastName
  }),
  [USER_PROFILE_DELETED]: state => ({
    ...state,
    isRegistered: false,
    isDeleted: true
  })
}

export default projection
