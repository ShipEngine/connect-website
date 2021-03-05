import { IRouter, Router } from "express";

import diagnostics from "./diagnostics";
import loaderData from "./loader-data";
import orderSourceAPI from "./order-source-api";

const router: IRouter = Router();

router.use("/diagnostics", diagnostics);
router.use(loaderData);
router.use(orderSourceAPI);

export default router;
