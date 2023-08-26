import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function DetailsResponse({ responseDetail,close }) {
  console.log(responseDetail);
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
            <th> Name</th>
            <th>Address</th>
            <th>Count</th>
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
            <tr style={{backgroundColor: detail.data.color}} key={index}>
              <td>{index + 1}</td>
              <td>{detail.data.name}</td>
              <td>{detail.data.address}</td>
              <td>{detail.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {
          close && (
            <Button variant="danger" onClick={()=>close(false)}>
              Back
            </Button>
          )
        }
    </div>
  );
}

export default DetailsResponse;
