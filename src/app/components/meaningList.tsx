import React from 'react';

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface MeaningListProps {
  meanings: Meaning[];
}

const MeaningList: React.FC<MeaningListProps> = ({ meanings }) => {
  return (
    <div>
      {meanings.map((meaning, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-medium text-gray-100">{meaning.partOfSpeech}</h3>
          <ul className="list-disc list-inside ml-4">
            {meaning.definitions.map((def, defIndex) => (
              <li key={defIndex} className="text-gray-200 mb-1">
                {def.definition}
                {def.example && (
                  <p className="text-gray-100 italic ml-4">Example: &quot;{def.example}&quot;</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MeaningList;
