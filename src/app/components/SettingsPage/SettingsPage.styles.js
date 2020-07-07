import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  pageWrapper: { display: 'flex', flexDirection: 'column', minHeight: '100%', fontSize: 18, color: '#333366' },
  settingsPageTitle: {
    marginBottom: 10,
    textAlign: 'center',
  },
  componentsWrapper: {
    width: '100%',
    padding: '50px 4% 0 4%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    boxSizing: 'border-box',
    background: '#f7f2ee',
  },
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingsGroupContainer: {
    marginBottom: 25,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    borderRadius: 5,
    boxShadow: '0px 0px 6px 4px #e1e0de',
  },
  settingWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  settingSentence: {
    fontWeight: 500,
  },
});
