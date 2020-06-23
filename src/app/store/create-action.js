export const createAction = type => {
  const actionFactory = payload => (payload !== undefined ? { type, payload } : { type });
  actionFactory.type = type;
  return actionFactory;
};
