function fn() {
  var port = java.lang.System.getProperty('karate.server.port');
  if (!port) {
    port = '8080';
  }
  var config = {
    baseUrl: 'http://localhost:' + port
  };
  return config;
}
