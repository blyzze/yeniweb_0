import React, { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { products, productGallery } from '../data/products';

function Lightbox({ images, currentIndex, onClose, onPrev, onNext, productName }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        data-testid="lightbox-overlay"
        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          data-testid="lightbox-close"
          className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-6 text-white/60 text-sm font-ibm" data-testid="lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`${productName} - ${currentIndex + 1}`}
            data-testid="lightbox-image"
            className="max-w-full max-h-[85vh] object-contain select-none"
            draggable={false}
          />
        </motion.div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              data-testid="lightbox-prev"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              data-testid="lightbox-next"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onNext(i); }}
                data-testid={`lightbox-thumb-${i}`}
                className={`w-16 h-12 overflow-hidden border-2 transition-all ${
                  i === currentIndex ? 'border-[#FF6200] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProductDetailPage() {
  const { lang, t } = useLang();
  const { productId } = useParams();
  const product = products[productId];
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const gallery = product ? (productGallery[product.id] || []) : [];

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(-1), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);
  const nextImage = useCallback((specificIndex) => {
    if (typeof specificIndex === 'number') {
      setLightboxIndex(specificIndex);
    } else {
      setLightboxIndex((prev) => (prev + 1) % gallery.length);
    }
  }, [gallery.length]);

  if (!product) {
    return (
      <div className="pt-28 bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <p className="text-zinc-400 font-ibm">Product not found</p>
      </div>
    );
  }

  const specLabels = t.productDetail;
  const description = lang === 'tr' ? product.description_tr : product.description_en;

  return (
    <div data-testid="product-detail-page" className="pt-28 bg-[#0A0A0A] min-h-screen">
      {/* Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain bg-[#111]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 h-full flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              to={`/products/${product.category}`}
              data-testid="product-back-link"
              className="inline-flex items-center gap-2 text-sm text-[#FF6200] hover:underline font-ibm mb-4"
            >
              <ArrowLeft size={14} /> {specLabels.back}
            </Link>
            <h1 className="font-barlow text-5xl md:text-6xl uppercase tracking-tighter font-black text-white">
              {product.name}
            </h1>
            <p className="text-lg text-zinc-300 font-ibm mt-2">
              {lang === 'tr' ? product.subtitle_tr : product.subtitle_en}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-barlow text-2xl md:text-3xl uppercase tracking-tight font-bold text-white mb-8">
              {specLabels.specs}
            </h2>
            <div className="border border-zinc-800">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div
                  key={key}
                  data-testid={`spec-${key}`}
                  className={`flex items-center justify-between p-4 ${
                    i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#0A0A0A]'
                  } border-b border-zinc-800 last:border-b-0`}
                >
                  <span className="text-sm text-zinc-400 font-ibm uppercase tracking-wider">
                    {specLabels[key] || key}
                  </span>
                  <span className="text-sm text-white font-ibm font-semibold">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to={`/quote?product=${product.name}`}
              data-testid="product-get-quote"
              className="mt-8 inline-block bg-[#FF6200] hover:bg-[#E65800] text-white px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200"
            >
              {specLabels.getQuote}
            </Link>
          </motion.div>

          {/* Gallery Photos + Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Photo Gallery */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Large main photo */}
              {gallery[0] && (
                <div
                  className="col-span-2 overflow-hidden border border-zinc-800 cursor-pointer group relative"
                  onClick={() => openLightbox(0)}
                  data-testid="gallery-click-0"
                >
                  <img
                    src={gallery[0]}
                    alt={`${product.name} - 1`}
                    data-testid="gallery-img-0"
                    className="w-full h-72 object-contain bg-[#111] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </div>
              )}
              {/* Smaller photos */}
              {gallery.slice(1, 3).map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden border border-zinc-800 cursor-pointer group relative"
                  onClick={() => openLightbox(i + 1)}
                  data-testid={`gallery-click-${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - ${i + 2}`}
                    data-testid={`gallery-img-${i + 1}`}
                    className="w-full h-48 object-contain bg-[#111] group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </div>
              ))}
            </div>

            {/* Short Description */}
            <div className="bg-[#141414] border border-zinc-800 p-6">
              <p className="text-base text-zinc-300 font-ibm leading-relaxed" data-testid="product-description">
                {description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <Lightbox
          images={gallery}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          productName={product.name}
        />
      )}
    </div>
  );
}
