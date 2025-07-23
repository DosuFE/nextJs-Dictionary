'use client';
import { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import DefinitionDisplay from './definitionDisplay';
import Header from './header';

interface PhoneticType {
  audio: string;
  text: string;
}

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: PhoneticType[];
  meanings: Meaning[];
}

const programmingWords: DictionaryEntry[] = [
  {
    word: 'Java',
    phonetic: '/ˈdʒɑːvə/',
    phonetics: [
      { audio: 'https://example.com/java.mp3', text: '/ˈdʒɑːvə/' },
    ],
    meanings: [
      {
        partOfSpeech: 'noun',
        definitions: [
          {
            definition: 'A high-level programming language used for building applications.',
            example: 'Java is widely used for enterprise applications.',
          },
        ],
      },
    ],
  },
  {
    word: 'JavaScript',
    phonetic: '/ˈdʒɑːvəˌskrɪpt/',
    phonetics: [
      { audio: 'https://example.com/javascript.mp3', text: '/ˈdʒɑːvəˌskrɪpt/' },
    ],
    meanings: [
      {
        partOfSpeech: 'noun',
        definitions: [
          {
            definition: 'A programming language commonly used for web development.',
            example: 'JavaScript is used to create interactive web pages.',
          },
        ],
      },
    ],
  },
];

export default function Dictionary() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState<DictionaryEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const body = document.body;
    body.classList.add('animated-background');
    return () => {
      body.classList.remove('animated-background');
    };
  }, []);

  const searchWord = async () => {
    setLoading(true);
    setError(null);
    setDefinition(null);
    try {
      const programmingWord = programmingWords.find((entry) => entry.word.toLowerCase() === word.toLowerCase());
      if (programmingWord) {
        setDefinition(programmingWord);
        return;
      }

      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      const data: DictionaryEntry[] = await response.json();

      const predefinedWord = programmingWords.find((entry) => entry.word.toLowerCase() === data[0].word.toLowerCase());
      if (predefinedWord) {
        setDefinition(predefinedWord);
      } else {
        setDefinition(data[0]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const speakWord = () => {
    if (definition && definition.phonetics && definition.phonetics.length > 0) {
      const audio = new Audio(definition.phonetics[0].audio);
      audio.play().catch(() => {
        fallbackSpeak(definition.word);
      });
    } else if (definition && definition.word) {
      fallbackSpeak(definition.word);
    }
  };

  const fallbackSpeak = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

    // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className={
        theme === 'light'
          ? 'bg-gradient-to-r from-white to-blue-100 text-black'
          : 'bg-gradient-to-r from-gray-900 to-gray-700 text-white'
      }
    >
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="flex flex-col items-center p-6 md:p-10 min-h-screen">
        <SearchBar
          word={word}
          setWord={setWord}
          searchWord={searchWord}
        />

        {loading && <p className="text-center text-lg font-medium">Loading...</p>}
        {error && <p className="text-center text-red-500 text-lg font-medium">{error}</p>}

        {definition && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6 w-full max-w-3xl">
            <DefinitionDisplay
              definition={definition}
              speakWord={speakWord}
              fallbackSpeak={fallbackSpeak}
            />
          </div>
        )}
      </main>
    </div>
  );
}
