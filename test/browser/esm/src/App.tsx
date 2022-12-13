import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Analytics from 'analytics';
import analyticsPluginConscia from './analytics-plugin-conscia.module';

const analytics = Analytics({
  app: 'awesome-app',
  plugins: [
    analyticsPluginConscia({
      trackerUrl: 'https://tracker-staging.conscia.ai',
      customerCode: 'xyz',
      apiKey: '12345678',
    })
  ]
});

function App() {
  useEffect(() => {
    analytics.identify('user123', {
      name: 'John Smith',
      company: 'Conscia',
    });
    analytics.page();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Test ESM Build
        </p>
        <button onClick={() => analytics.track('Button Clicked')}>Click Event</button>
      </header>
    </div>
  );
}

export default App;
