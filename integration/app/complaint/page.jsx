import CustomForm from '@/components/CustomForm'
import aitrain from "@/assets/images/aitrain.jpg";
import React from 'react'

const page = () => {
  return (
    <div>
      <CustomForm logoSrc={aitrain} />
    </div>
  );
}

export default page