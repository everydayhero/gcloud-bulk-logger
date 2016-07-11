/* eslint-env mocha */

import { expect } from 'chai'

import BulkLogger from '../lib'

describe('BulkLogger', () => {
  it('formats entries', () => {
    const projectId = 'project-id'
    const clientEmail = 'service-user@project-id.iam.gserviceaccount.com'
    const privateKey = 'fakeKey'
    const logName = 'app-name-log'
    const app = 'app-name'
    const process = 'process'
    const metadata = {}
    const logLine = 'this is log text'
    const expected = {
      resource: {
        type: 'global',
        labels: {
          project_id: 'project-id'
        }
      },
      logName: 'projects/project-id/logs/app-name-log',
      labels: {
        'custom.googleapis.com/primary_key': 'app-name',
        'custom.googleapis.com/secondary_key': 'process'
      },
      textPayload: 'this is log text'
    }

    const logger = new BulkLogger(projectId, clientEmail, privateKey)
    const entry = logger.entry(logName, metadata, logLine, app, process)

    expect(entry.toJSON()).to.eql(expected)
  })
})
