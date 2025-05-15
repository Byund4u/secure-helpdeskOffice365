import "../styles/globals.css";
import "../styles/converged.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

export const DataContext = createContext({} as any);

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState();
  return (
    <DataContext.Provider value={{ data, setData }}>
      <Component {...pageProps} />
    </DataContext.Provider>
  );
}

export default MyApp;
