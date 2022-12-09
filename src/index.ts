import fetch from 'isomorphic-fetch'

interface ConsciaAnalyticsConfig {
  trackerUrl: string;
  apiKey: string;
  customerCode: string;
}

const buildHeaders = (config: ConsciaAnalyticsConfig) => ({
  'Content-Type': 'application/json',
  'X-Customer-Code': config.customerCode,
  'Authorization': `Bearer ${config.apiKey}`
});

const consciaAnalyticsPlugin = (config: ConsciaAnalyticsConfig) => ({
  name: 'conscia-analytics-plugin',
  config,
  initialize: () => {
    console.log('Conscia Analytics Plugin');
  },
  page: ({ payload, config }: { payload: unknown, config: ConsciaAnalyticsConfig }) => {
    fetch(`${config.trackerUrl}/page`, {
      method: 'POST',
      headers: buildHeaders(config),
      body: JSON.stringify({
        message: payload,
      }),
    });
  },
  track: ({ payload, config }: { payload: unknown, config: ConsciaAnalyticsConfig }) => {
    fetch(`${config.trackerUrl}/track`, {
      method: 'POST',
      headers: buildHeaders(config),
      body: JSON.stringify({
        message: payload,
      }),
    });
  },
  identify: ({ payload, config }: { payload: unknown, config: ConsciaAnalyticsConfig }) => {
    fetch(`${config.trackerUrl}/identify`, {
      method: 'POST',
      headers: buildHeaders(config),
      body: JSON.stringify({
        message: payload,
      }),
    });
  },
  loaded: () => true,
});

export default consciaAnalyticsPlugin;