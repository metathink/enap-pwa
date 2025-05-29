import { openDB } from 'idb';
import type { Word } from '../types/Word';

const DB_NAME = 'word-db';
const STORE_NAME = 'words';

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        },
    });
};

export const addWord = async (word: Word) => {
    const db = await initDB();
    await db.put(STORE_NAME, word);
};

export const getWords = async (): Promise<Word[]> => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
};

export const deleteWord = async (id: string) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
};
