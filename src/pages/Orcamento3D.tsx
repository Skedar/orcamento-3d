import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Orcamento3D: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <h1 className="text-3xl font-bold text-center py-10">
          Orçamento 3D
        </h1>
      </main>
      <Footer />
    </div>
  );
};

export default Orcamento3D; 