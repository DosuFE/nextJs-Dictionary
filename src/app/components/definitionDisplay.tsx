import React from 'react';
import Phonetic from './phonetic';
import MeaningList from './meaningList';

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

interface DefinitionDisplayProps {
  definition: DictionaryEntry;
  speakWord: () => void;
  fallbackSpeak: (word: string) => void;
}

const DefinitionDisplay: React.FC<DefinitionDisplayProps> = ({ definition, speakWord, fallbackSpeak }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{definition.word}</h2>
      <Phonetic
        phonetic={definition.phonetic}
        phonetics={definition.phonetics}
        speakWord={speakWord}
        fallbackSpeak={fallbackSpeak}
      />
      <MeaningList meanings={definition.meanings} />
    </div>
  );
};

export default DefinitionDisplay;
