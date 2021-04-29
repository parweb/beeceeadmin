const getForm = target => Object.fromEntries(new FormData(target).entries());

export default getForm;
