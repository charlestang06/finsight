<<<<<<< HEAD
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
=======
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UNAUTHORIZED } from "../../Utils/UserStates.js";
import AuthContext from "../AuthContext/AuthContext.js";
import "./Dashboard.css";
import { auth } from "../../Firebase.js";
import Navbar from "../Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Card,
  ConfigProvider,
  Layout,
  theme,
} from "antd";
import Meta from "antd/es/card/Meta.js";


function Dashboard() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    let [user, loading] = useAuthState(auth);

    let navigate = useNavigate();

    
    // TODO: this doesn't work, fix redirect
    useEffect(() => {
      if ((!user && !loading)) {
        navigate("/");
      }
    }, [user, loading]);

    const [favorites, setFavorites] = useState([]);
    const [id, setId] = useState(auth.currentUser.uid);

    useEffect(() => {
      setFavorites([{
          name: "Company 1",
          ticker: "C1",
          id: 1
        },
      ])
        // RequestUtils.get("/favorites?user=" + id).then((response) => {
        //   setFavorites(response.data);
        // });
    }, [id]);

    const { Content } = Layout;
>>>>>>> 08d596aa614caf2bd3e5a30adb64adb6bfee3f21

    return (  <>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#786AC9",
            },
          }}
        >
<<<<<<< HEAD
          
=======
          <Layout className="">
              <Navbar tab={"2"}/>
              <Layout
                  className=""
              >
                <Content
                    style={{
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        display: "flex",
                        justifyContent: "center",
                    }}
                    className="mx-auto"
                >
                  {favorites.map((card) => (
                    (
                      <Card
                        style={{ width: 300, margin: "1rem" }}
                        className="card1, glow"
                        onClick={() => {
                          navigate("/companies/" + card.id);
                        }}
                      >
                        <Meta
                          // avatar={
                          //   <Avatar
                          //     shape="square"
                          //     src={card.imageLink}
                          //     size={50}
                          //     style={{
                          //       marginRight: "15px",
                          //     }}
                          //   />
                          // }
                          title={card.ticker}
                          description={card.name}
                          style={{ marginBottom: 20 }}
                        />
                      </Card>
                    )
                  ))}
                  </Content>
              </Layout>
          </Layout>
>>>>>>> 08d596aa614caf2bd3e5a30adb64adb6bfee3f21
        </ConfigProvider>
      </>
    );
}

export default Dashboard;