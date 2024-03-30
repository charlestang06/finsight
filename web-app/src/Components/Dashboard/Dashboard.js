import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UNAUTHORIZED } from "../../Utils/UserStates.js";
import AuthContext from "../AuthContext/AuthContext.js";
import "./Dashboard.css";
import { auth } from "../../Firebase.js";
import Navbar from "../Navbar/Navbar";

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

    const { userImpl } = useContext(AuthContext);

    const [favorites, setFavorites] = useState([]);
    const [id, setId] = useState(auth.currentUser.uid);

    let navigate = useNavigate();

    useEffect(() => {
        if (userImpl == UNAUTHORIZED) {
          navigate("/");
        } else if (userImpl) {
          navigate("/dashboard");
        }
      }, [navigate]);

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

    return (  <>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#786AC9",
            },
          }}
        >
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
        </ConfigProvider>
      </>
    );
}

export default Dashboard;