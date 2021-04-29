// const allApplications = () =>
//   fetch(`${process.env.REACT_APP_API}/applications`).then(async res => {
//     const data = await res.json();

//     if (res.status !== 200) {
//       throw new Error(data.message);
//     }

//     return data;
//   });

const allApplications = () =>
  Promise.resolve([
    { id: 1, name: 'BCAGDOC' },
    { id: 2, name: 'BCACONNECT' },
    { id: 3, name: 'BCASIGN' }
  ]);

export default allApplications;
