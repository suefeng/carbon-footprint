export const formattedDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formattedPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export async function getData(dataCategory: string) {
  const response = await fetch(`http://localhost:8000/api/v1/${dataCategory}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
