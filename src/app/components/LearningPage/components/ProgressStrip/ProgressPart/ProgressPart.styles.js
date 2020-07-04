import { createUseStyles } from 'react-jss';
import { PROGRESS_TYPE_PART_COLOR_MAP, PROGRESS_TYPE_FILLED_PART_COLOR_MAP } from '../ProgressPart.models';

export const useStyles = createUseStyles({
  progressPart: {
    width: '100%',
    height: '100%',
    background: ({ progressType }) => PROGRESS_TYPE_PART_COLOR_MAP.get(progressType),
    '&.first': {
      borderRadius: '5px 0 0 5px',
    },
    '&.last': {
      borderRadius: '0 5px 5px 0',
    },
    '&.filled': {
      background: ({ progressType }) => PROGRESS_TYPE_FILLED_PART_COLOR_MAP.get(progressType),
    },
  },
});
