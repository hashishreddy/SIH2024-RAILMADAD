import Dashboard from '@/components/Dashboard'
import React from 'react'
import aitrain from "@/assets/images/aitrain.jpg";
const page = () => {
  return (
    <div>
      <Dashboard logoSrc={aitrain} />
    </div>
  );
}

export default page