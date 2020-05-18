const generateAddress = function generateAddress(countryCode) {
  return {
    company: "US International",
    addressLines: ["3800 N Lamar Blvd #220"],
    cityLocality: "Austin",
    stateProvince: "TX",
    postalCode: "78756",
    country: "US",
    timeZone: "America/Chicago",
    name: "John Doe",
    email: "john.doe@gmail.com",
    phoneNumber: "123-456-7890"
  }
}

module.exports = generateAddress;