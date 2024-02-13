import { ElectricityType } from "@/domain/entities/electricity";

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
  const response = await fetch(`http://localhost:8000/api/v1/${dataCategory}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export function groupBy<T, K>(
  array: T[],
  keyGetter: (item: T) => K
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  array.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export const getYear = (date: string) => new Date(date).getFullYear();

export function sumTonsCo2PerYear(items: any[]) {
  const tons_co2 = items.map((item) => item.tons_co2);
  const data = {
    year: items[0].date
      ? getYear(items[0].date)
      : Number(items[0].month.split(" ")[1]),
    tons_co2: Number(
      items.reduce((acc, curr) => acc + Number(curr.tons_co2), 0).toFixed(2)
    ),
  };
  return data;
}
