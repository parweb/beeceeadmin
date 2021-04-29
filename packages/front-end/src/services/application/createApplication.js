const createApplication = data =>
  fetch(`${process.env.REACT_APP_API}/application`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(async res => {
    if (res.status !== 200) {
      const data = await res.json();
      throw new Error(data.message);
    }

    return res;
  });

export default createApplication;
