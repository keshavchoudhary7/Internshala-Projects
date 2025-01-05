import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./component/Loading";

// Lazy load components
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductDetail = lazy(() => import("./component/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const ProductList = lazy(() => import("./pages/ProductList"));
const Header = lazy(() => import("./component/Header"));
const Footer = lazy(() => import("./component/Footer"));

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Static components like Header and Footer can be rendered without Suspense */}
        <Suspense fallback={<Loading />}>
          <Header />
        </Suspense>
        <Routes>
          <Route path="/" element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
          <Route path="/shop" element={<Suspense fallback={<Loading />}><ProductList /></Suspense>} />
          <Route path="/cart" element={<Suspense fallback={<Loading />}><Cart /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<Loading />}><Contact /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<Loading />}><About /></Suspense>} />
          <Route path="/product/:id" element={<Suspense fallback={<Loading />}><ProductDetail /></Suspense>} />
          <Route path="/*" element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
        </Routes>
        <Suspense fallback={<Loading />}>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
