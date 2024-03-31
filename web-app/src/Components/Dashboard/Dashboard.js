import React, { useContext, useEffect, useState, setState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
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
import { DownOutlined } from "@ant-design/icons";
import Joyride from 'react-joyride';
import RocketImg from "../../assets/images/rocket.png";

import {
    Row,
    Card,
    ConfigProvider,
    Layout,
    theme,
    Image,
} from "antd";
import Meta from "antd/es/card/Meta.js";
import Regex from "../regex.js"


function Dashboard() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    let [user, loading] = useAuthState(auth);
    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // TODO: this doesn't work, fix redirect
    useEffect(() => {
        if ((!user && !loading)) {
            navigate("/");
        }
    }, [user, loading]);

    const [favorites, setFavorites] = useState([]);
    const [id, setId] = useState(0);
    const [joyrideCompleted, setJoyrideCompleted] = useState(true);

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

    const [joyrideState, setJoyrideState] = useState({
        run: !joyrideCompleted,
        steps: [
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
                target: ".favorite-section i",
                content: "Once you have a stock in your favorites, it will display here. Click on it to learn more about that stock and gain LLM-powered investing advice.",
            }
        ]
    })

    useEffect(() => {
        RequestUtils.get("/get_tutorial/" + user.uid).then((response) => {
            response.json().then((data) => {
                if (data >= 1) {
                    setJoyrideState((prevState) => ({
                        ...prevState,
                        run: false,
                    }));
                    setJoyrideCompleted(true);
                }
                else {
                    setJoyrideState((prevState) => ({
                        ...prevState,
                        run: true,
                    }));
                    setJoyrideCompleted(false)
                }
            });
        })
    }, []);

    // todo: fix scroll
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView();
        }
     }, []);

    useEffect(() => {
        if (!joyrideCompleted) {
            setTimeout(() => {
                setJoyrideState((prevState) => ({
                    ...prevState,
                    run: true,
                }));
            }, 1000)
        }
    })

    const handleJoyrideCallback = (data) => {
        const { action, status, type } = data;

        if (action === 'close' || status === 'finished') {
            RequestUtils.post("/post_tutorial?user_id=" + user.uid + "&tutorial=" + 1).then((response) => {
            });

            setJoyrideState((prevState) => ({
                ...prevState,
                run: false,
            }));
            setJoyrideCompleted(true);
            localStorage.setItem('joyrideCompleted', 'true');
        }
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    token: { colorPrimary: "#033D03", colorBgBase: "#FDF7F2", colorBgContainer: "white" },
                }}
            >
                <Layout className="" style={{ paddingBottom: "6rem" }}>
                    <Navbar tab={"2"} />
                    <Content className="mx-auto text-center"
                        style={{
                            textAlign: "center",
                            alignContent: "center",
                            backgroundColor: "#faebdf",
                            padding: "0 0 9vh",
                        }}
                    >
                        <h1 style={{ fontSize: "4rem", paddingTop: "6rem", paddingBottom: "1rem" }} className="typewriter">
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
                            /> </h1>

                        <h2 style={{  color: "grey", fontSize: "2rem", fontWeight: "light", paddingBottom: "2rem" }} className="typewriter">
                        😎 Your AI finance bro 😎
                        </h2>
                        <img id="box" src={RocketImg} width={200} alt="rocket" style={{float: "left", marginTop:"-1rem", marginLeft: "2rem"}}></img>
                        <h1 style={{ fontSize: "4rem", marginTop: "6rem", paddingBottom: "4rem" }}>
                            <a href="#favorites" style={{ color: "black" }}><DownOutlined className="floating" /></a>
                        </h1>


                        <h1 style={{ fontSize: "3rem", paddingBottom: "1rem", paddingTop: "2rem" }} id="favorites">  Your favorite <i>finsights</i></h1>
                        <Row gutter={[8, 8]} justify="center" className="favorite-section">
                            {favorites.length > 0 ? favorites.map((company) => (
                                <CompanyCard key={favorites.indexOf(company)} ticker={company} navigate={navigate} />
                            )) : <i style={{ fontSize: 16, color: "gray" }}>Add some of your favorite companies!</i>}
                        </Row>
                    </Content>
                </Layout>
            </ConfigProvider>
            {!joyrideCompleted ? <Joyride
                steps={joyrideState.steps}
                callback={handleJoyrideCallback}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                styles={{
                    options: {
                        primaryColor: "#033d03",
                    }
                }}
            /> : <></>}
        </>
    );
}

export default Dashboard;
