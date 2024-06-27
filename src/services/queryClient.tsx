/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryCache, QueryClient } from "react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_err: any) => {},
  }),
  defaultOptions: { queries: { retry: false, keepPreviousData: true } },
});
