import axios from "axios";

export async function getServerSideProps() {

  const apiKey = 'api_2r7XEIzH108gXnIOSxl2fo.7gEiGBa8Nfj9Qo4hC81jSQ';
  const basicAuth = btoa(`${apiKey}`);
  console.log("-----basicAuth----", basicAuth);
  const response = await axios.get('https://api.close.com/api/v1/activity/task_completed', {
    headers: {
      'Authorization': `Basic ${basicAuth}`, // Replace with your API key
      'Content-Type': 'application/json'
    },
  });

  const data = await response;

  return data
}