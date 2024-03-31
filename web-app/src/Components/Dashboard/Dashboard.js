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

import {
    Row,
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
        if (user) {
            setId(user.uid);
        }
        RequestUtils.get("/get_favorites/" + user.uid).then((response) => {
            response.json().then((data) => {
                setFavorites(data);
                // data.forEach((ticker, index) => {
                //     RequestUtils.get("/company/" + ticker).then((response) => {
                //         response.json().then(
                //             (companyData) => {
                //                 setFavorites(prevFavorites => [
                //                     ...prevFavorites,
                //                     { "name": companyData["name"], "ticker": ticker, "id": index }
                //                 ]);
                //             }
                //         );
                //     });
                // });
            });
        });
    }, [user]);


    const { Content } = Layout;

    return (
        <>
            <ConfigProvider
                theme={{
                    token: { colorPrimary: "#786AC9" },
                }}
            >
                <Layout className="">
                    <Navbar tab={"2"} />
                    <Content className="mx-auto text-center"> {/* Add 'text-center' class for center alignment */}
                        <h1>Welcome back, user!</h1>
                        <h1>Your favorite companies</h1>
                        <Row gutter={[16, 16]} justify="center"> {/* Add 'justify="center"' for center alignment */}
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
