import React from "react";
import Table from "react-bootstrap/Table";

function DetailsResponse() {
  return (
    <div className="container w-50">
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
          <tr>
            <td>1</td>
            <td>John</td>
            <td>USA</td>
            <td>1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>John</td>
            <td>USA</td>
            <td>1</td>
          </tr>
          <tr>
            <td>3</td>
            <td>John</td>
            <td>USA</td>
            <td>1</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default DetailsResponse;
