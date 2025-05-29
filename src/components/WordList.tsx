import { useEffect, useState } from 'react';
import { getWords, deleteWord } from '../db/indexedDB';
import type { Word } from '../types/Word';

export const WordList = () => {
  const [words, setWords] = useState<Word[]>([]);

  const fetchWords = async () => {
    const all = await getWords();
    setWords(all);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteWord(id);
    fetchWords();
  };

  return (
    <div>
      {words.map((word) => (
        <div key={word.id}>
          <strong>{word.english}</strong> - {word.japanese} ({word.meaning})
          <button onClick={() => handleDelete(word.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
