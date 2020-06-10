import serviceHandler from "../service-handler";
import {IRouter, Router} from "express";
const router: IRouter = Router();
import integration from "../integration";
import diagnostics from "./diagnostics";
import registry from "./loader-data";

router.use('/diagnostics', diagnostics);
router.use(registry);

/*router.post('/CancelPickup', (req, res) => serviceHandler(integration.cancelPickup, req, res));
router.post('/CreateManifest', (req, res) => serviceHandler(integration.createManifest, req, res));
*/

router.post('/Track', (req, res) => serviceHandler(integration.track, req, res));
router.post('/Register', (req, res) => serviceHandler(integration.register, req, res));
router.post('/GetRates', (req, res) => serviceHandler(integration.getRates, req, res));
router.post('/CreateLabel', (req, res) => serviceHandler(integration.createLabel, req, res));
router.post('/VoidLabels', (req, res) => serviceHandler(integration.voidLabels, req, res));
router.post('/SchedulePickup', (req, res) => serviceHandler(integration.schedulePickup, req, res));

export default router;

