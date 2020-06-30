import { useEffect, useCallback } from 'react';

export const useOnClickOutside = (ref, onClickOutside) => {
  const onClick = useCallback(
    ({ target }) => {
      if (ref.current instanceof HTMLElement && !ref.current.contains(target)) {
        onClickOutside();
      }
    },
    [onClickOutside, ref],
  );

  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [onClick]);
};
