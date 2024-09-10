import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initDb = async () => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    )
  `);

  return db;
};

export const createItem = async (name: string, description: string) => {
  const db = await initDb();
  return db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
};

export const getAllItems = async () => {
  const db = await initDb();
  return db.all('SELECT * FROM items');
};

export const getItemById = async (id: number) => {
  const db = await initDb();
  return db.get('SELECT * FROM items WHERE id = ?', id);
};

export const updateItem = async (id: number, name: string, description: string) => {
  const db = await initDb();
  return db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
};

export const deleteItem = async (id: number) => {
  const db = await initDb();
  return db.run('DELETE FROM items WHERE id = ?', id);
};
