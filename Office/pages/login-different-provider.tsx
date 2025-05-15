import React from "react";
import Head from "next/head";
import { Login } from "../components/Login";

interface LoginDifferentProviderProps {}

export const LoginDifferentProvider: React.FC<
  LoginDifferentProviderProps
> = ({}) => {
  return (
    <>
      <Head>
        <title>Sign with a different provider</title>
      </Head>
      <Login
        title={`Sign with a different provider`}
        altText={`Sign in to your Microsoft account`}
        placeholder={`Email`}
        url={`/login`}
        error={`Enter a valid email address.`}
      />
    </>
  );
};

export default LoginDifferentProvider;
