import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import cookie from "cookie";
import PageLayout from "../components/PageLayout";
import AuthProvider from "../appState/AuthProvider";
import apolloClient from "../apollo/apolloClient";

import "tailwindcss/tailwind.css";


const QUERY_USER = {
  query: `
    query {
      user {
        id
        firstname
        lastname
        email
        role
       
      }
    }
  `,
};

function MyApp({ Component, pageProps, apollo, user }) {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </AuthProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps
  }

  const { headers } = ctx.req

  const cookies = headers && cookie.parse(headers.cookie || "")

  const token = cookies && cookies.jwt

  if (!token) {
    if (router.pathname === "/seller/sellermanages" ) {
      ctx.res.writeHead(302, { Location: "/signin" })
      ctx.res.end()
    }
    return null
  }

  const response = await fetch("http://localhost:4000/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}` || ""
    },
    body: JSON.stringify(QUERY_USER)
  })

  if (response.ok) {
    const result = await response.json()
    return { user: result.data.user }
  } else {
    if (router.pathname === "/seller/sellermanages" ) {
      ctx.res.writeHead(302, { Location: "/signin" })
      ctx.res.end()
    }
    return null
  }
};

export default apolloClient(MyApp);
