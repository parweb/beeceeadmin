const allClients = url =>
  fetch(`${url}/clients`).then(async res => {
    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  });

export default allClients;
