import React, { useEffect } from "react";
import { DetailForm, DetailsResponse } from "../../components";

export default function HomePage() {
  useEffect(() => {
    document.title = "Home Page";
  }, []);
  return (
    <>
      <div className="container-fluid vh-100">
        <DetailForm formTitle={"Report Casuality"} />
        <DetailsResponse
          responseTitle={"Hospitals Data for patient allocation"}
        />
      </div>
    </>
  );
}
