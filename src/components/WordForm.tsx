import { useState } from 'react';
import { addWord } from '../db/indexedDB';
import type { Word } from '../types/Word';
import { v4 as uuidv4 } from 'uuid';

export const WordForm = ({ onAdd }: { onAdd: () => void }) => {
  const [english, setEnglish] = useState('');
  const [japanese, setJapanese] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newWord: Word = {
      id: uuidv4(),
      english,
      japanese,
      meaning,
      createdAt: Date.now(),
    };
    await addWord(newWord);
    setEnglish('');
    setJapanese('');
    setMeaning('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="English" value={english} onChange={(e) => setEnglish(e.target.value)} />
      <input placeholder="Japanese" value={japanese} onChange={(e) => setJapanese(e.target.value)} />
      <input placeholder="Meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};
