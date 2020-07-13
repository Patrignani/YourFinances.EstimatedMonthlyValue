import * as estimatedMonthlyValue from '../controllers/estimated-monthly-value-controller'
import * as express from "express";

const router = express.Router();

router.post('/', estimatedMonthlyValue.Post);
router.get('/', estimatedMonthlyValue.GetAll);
router.get('/:id', estimatedMonthlyValue.GetById);
router.delete('/:id',estimatedMonthlyValue.Delete);
router.put('/ActiveInactive/:id',estimatedMonthlyValue.ActiveInactive);
router.put('/:id',estimatedMonthlyValue.Put);

export default router;