import React, { useContext, useEffect, useState, setState } from "react";
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
import Joyride from 'react-joyride';

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

    const steps = [
        {
            target: "html",
            content: "Welcome to Finsights! This is your dashboard where you can view your favorite stocks.",
            disableBeacon: true,
            placement: 'center'
        },
        {
            target: ".favorite-input",
            content: "Add a stock to your favorites by typing in the ticker symbol and pressing enter (e.g. AAPL).",
        },
        {
            target: ".favorite-section",
            content: "Once you have a stock in your favorites, it will display here. Click on it to learn more about that stock and advice on investing.",
        }
    ]

    return (
        <>
            <ConfigProvider
                theme={{
                    token: { colorPrimary: "#786AC9" },
                }}
            >
                <Layout className="white">
                    <Navbar tab={"2"} />
                    {/* <Regex /> */}
                    <Content className="mx-auto text-center" style={{ textAlign: "center", alignContent: "center" }}>
                        <h1 style={{ fontSize: "2.5rem" }}
                            className="typewriter"
                        >
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

                        <Row gutter={[8, 8]} justify="center" className="favorite-section">
                            <div >
                                {favorites.map((company) => (
                                    <CompanyCard key={favorites.indexOf(company)} ticker={company} navigate={navigate} />
                                ))}
                            </div>
                        </Row>
                    </Content>
                </Layout>
            </ConfigProvider>
            <Joyride steps={steps}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
            />
        </>
    );
}

export default Dashboard;
