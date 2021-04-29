const allClients = () =>
  fetch(`${process.env.REACT_APP_API}/clients`).then(async res => {
    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  });

export default allClients;
