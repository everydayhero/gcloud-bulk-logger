import extend from 'extend'
import Log from 'gcloud/lib/logging/log'
import gcloud from 'gcloud'
import promisify from 'es6-promisify'

class BulkLogger {
  constructor (projectId, clientEmail, privateKey) {
    this.projectId = projectId
    this.resource = {
      type: 'global',
      labels: {
        project_id: projectId
      }
    }
    this.logging = gcloud({
      projectId: projectId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      }
    }).logging()
    this.logger = this.logging.log('unknown')
    this.write = promisify(this.logger.write, this.logger)
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
