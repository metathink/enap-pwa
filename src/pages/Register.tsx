import { useState } from "react";
import type { Word } from "../types/Word";
import { addWord } from "../db/indexedDB";

import { Link } from "react-router-dom";


const Register = () => {
    const [formData, setFormData] = useState<Omit<Word, "id" | "createdAt">>({
        english: "",
        japanese: [],
    });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "japanese") {
            setFormData(prev => ({
                ...prev,
                japanese: value.split(",").map(s => s.trim()).filter(Boolean), // 空文字除去
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ✅ バリデーション：空欄がある場合は処理中断
        if (!formData.english.trim()) {
            alert("English を入力してください。");
            return;
        }

        // ✅ 英字のみチェック
        const englishOnlyRegex = /^[A-Za-z]+$/;
        if (!englishOnlyRegex.test(formData.english.trim())) {
            alert("English には英字のみを入力してください（数字・記号・空白不可）");
            return;
        }

        if (formData.japanese.length === 0 || formData.japanese.every(j => !j)) {
            alert("日本語を1つ以上入力してください。");
            return;
        }

        const newWord: Omit<Word, "id"> = {
            ...formData,
            createdAt: Date.now(),
        };

        await addWord(newWord);
        alert("Word registered!");

        // オプション：登録後にフォームを初期化
        setFormData({ english: "", japanese: [] });
    };

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={onSubmitHandler}>
                <p>
                    English:{" "}
                    <input
                        type="text"
                        name="english"
                        value={formData.english}
                        onChange={onChangeHandler}
                    />
                </p>
                <p>
                    日本語（カンマ区切り）:{" "}
                    <input
                        type="text"
                        name="japanese"
                        value={formData.japanese.join(", ")}
                        onChange={onChangeHandler}
                    />
                </p>
                <button type="submit">Submit</button>
            </form>

            <Link to="/list">Go to List</Link>
            <br />
            <Link to="/test">Go to Test</Link>
            <br/>
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default Register;
