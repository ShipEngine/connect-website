try {
    const integration = require('integration');

    module.exports = integration;
} catch (err) {
    console.log(
      "Error occurred while loading integration. Routes may not have been attached."
    );
    console.error(err);
}
