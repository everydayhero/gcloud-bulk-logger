import extend from 'extend'
import Log from 'gcloud/lib/logging/log'
import gcloud from 'gcloud'

class BulkLogger {
  constructor (projectId, keyFilename) {
    this.projectId = projectId
    this.keyFilename = keyFilename
    this.resource = {
      type: 'global',
      labels: {
        project_id: projectId
      }
    }
    this.logging = gcloud({
      projectId: projectId,
      keyFilename: keyFilename
    }).logging()
  }

  entry (log, metadata, data, pKey, sKey) {
    const entry = this.logging.entry(this.resource, data)
    const logName = Log.formatName_(this.projectId, log)
    extend(false, entry, metadata)
    extend(true, entry, {
      logName: logName,
      labels: {
        'custom.googleapis.com/primary_key': pKey,
        'custom.googleapis.com/secondary_key': sKey
      }
    })

    return entry
  }
}

export default BulkLogger
