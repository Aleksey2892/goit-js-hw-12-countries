import { data } from 'autoprefixer';

function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log(err));
}

export default fetchCountries;
