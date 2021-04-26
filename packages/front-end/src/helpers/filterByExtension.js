import { imagesExtension } from 'state/qualifications';

const filterByExtension = filter => ({ preview }) => {
  if (filter === 'image') {
    return imagesExtension.includes(
      preview.split('.').reverse()[0].toLowerCase()
    );
  }

  return preview.split('.').reverse()[0].toLowerCase() === filter;
};

export default filterByExtension;
