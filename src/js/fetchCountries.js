import { data } from 'autoprefixer';

function fetchCountries(searchQuery) {
  return (
    fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        return data;
      })
      // .then(res => {
      //   return console.log(res);
      // })
      .catch(err => console.log(err))
  );
}

export default fetchCountries;
