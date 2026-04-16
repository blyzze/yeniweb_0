import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import SocialBar from "./components/SocialBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import QuotePage from "./pages/QuotePage";
import MediaPage from "./pages/MediaPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <div className="App bg-[#0A0A0A] min-h-screen">
        <BrowserRouter>
          <ScrollToTop />
          <SocialBar />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:categoryId" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/media" element={<MediaPage />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;
