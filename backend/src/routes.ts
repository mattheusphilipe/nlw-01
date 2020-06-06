import express, { Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsCtrl from './controllers/PointsCtrl';
import ItemsCtrl from './controllers/ItemsCtrl';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsCtrl = new PointsCtrl();
const itemsCtrl = new ItemsCtrl()

routes.get('/', (req, res) => {
    return res.json({ "message": "Hello World!" });
});

routes.get('/items', itemsCtrl.index);

routes.get('/points', pointsCtrl.index);
routes.get('/points/:id', pointsCtrl.show);
routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsCtrl.create
);

export default routes;