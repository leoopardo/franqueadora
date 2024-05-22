import { useQuery } from "react-query";
import axios from "axios";
import { DDDResponse } from "./ddd.interface";

export function useGetDDDs(ddds: string[]) {
  const { isLoading, error, data } = useQuery<DDDResponse[]>(
    ["getDDDs", ddds],
    async () => {
      const responses = await Promise.all(
        ddds.map(async (ddd) => {
          try {
            const response = await axios.get(
              `https://brasilapi.com.br/api/ddd/v1/${ddd}`
            );
            return response.data;
          } catch (error) {
            console.error(`Failed to fetch data for DDD ${ddd}:`, error);
            return null;
          }
        })
      );
      return responses.filter((response) => response !== null);
    }
  );

  const combinedData = data?.reduce(
    (acc: any, curr: any) => {
      if (curr && curr.state && Array.isArray(curr.cities)) {
        acc.states.push(curr.state);
        acc.cities.push(...curr.cities);
      }
      return acc;
    },
    { states: [], cities: [] }
  );

  return {
    data: combinedData,
    error,
    isLoading,
  };
}
