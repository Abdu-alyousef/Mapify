
import  { AuthProvider } from "@/component/AuthContext";
import "@/styles/globals.css";
import React from 'react';


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
  
  ) ;
}
