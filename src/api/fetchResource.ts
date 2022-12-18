const fetchResource = (url: string) => {
  return fetch(url).then((response: any) => {
    return response.json();
  });
};

export default fetchResource;
