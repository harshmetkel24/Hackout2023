import React, { useContext, useEffect, useState } from "react";
import { DetailForm } from "../../components";
import { allocateResources, allocateLabs, getMedicalStores } from "../../services/api";
import { UserContext } from "../../UserContext";
import MedicineDetailForm from "../../components/DetailForm/MedicineDetailForm";

export default function AllocationPage() {
  const {user,setUser} = useContext(UserContext);
  const [redirect1,setRedirect1] = useState(false);
  const [redirect2,setRedirect2] = useState(false);

  useEffect(() => {
    document.title = "Allocation Page";
  }, []);

  if(redirect1){
    return (
      <DetailForm
        formTitle={"Labs Allocation"}
        handleSubmit={allocateLabs}
        close1={setRedirect1}
      />
    );
  }

  if(redirect2){
    return (
      <MedicineDetailForm
        formTitle={"Medicine Availability"}
        handleSubmit={getMedicalStores}
        close2={setRedirect2}
      />
    );
  }

  return (
    <>
      <div className="container-fluid vh-100">
        {
          user.role === "MO" && (
            <DetailForm
              formTitle={"Report Casuality"}
              handleSubmit={allocateResources}
            />
          )
        }
        {
          user.role === "Hospital_O" && (
            <>
              <button onClick={()=>setRedirect1(true)}>Get Labs</button>
              <button onClick={()=>setRedirect2(true)}>Get Medical Stores</button>
            </>
          )
        }
      </div>
    </>
  );
}
