import { $application } from 'states';
import { createApplication, allApplications } from 'services';

const create = async ({ set }, application) => {
  await createApplication(application);
  const applications = await allApplications();

  set($application.list, applications);
};

export default create;
