import axios from "axios";

const testApi = async () => {
  const response = await axios.get("https://0332-35-233-161-96.ngrok-free.app");
  console.log(response.data);
};

testApi();
