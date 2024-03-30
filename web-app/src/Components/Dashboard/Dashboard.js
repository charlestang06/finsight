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
        setFavorites(dummyFavorites);
    }, [id]);

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
                    <Content className="mx-auto" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                        <h1>Welcome back, user!</h1>
                        <div>
                            <h2>
                                Favorites
                            </h2>
                            {favorites.map((company) => (
                                <CompanyCard key={company.id} company={company} navigate={navigate} />
                            ))}
                        </div>
                    </Content>
                </Layout>
            </ConfigProvider>
        </>
    );
}

export default Dashboard;