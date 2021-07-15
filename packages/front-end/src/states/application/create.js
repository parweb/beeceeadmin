import { $application } from 'states';
import { createApplication, allApplications, createActivity } from 'services';

const create = async ({ set }, application) => {
  await createApplication(application);
  await createActivity('application.create', null, application);

  const applications = await allApplications();

  set($application.list, applications);
};

export default create;
