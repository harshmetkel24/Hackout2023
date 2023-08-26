import React, { useEffect, useState } from "react";
import { DetailForm } from "../../components";
import { getNearestHospitals } from "../../services/api";
import Table from "react-bootstrap/Table";
import Carousel from "react-bootstrap/Carousel";



export default function HomePage() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [hospitals, setHospitals] = useState(null);

  useEffect(() => {
    document.title = "Home Page";

    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }
    );


  }, []);
  return (
    <>
      <div className="container py-3 " style={{width:'60%'}}>
        <div className="d-flex justify-content-center align-items-center flex-column" >
          <button className="btn btn-primary" onClick={async (event) => {
            setHospitals([])
            setHospitals(await getNearestHospitals(event, { latitude, longitude }))
            console.log(hospitals)
          }}>Get Nearest Hopitals</button>

          {hospitals && hospitals.length === 0 && (<div className="spinner-border text-primary m-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>)}

          {hospitals && hospitals.length > 0 && (
            <>
              <h2 className="h2 my-3">Nearest 5 Hosptals from your locations are:</h2>
              <Table
                striped
                bordered
                hover
                variant="dark"
                className="m-3" >
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-center">Hospital Name</th>
                    <th className="text-center">Address</th>
                    <th className="text-center">Bed counts</th>
                    <th className="text-center">Distance (Kms)</th>
                    <th className="text-center">Duration (Mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((hospital, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{hospital.hospital.name}</td>
                      <td className="text-center">{hospital.hospital.address}</td>
                      <td className="text-center">{hospital.hospital.capacity}</td>
                      <td className="text-center">{Math.ceil(hospital.distance / 1000)}</td>
                      <td className="text-center">{Math.ceil(hospital.duration / 60)}</td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </>
          )}

          <Carousel className="m-3" variant="dark" interval={5000}>
            <Carousel.Item>
              <img
                style={{ height: '350px' }}
                src="./assets/img1.jpeg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Goverment Schemes</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ height: '350px' }}
                src="./assets/img2.jpeg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Aayushmaan Bharat Yojana</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                style={{ height: '350px' }}
                src="./assets/img3.jpeg"
                alt="Thirm slide"
              />
              <Carousel.Caption>
                <h3>PM Jay Yojana</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

        </div>
      </div >
    </>
  );
}
