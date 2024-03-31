import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";

import { UNAUTHORIZED } from "../../Utils/UserStates.js";
import AuthContext from "../AuthContext/AuthContext.js";
import Navbar from "../Navbar/Navbar.js";
import CompanyCard from "../CompanyCard/CompanyCard.js";
import { auth } from "../../Firebase.js";
import dummyFavorites from "./dummyFavorites.js"; // Import the dummy data
import MiniChart from "../TradingChart/MiniChart.jsx";
import "./Dashboard.css";
import RequestUtils from "../../Utils/RequestUtils";
import Typewriter from "typewriter-effect";

import {
    Row,
    Card,
    ConfigProvider,
    Layout,
    theme,
} from "antd";
import Meta from "antd/es/card/Meta.js";
import Regex from "../regex.js"


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
    const [id, setId] = useState(0);


    useEffect(() => {
        if (user) {
            setId(user.uid);
            RequestUtils.get("/get_favorites/" + user.uid).then((response) => {
                response.json().then((data) => {
                    setFavorites(data);
                });
            });
        }
    }, [user]);


    const { Content } = Layout;

    return (
        <>
            <ConfigProvider
                theme={{
                    token: { colorPrimary: "#786AC9" },
                }}
            >
                <Layout className="white">
                    <Navbar tab={"2"} />
                    <Regex />
                    <Content className="mx-auto text-center" style={{  textAlign: "center", alignContent: "center" }}>
                        <h1 style={{ fontSize: "2.5rem" }}>
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .changeDelay(40)
                                        .changeDeleteSpeed(40)
                                        .typeString("Welcome to your <i>finsights</i>")
                                        .pauseFor(1000)
                                        .deleteChars(9)
                                        .typeString("<i>investments</i>")
                                        .pauseFor(1000)
                                        .deleteChars(11)
                                        .typeString("<i>stocks</i>")
                                        .pauseFor(1000)
                                        .deleteChars(6)
                                        .typeString("<i>finsights</i>")
                                        .start();
                                }}
                            />
                        </h1>

                        <Row gutter={[8, 8]} justify="center">
                            {favorites.map((company) => (
                                <CompanyCard key={favorites.indexOf(company)} ticker={company} navigate={navigate} />
                            ))}
                        </Row>
                    </Content>
                </Layout>
            </ConfigProvider>
        </>
    );
}

export default Dashboard;
