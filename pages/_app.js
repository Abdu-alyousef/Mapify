import { AuthProvider } from "@/component/AuthContext";
import Layout from "@/component/layout/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
