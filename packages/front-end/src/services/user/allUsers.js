const allUsers = () =>
  fetch(`${process.env.REACT_APP_API}/users`).then(async res => {
    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  });

export default allUsers;
