const fetchResource = (url: string) => {
  return fetch(url)
    .then((response) => {
      try {
        return response.json();
      } catch (err) {
        console.log("Error converting body to JSON");
      }
    })
    .catch((err) => console.log("Error fetching data: ", err));
};

export default fetchResource;
