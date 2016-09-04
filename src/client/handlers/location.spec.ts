import { expect } from 'chai'
import * as td from 'testdouble'
// need for mock, to make sure the action is called with the proper params
let actions = td.replace('../actions/location', { loadLocation: function () { return JSON.stringify(arguments) } })
import { handleLoadLocation } from './location'
import configureMockStore from 'redux-mock-store'

const dispatch = td.function(configureMockStore()().dispatch)

describe('#handleLoginError', () => {
  after(td.reset)
})
