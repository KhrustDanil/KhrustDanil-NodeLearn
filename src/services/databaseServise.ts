import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initDb = async () => {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
};

export const createItem = async (name: string, description: string) => {
  try {
    const db = await initDb();
    return db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
  } catch (error) {
    throw new Error('Failed to create item');
  }
};

export const getAllItems = async () => {
  try {
    const db = await initDb();
    return db.all('SELECT * FROM items');
  } catch (error) {
    throw new Error('Failed to get items');
  }
};

export const getItemById = async (id: number) => {
  try {
    const db = await initDb();
    return db.get('SELECT * FROM items WHERE id = ?', id);
  } catch (error) {
    throw new Error('Failed to get item');
  }
};

export const updateItem = async (id: number, name: string, description: string) => {
  try {
    const db = await initDb();
    return db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
  } catch (error) {
    throw new Error('Failed to update item');
  }
};

export const deleteItem = async (id: number) => {
  try {
    const db = await initDb();
    return db.run('DELETE FROM items WHERE id = ?', id);
  } catch (error) {
    throw new Error('Failed to delete item');
  }
};