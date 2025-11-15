    function fn() {
  var config = {};

  // Global retry for steps like waitFor() without explicit retry()
  karate.configure('retry', { count: 20, interval: 500 });

  // Headless Chrome driver configuration for UI tests
  karate.configure('driver', {
    type: 'chrome',
    headless: true,
    showDriverLog: false,
    timeout: 5000,           // ms5to wait for element interactions
    retryInterval: 500,       // ms between driver polls
    addOptions: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-popup-blocking',
      '--remote-allow-origins=*'
    ],
    // You can adjust the viewport if needed for consistent rendering
    // windowSize: { width: 1366, height: 768 }
  });

  return config;
}
