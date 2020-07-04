import { createUseStyles } from 'react-jss';
import { PROGRESS_TYPE_FILLED_PART_COLOR_MAP } from './ProgressPart.models';

export const useStyles = createUseStyles({
  progressStrip: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'no-wrap',
    width: '100%',
    maxWidth: 600,
    minWidth: 250,
    height: 10,
    marginBottom: 20,
  },
  numericBorder: {
    padding: '0 5px',
    width: 50,
    color: ({ progressType }) => PROGRESS_TYPE_FILLED_PART_COLOR_MAP.get(progressType),
    textAlign: 'center',
  },
  progressParts: {
    width: '98%',
    height: 10,
    display: 'flex',
    flexWrap: 'no-wrap',
  },
});
