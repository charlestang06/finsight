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

    return (<>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#786AC9",
                },
            }}
        >
            <Layout className="">
                <Navbar tab={"2"} />
                <Content
                    className="mx-auto"
                >
                    {favorites.map((card) => (
                        <Card
                            style={{ width: 300, margin: "1rem" }}
                            className="card1, glow"
                            onClick={() => {
                                navigate("/companies/" + card.id);
                            }}
                        >
                            <Meta
                                title={card.ticker}
                                description={card.name}
                                style={{ marginBottom: 20 }}
                            />
                        </Card>
                    ))}
                </Content>
            </Layout>
        </ConfigProvider>
    </>
    );
}

export default Dashboard;