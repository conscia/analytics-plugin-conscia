const consciaAnalyticsPlugin = (config) => ({
  name: 'conscia-analytics-plugin',
  config,
  initialize: ({ config }) => {
    config.endpoint = config.trackerUrl;
    config.headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.apiKey}` };
    console.log('Conscia Analytics Plugin');
  },
  page: ({ payload, config }) => {
    fetch(`${config.endpoint}/page`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        customerCode: config.customerCode,
        message: payload,
      }),
    });
  },
  track: ({ payload, config }) => {
    fetch(`${config.endpoint}/track`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        customerCode: config.customerCode,
        message: payload,
      }),
    });
  },
  identify: ({ payload, config }) => {
    fetch(`${config.endpoint}/identify`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        customerCode: config.customerCode,
        message: payload,
      }),
    });
  },
  loaded: () => true,
});