import React from 'react';

interface PhoneticProps {
  phonetic?: string;
  phonetics: { audio: string; text: string }[];
  speakWord: () => void;
  fallbackSpeak: (word: string) => void;
}

const Phonetic: React.FC<PhoneticProps> = ({ phonetic, phonetics, speakWord, fallbackSpeak }) => {
  const hasValidAudio = phonetics.some((p) => p.audio);

  return (
    <div className="flex items-center mb-4">
      {phonetic && <p className="text-gray-600 italic mr-4">{phonetic}</p>}
      {hasValidAudio ? (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={speakWord}
        >
          Listen
        </button>
      ) : (
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onClick={() => fallbackSpeak(phonetic || '')}
        >
          Speak
        </button>
      )}
    </div>
  );
};

export default Phonetic;