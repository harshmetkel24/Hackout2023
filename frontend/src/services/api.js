import axios from "axios";

// const API_URI = "https://pms-hackout23.onrender.com";
const API_URI = "http://localhost:8000";

export const Login = async (data) => {
  try {
    const response = await axios.post(`${API_URI}/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error while login", error.message);
  }
};

export const allocateResources = async (event, data) => {
  event.preventDefault();
  const reqData = {
    rCount: data.redCount,
    yCount: data.yellowCount,
    gCount: data.greenCount,
    log: data.longitude,
    lat: data.latitude,
  };
  try {
    const response = await axios.post(
      `${API_URI}/hostpitalAllocation`,
      reqData,
      {
        withCredentials: true,
      }
    );

    console.log(response);
    const response2 = await axios.patch(`${API_URI}/update/hospitals`, { withCredentials: true });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const allocateLabs = async (event, data) => {
  event.preventDefault();
  const reqData = {
    rCount: data.redCount,
    yCount: data.yellowCount,
    gCount: data.greenCount,
    log: data.longitude,
    lat: data.latitude,
  };

  try {
    const response = await axios.post(`${API_URI}/labsAllocation`, reqData, {
      withCredentials: true,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
