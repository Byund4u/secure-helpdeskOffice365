/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Login as LoginComponent } from "../components/Login";
import Head from "next/head";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Sign in to your Microsoft account</title>
      </Head>
      <LoginComponent
        title={`Sign in`}
        altText={`Sign in with another provider`}
        url={`/login-different-provider`}
        error={`Enter a valid email address, phone number, or Skype name.`}
      />
    </>
  );
};

export default Login;
