import {Request, Response} from 'express';
import knex from '../database/connection';


export default class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');
    
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${process.env.UPLOAD_IMAGE_URL}/uploads/${item.image}`,
      };
    });
    return response.json(serializedItems);
  }
}
