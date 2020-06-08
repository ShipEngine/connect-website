require("dotenv-flow").config();

module.exports = {
  connectionFormDataProps: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
  negateTests: [],
};
