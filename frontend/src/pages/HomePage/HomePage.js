import React, { useEffect } from "react";
import { DetailForm } from "../../components";
import { allocateResources, allocateLabs } from "../../services/api";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <>
      <div className="container-fluid vh-100">
        {/* <DetailForm
          formTitle={"Report Casuality"}
          handleSubmit={allocateResources}
        /> */}
        <DetailForm
          formTitle={"Labs Allocation"}
          handleSubmit={allocateLabs}
        />
      </div>
    </>
  );
}
