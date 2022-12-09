![](https://github.com/conscia/analytics-plugin-conscia/workflows/CI/CD%20Pipeline/badge.svg?branch=main)

# Conscia Analytics Plugin

Plugin for the [analytics](https://www.npmjs.com/package/analytics) npm package. Built using [microbundle](https://github.com/developit/microbundle).

# Installation

Install `analytics` and `analytics-plugin-conscia` packages

```bash
npm install analytics
npm install analytics-plugin-conscia
```

## How to use

To use, install the package and initialize the plugin with [analytics](https://www.npmjs.com/package/analytics).


```js
import Analytics from 'analytics'
import analyticsPluginConscia from 'analytics-plugin-conscia'

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    analyticsPluginConscia({
      trackerUrl: 'https://tracker-staging.conscia.ai',
      customerCode: 'xyz',
      apiKey: '12345678',
    })
  ]
})

/* Track a page view */
analytics.page()

/* Track a custom event */
analytics.track('cartCheckout', {
  item: 'pink socks',
  price: 20
})

/* Identify a visitor */
analytics.identify('user-id-xyz', {
  firstName: 'bill',
  lastName: 'murray'
})

```

After initializing `analytics` with the `consciaAnalyticsPlugin` plugin, data will be sent into Conscia's Tracker service whenever [analytics.identify](https://getanalytics.io/api/#analyticsidentify), [analytics.page](https://getanalytics.io/api/#analyticspage), or [analytics.track](https://getanalytics.io/api/#analyticstrack) are called.

## Platforms Supported

The `analytics-plugin-conscia` package works in the browser as well as in nodeJS environments.

### UMD usage

The [UMD](https://unpkg.com/analytics-plugin-conscia) distribution (imported via the unpkg CDN) can be used to send events to the Conscia Tracker service in client-side environments where a bundler is not being used.

```html
<html>
  <head>
    <script src="https://unpkg.com/analytics/dist/analytics.min.js"></script>
    <script src="https://unpkg.com/analytics-plugin-conscia/dist/analytics-plugin-conscia.umd.js"></script>
    <script>
      const Analytics = _analytics.init({
        app: 'awesome-app',
        plugins: [
          analyticsPluginConscia({
            trackerUrl: 'https://tracker-staging.conscia.ai',
            customerCode: 'xyz',
            apiKey: '12345678',
          })
        ]
      });
    </script>
    <script>
      Analytics.identify('user123', {
        name: 'John Smith',
        company: 'Conscia',
      });
      Analytics.page();
    </script>
  </head>
  <body>
    <h1>Hello World</h1>
    <button onclick="Analytics.track('Button Clicked')">Event 1</button>
  </body>
</html>
```

### Configuration Options

| Option | description |
|:---------------------------|:-----------|
| `trackerUrl` <br/>**required** - string| The Conscia Tracker Service URL |
| `customerCode` <br/>**required** - string| The Conscia Customer Code which the tracker events belong to |
| `apiKey` <br/>**required** - string| The Conscia API Key which has sufficient permissions to submit tracker events |

### Distributions

This package distributes the plugin in the following formats:

* `./dist/analytics-plugin-conscia.d.ts` - Typescript definitions
* `./dist/analytics-plugin-conscia.require.cjs` - used for require() in Node 12+
* `./dist/analytics-plugin-conscia.modern.js` - bundle for [modern](https://github.com/developit/microbundle#-modern-mode-) browsers
* `./dist/analytics-plugin-conscia.cjs` - CommonJS bundle
* `./dist/analytics-plugin-conscia.module.js` - ESM bundle
* `./dist/analytics-plugin-conscia.umd.js` - [UMD](https://unpkg.com/analytics-plugin-conscia) bundle 
