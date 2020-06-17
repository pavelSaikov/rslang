export const createAction = type => {
  const actionFactory = payload => (payload ? { type, payload } : { type });
  actionFactory.type = type;
  return actionFactory;
};
