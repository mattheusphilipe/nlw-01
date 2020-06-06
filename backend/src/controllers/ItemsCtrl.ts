import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsCtrl{
    async index (req: Request, res: Response)  {
        const items = await knex("items").select('*');
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.31.52:5000/uploads/${item.image}`
                // image_url: `http://localhost:5000/uploads/${item.image}`
            }
        });
        
        return res.json(serializedItems);
    }
}

export default ItemsCtrl;