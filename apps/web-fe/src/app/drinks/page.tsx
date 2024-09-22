import DrinksList from '../components/DrinksList';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('error');
  }
  const data = await response.json();
  return data;
};

const DrinkPage = async () => {
  const data = await fetchData();
  console.log(data);
  return (
    <div style={{padding:20}}>
      <h1>Drinks Page</h1>
      <DrinksList drinks={data.drinks} />
    </div>
  );
};
export default DrinkPage;
