import { AuthProvider } from "@/component/AuthContext";
import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
  ) ;
}
