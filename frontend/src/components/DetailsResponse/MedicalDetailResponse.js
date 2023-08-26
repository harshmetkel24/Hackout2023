import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function MedicalDetailsResponse({responseDetail,setResponseDetail}) {
  console.log("here ", responseDetail);
  return (
    <div className="container w-100">
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="rounded"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Medical Store Name</th>
            <th>Medical Store Address</th>
            <th>Quantity Available</th>
          </tr>
        </thead>
        <tbody>
          {responseDetail.length === 0 && (
            <tr >
              <td colSpan="4" className="text-center">
                No Data
              </td>
            </tr>
          )}
          {responseDetail.length && responseDetail.map((detail, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{detail.medical.name}</td>
              <td>{detail.medical.address}</td>
              <td>{detail.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={()=>setResponseDetail(null)}>
          back
        </Button>
    </div>
  );
}

export default MedicalDetailsResponse;
