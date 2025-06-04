import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';
import type { Word } from '../types/Word';

const DB_NAME = 'enap-db';
const STORE_NAME = 'words';

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

export const addWord = async (word: Omit<Word, 'id'>) => {
    const db = await initDB();
    const wordWithId: Word = {
        ...word,
        id: uuidv4(),
    };
    await db.add(STORE_NAME, wordWithId);
};


export const updateWord = async (word: Word) => {
    const db = await initDB();
    await db.put(STORE_NAME, word); // 既存IDを上書き
};

export const getWords = async (): Promise<Word[]> => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
};

export const getWordById = async (id: string): Promise<Word | undefined> => {
    const db = await initDB();
    return await db.get(STORE_NAME, id);
};

export const searchWordsByJapanese = async (keyword: string): Promise<Word[]> => {
    const db = await initDB();
    const allWords = await db.getAll(STORE_NAME);
    return allWords.filter(word =>
        word.japanese.some((j: string | string[]) => j.includes(keyword))
    );
};

export const searchWordsByEnglish = async (keyword: string): Promise<Word[]> => {
    const db = await initDB();
    const allWords = await db.getAll(STORE_NAME);
    return allWords.filter(word =>
        word.english.includes(keyword)
    );
};

export const deleteWord = async (id: string) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
};
