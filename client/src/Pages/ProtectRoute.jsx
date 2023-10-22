import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetAccessToken } from "./GetAccessToken";

const ProtectRoute = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    Req();
  }, []);

  async function Req() {
    try {
      let res = await axios.get("http://localhost:4000/protectedroute", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
      });
      if (res?.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      if (error.response.status === 403) {
        await GetAccessToken();
      }
    }
  }
  return (
    <div>
      <h1>welcome {data}</h1>
    </div>
  );
};

export default ProtectRoute;
