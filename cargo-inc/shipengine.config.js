require("dotenv-flow").config();

module.exports = {
  connectionFormDataProps: {
    account_id: process.env.ACCOUNT_ID,
    account_email: process.env.ACCOUNT_EMAIL,
    account_password: process.env.ACCOUNT_PASSWORD,
    agree_to_eula: true,
  },
  negateTests: [],
};
