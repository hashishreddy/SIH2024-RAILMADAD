import React from "react";



import aitrain from "@/assets/images/aitrain.jpg";
import Hero from "@/components/Hero";
import Sample from "@/components/sample";
import Listing from "@/components/Listing";


const HomePage = () => {
  return (
    
    <div className="">
      
      <Hero logoSrc={aitrain}/>
      <Sample/>
      <Listing/>
    </div>
  );
};

export default HomePage;
