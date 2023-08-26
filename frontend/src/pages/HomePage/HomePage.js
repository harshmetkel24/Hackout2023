import React, { useEffect } from "react";
import { DetailForm } from "../../components";
import { allocateResources } from "../../services/api";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <>
      <div className="container-fluid vh-100">
        <DetailForm
          formTitle={"Report Casuality"}
          handleSubmit={allocateResources}
        />
      </div>
    </>
  );
}
