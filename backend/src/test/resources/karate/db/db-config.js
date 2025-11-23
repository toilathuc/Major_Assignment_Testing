function fn() {
  return {
    db: {
      url: 'jdbc:h2:file:./data/testdb;AUTO_SERVER=TRUE',
      username: 'sa',
      password: '',
      driverClassName: 'org.h2.Driver'
    }
  }
}
