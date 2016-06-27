import BulkLogger from '.'

const logger = new BulkLogger('edh-logging-test', 'keyfile.json')
const app = 'fake-app'
const entries = [
  logger.entry(app, {timestamp: new Date(), labels: {plain_container: 'deadbeef'}}, 'log entry text', app, 'web'),
  logger.entry(app, {timestamp: new Date(), labels: {plain_container: 'cafebabe'}}, 'log entry text the second', app, 'worker')
]

logger.write(entries)
  .then(response => console.log('OK', response))
