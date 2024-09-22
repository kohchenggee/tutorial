import Link from 'next/link';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export type DrinkObject = { idDrink: string; strDrink: string };
const DrinksList = ({ drinks }: { drinks: Array<DrinkObject> }) => {
  return (
    <ul>
      {drinks.map((drink) => (
        <li key={drink.idDrink}>
          <Link href={`/drinks/${drink.idDrink}`}>{drink.strDrink}</Link>
        </li>
      ))}
    </ul>
  );
};

export default DrinksList;
