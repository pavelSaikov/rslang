import React from 'react';

import { WORDS } from './words';
import { WordCard } from './components/WordCard/WordCard';
import { UserWordAssessment } from './components/UserWordAssessment/UserWordAssessment';
import { WordStatusChoicer } from './components/WordStatusPicker/WordStatusPicker';
import { WORDS_STATUSES } from './components/WordStatusPicker/WordStatusPicker.models';

const word = WORDS[0];

export const LearningPage = () => {
  return (
    <div>
      <h2>Learning Page</h2>
      <WordCard wordInfo={word} onInput={() => {}} />
      <UserWordAssessment onChangeStatusClick={() => {}} />
      <WordStatusChoicer onStatusChoice={() => {}} wordStatuses={WORDS_STATUSES} />
    </div>
  );
};
