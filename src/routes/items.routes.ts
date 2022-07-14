import express, { Router } from 'express';
import controller from '../controllers/items';
const router = express.Router();

router.get('/items', controller.getItems);
router.get('/items/:id', controller.getItem);
router.put('/items/:id', controller.updateItem);
router.delete('/items/:id', controller.deleteItem);
router.post('/items', controller.addItem);

export = router;