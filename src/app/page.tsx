"use client";

import Navbar from "@/components/Navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Header } from "@/components/header/Header";
import { useState } from "react";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />} 
      <div style={{ 
        opacity: isLoading ? 0 : 1, 
        transition: 'opacity 0.3s',
        visibility: isLoading ? 'hidden' : 'visible'
      }}>
        <Navbar />
        <Header isLoading={isLoading} />
      </div>
    </>
  );
};

export default page;
