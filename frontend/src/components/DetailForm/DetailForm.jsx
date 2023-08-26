import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DetailResponse from "../DetailsResponse/DetailsResponse.jsx";

function DetailForm({ formTitle, handleSubmit }) {
  const [detail, setDetail] = useState({
    redCount: 0,
    yellowCount: 0,
    greenCount: 0,
    longitude: 0,
    latitude: 0,
  });

  const [responseDetail, setResponseDetail] = useState(null);

  return (
    <div className="container rounded bg-secondary p-3 w-25">
      <h2 className="text-light text-center">{formTitle}</h2>
      <Form
        onSubmit={(event) => {
          setResponseDetail(handleSubmit(event, detail));
        }}
      >
        <Form.Group className="mb-3" controlId="formRedCount">
          <Form.Label className="text-light">Red Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Red Count"
            onChange={(e) => setDetail({ ...detail, redCount: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formYellowCount">
          <Form.Label className="text-light">Yellow Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Yellow Count"
            onChange={(e) =>
              setDetail({ ...detail, yellowCount: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGreenCount">
          <Form.Label className="text-light">Green Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Green Count"
            onChange={(e) =>
              setDetail({ ...detail, greenCount: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLongitude">
          <Form.Label className="text-light">Longitude</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Longitude"
            onChange={(e) =>
              setDetail({ ...detail, longitude: e.target.value })
            }
            step="any"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLatitude">
          <Form.Label className="text-light">Latitude</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Latitude"
            onChange={(e) => setDetail({ ...detail, latitude: e.target.value })}
            step="any"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {responseDetail && <DetailResponse />}
    </div>
  );
}

export default DetailForm;
