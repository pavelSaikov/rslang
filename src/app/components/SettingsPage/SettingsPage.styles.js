import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles({
  settingsPageTitle: {
    margin: '10px 20px 5px 10px',
  },
  settingWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  switchSetting: {
    margin: '10px 20px 5px 10px',
  },

  inputBlock: {
    width: '60px',
    textAlign: 'center',
    height: '23px',
    borderRadius: '15px',
    border: '1px solid grey',
  },

  cToggleBtn: {
    border: '1px solid #adadad',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.117647), 0px 1px 4px rgba(0, 0, 0, 0.117647)',
    borderRadius: '15px',
    boxSizing: 'border-box',
    fontSize: '0.8em',
    height: '24px',
    overflow: 'hidden',
    position: 'relative !important',
    width: '60px',

    '&.disabled': {
      opacity: '.4',
    },
  },

  toggleInput: {
    cursor: 'pointer',
    opacity: '0 !important',
    position: 'absolute !important',
    height: '100%',
    width: '100%',
    zIndex: '999',

    '&:checked + div': {
      left: '-20%',
    },

    '&:disabled': {
      cursor: 'not-allowed',
    },
  },

  on: {
    background: 'rgba(94, 111, 217, 1)',
    color: '#fff',
    right: '50%',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex !important',
    height: '100%',
    justifyContent: 'center',
    margin: '0 !important',
    maxWidth: '50%',
    position: 'absolute !important',
    textAlign: 'center',
    top: '0',
    whiteSpace: 'nowrap',
    width: '50%',
  },

  off: {
    background: '#fff',
    color: '#202020',
    left: '50%',
    alignItems: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex !important',
    height: '100%',
    justifyContent: 'center',
    margin: '0 !important',
    maxWidth: '50%',
    position: 'absolute !important',
    textAlign: 'center',
    top: '0',
    whiteSpace: 'nowrap',
    width: '50%',
  },

  toggleDiv: {
    alignItems: 'center',
    bottom: '0',
    boxSizing: 'border-box',
    display: 'flex !important',
    justifyContent: 'center',
    left: '-80%',
    position: 'absolute !important',
    textAlign: 'center',
    top: '0',
    transition: 'left .35s ease-out',
    width: '200%',
  },

  toggleSpan: {
    background: '#f4f3f3',
    border: '1px solid #adadad',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'inline-block !important',
    height: '110%',
    lineHeight: 'normal',
    position: 'relative !important',
    width: '22%',
  },
});
