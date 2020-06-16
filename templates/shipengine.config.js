require("dotenv-flow").config();

module.exports = {
  methods: {
    connectionFormDataProps: {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    },
  },
  negateTests: [],
};
