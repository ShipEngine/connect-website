module.exports = {
  connectArgs: {
    email: "testEmail@abc.com",
    password: "testEmailPassword",
  },
  timeout: 30000,
  retries: 2,
  debug: false,
  failFast: true,
  tests: {
    createShipment_domestic: [
      {
        weight: {
          value: 10,
          unit: "lb",
        },
      }
    ]
  }
};