import { Router, type IRouter } from "express";
import healthRouter from "./health";
import propertiesRouter from "./properties";
import adminRouter from "./admin";
import investorsRouter from "./investors";

const router: IRouter = Router();

router.use(healthRouter);
router.use(propertiesRouter);
router.use(adminRouter);
router.use(investorsRouter);

export default router;
