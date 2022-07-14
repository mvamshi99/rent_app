import axios, { AxiosResponse } from 'axios';
import e, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface Item {
        name: String,
        description: String,
        address: String,
        // amenities: Array<Type>,
        // owner:{type:ID}
}

interface Type {
    hospitals: true,
    security: true
}

interface ID {
    id?:number
}

//Get all items
const getItems = async (req: Request, res:Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`${process.env.URL}/items`);
    let items:[Item] = result.data;
    return res.status(200).json({
        message: items
    });
};

//Get a single item using ID
const getItem = async (req:Request, res:Response, next:NextFunction) => {
    //Get Item ID from request
    let id: string = req.params.id;
    if (id) {
        let result: AxiosResponse = await axios.get(`${process.env.URL}/items/${id}`);
        let item: Item = result.data;
        return res.status(200).json({
            message: item
        });
    } else {
        return res.status(404).json({
            message: `${id} not found`
        });
    }
};

//Updating an item
const updateItem = async (req: Request, res: Response,next: NextFunction) => {
    //Get required ID from request
    let id: string = req.params.id;
    if (id) {
        let name: string = req.body.name ?? null;
        let description: string = req.body.description ?? null;
        let address: string = req.body.address ?? null;
        let response: AxiosResponse = await axios.put(`${process.env.URL}/items/${id}`, {
            ...(name &&{ name }),
            ...(description && {description}),
            ...(address && { address })
        });

        //return response
        return res.status(200).json({
            message: response.data
        });
    } else {
        return res.status(404).json({
            message: `${id} not found`
        });
    }
};

//Deleteing an item
const deleteItem = async (req: Request, res: Response,next: NextFunction) =>{
    let id: string = req.params.id;
    if (id) {
        let response: AxiosResponse = await axios.delete(`${process.env.URL}/items/${id}`)

        return res.status(200).json({
            message: `${id}: Item deleted successfully`
        });
    } else {
        return res.status(404).json({
            message: `${id} not found`
        });
    }
};

//Create a new Item
const addItem = async (req: Request, res: Response,next: NextFunction) => {
    let name: string = req.body.name;
    let description: string = req.body.description; 
    let address: string = req.body.address; 

    let response: AxiosResponse = await axios.post(`${process.env.URL}/items`, {
        name,
        description,
        address
    })

    return res.status(200).json({
        message: response.data
    });
};

export default { getItems, getItem, updateItem, deleteItem, addItem }