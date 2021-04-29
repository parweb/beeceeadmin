const createUser = data =>
  fetch(`${process.env.REACT_APP_API}/user`, {
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

export default createUser;
