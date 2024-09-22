import Image from "next/image";

export type ParamType = { params: { id: string } };

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const fetchData = async (id: string) => {
  const res = await fetch(`${url}${id}`);
  if (!res.ok) {
    throw new Error('Error fetching');
  }
  return res.json();
};

const SingleDrink = async ({ params }: ParamType) => {
  const data = await fetchData(params.id);
  const title = data?.drinks[0]?.strDrink;
  const img = data?.drinks[0]?.strDrinkThumb;
  return (
    <div style={{ padding: 20 }}>
      Single Drink Page
      <div>
        <h1>{title}</h1>
        <Image src={img} width={200} height={300} alt="drink" />
      </div>
    </div>
  );
};

export default SingleDrink;
