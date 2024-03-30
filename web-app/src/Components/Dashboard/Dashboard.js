import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import AuthContext from "../AuthContext/AuthContext.js";
import { UNAUTHORIZED } from "../../Utils/UserStates.js";

import {
  ConfigProvider,
} from "antd";

function Dashboard() {
    const { userImpl } = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        if (userImpl == UNAUTHORIZED) {
          navigate("/");
        } else if (userImpl) {
          navigate("/dashboard");
        }
      }, [navigate]);

    return (  <>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#786AC9",
            },
          }}
        >
          
        </ConfigProvider>
      </>
    );
}

export default Dashboard;