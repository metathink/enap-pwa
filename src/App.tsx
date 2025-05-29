import { useState } from 'react';
import { WordForm } from './components/WordForm';
import { WordList } from './components/WordList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <h1>英単語学習アプリ</h1>
      <WordForm onAdd={handleRefresh} />
      <WordList key={String(refresh)} />
    </div>
  );
}

export default App;
