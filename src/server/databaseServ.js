import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

const client = new MongoClient(MONGO_URL);
let collection;

async function connectToMongoDB() {
    await client.connect();
    const db = client.db(DB_NAME);
    collection = db.collection(COLLECTION_NAME);
}

async function disconnectFromMongoDB() {
    if (client) {
        await client.close();
    }
}

async function createItem(data) {
    try {
        const result = await collection.insertOne(data);
        return result;
    } catch (error) {
        console.error('Error creating item:', error.message);
        return { error: error.message };
    }
}

async function getItems() {
    try {
        const items = await collection.find().toArray();
        return items;
    } catch (error) {
        console.error('Error fetching items:', error.message);
        return { error: error.message };
    }
}

async function getItemById(id) {
    try {
        const item = await collection.findOne({ _id: new ObjectId(id) });
        return item;
    } catch (error) {
        console.error('Error fetching item by ID:', error.message);
        return { error: error.message };
    }
}

async function updateItem(id, data) {
    try {
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
        return result;
    } catch (error) {
        console.error('Error updating item:', error.message);
        return { error: error.message };
    }
}

async function deleteItem(id) {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error('Error deleting item:', error.message);
        return { error: error.message };
    }
}

export { connectToMongoDB, disconnectFromMongoDB, createItem, getItems, getItemById, updateItem, deleteItem };