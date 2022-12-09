// test if plugin works in nodejs environment

const nock = require('nock')
const { Analytics } = require('analytics')
const analyticsPluginConscia = require('../../dist/analytics-plugin-conscia.cjs')

const delay = async (timeout) => new Promise(resolve => setTimeout(resolve, timeout))

let analytics = null

describe('Node Environment Test', () => {
  beforeAll(() => {
    // initialize analytics instance
    analytics = Analytics({
      app: 'awesome-app',
      plugins: [
        analyticsPluginConscia({
          trackerUrl: 'https://tracker-staging.conscia.ai',
          customerCode: 'xyz',
          apiKey: '12345678',
        })
      ]
    })
  })
  afterAll(() => {
    nock.cleanAll()
  })

  it('should submit page event', async () => {
    // setup nock interceptors
    const scope = nock('https://tracker-staging.conscia.ai', {
      reqheaders: {
        authorization: 'Bearer 12345678',
        'x-customer-code': 'xyz',
        'content-type': 'application/json',
      },
    })
      .post('/page', (body) => (body.message.type === 'page'))
      .reply(200, {
        ack: true
      })
    
    analytics.page()
    await delay(1000)
    expect(scope.isDone()).toBe(true)
  })

  it('should submit identify event', async () => {
    // setup nock interceptors
    const scope = nock('https://tracker-staging.conscia.ai', {
      reqheaders: {
        authorization: 'Bearer 12345678',
        'x-customer-code': 'xyz',
        'content-type': 'application/json',
      },
    })
      .post('/identify', (body) => (
        body.message.type === 'identify'
        && body.message.userId === 'user-id-xyz'
        && body.message.traits.firstName === 'bill'
      ))
      .reply(200, {
        ack: true
      })
        
    analytics.identify('user-id-xyz', {
      firstName: 'bill',
      lastName: 'murray'
    })
    await delay(1000)
    expect(scope.isDone()).toBe(true)
  })

  it('should submit custom event', async () => {
    // setup nock interceptors
    const scope = nock('https://tracker-staging.conscia.ai', {
      reqheaders: {
        authorization: 'Bearer 12345678',
        'x-customer-code': 'xyz',
        'content-type': 'application/json',
      },
    })
      .post('/track', (body) => (
        body.message.type === 'track'
        && body.message.event === 'cartCheckout'
        && body.message.properties.item === 'pink socks'
      ))
      .reply(200, {
        ack: true
      })
        
    analytics.track('cartCheckout', {
        item: 'pink socks',
        price: 20
    })
    await delay(1000)
    expect(scope.isDone()).toBe(true)
  })
})

