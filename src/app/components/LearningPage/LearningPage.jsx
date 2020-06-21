import React from 'react';

import { WORDS } from './words';
import { WordCard } from './components/WordCard/WordCard';

const word = WORDS[0];

export const LearningPage = () => {
  return (
    <div>
      <h2>Learning Page</h2>
      <WordCard wordInfo={word} onInput={() => {}} />
    </div>
  );
};
