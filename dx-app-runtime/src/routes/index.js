const serviceHandler = require('../service-handler');
const integration = require('integration');
const router = require('express').Router();

router.use('/diagnostics', require('./diagnostics'));
router.use(require('./get-registry-data'));

router.post('/CancelPickup', (req, res) => serviceHandler(integration.cancelPickup, req, res));
router.post('/CreateLabel', (req, res) => serviceHandler(integration.createLabel, req, res));
router.post('/CreateManifest', (req, res) => serviceHandler(integration.createManifest, req, res));
router.post('/GetRates', (req, res) => serviceHandler(integration.getRates, req, res));
router.post('/Register', (req, res) => serviceHandler(integration.login, req, res));
router.post('/SchedulePickup', (req, res) => serviceHandler(integration.schedulePickup, req, res));
router.post('/Track', (req, res) => serviceHandler(integration.track, req, res));
router.post('/VoidLabels', (req, res) => serviceHandler(integration.voidLabels, req, res));

module.exports = router;
