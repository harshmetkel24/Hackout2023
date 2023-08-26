import React, { useEffect } from "react";
import { DetailForm } from "../../components";
import { allocateResources, allocateLabs } from "../../services/api";


export default function HomePage() {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <>
     <h2>
      Welcome to PMS home page
     </h2>
    </>
  );
}
