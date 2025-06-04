import { useEffect, useState } from "react";
import { getWords } from "../db/indexedDB";
import type { Word } from "../types/Word";

import { Link } from "react-router-dom";


const List = () => {
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        const fetchWords = async () => {
            const data = await getWords();
            setWords(data);
        };

        fetchWords();
    }, []);

    return (
        <div>
            <h1>List Page</h1>
            {words.length === 0 ? (
                <p>No words registered.</p>
            ) : (
                <ul>
                    {words.map((word) => (
                        <li key={word.id}>
                            <strong>英語：{word.english}</strong>
                            <br />
                            日本語：{word.japanese.join(", ")}
                        </li>
                    ))}
                </ul>
            )}

            <Link to="/regi">Go to Register</Link>
            <br />
            <Link to="/test">Go to Test</Link>
            <br/>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default List;
