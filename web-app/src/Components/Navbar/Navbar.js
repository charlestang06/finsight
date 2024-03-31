import logoImg from "../../assets/images/public.png";

import {
    BellOutlined,
    HeartOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, Input, Form, ConfigProvider } from "antd";
import { BiBuildingHouse, BiLogOut, BiSolidCity } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import { useEffect, useState, useContext } from "react";
import { auth, logout } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import RequestUtils from "../../Utils/RequestUtils";

import AuthContext from "../AuthContext/AuthContext";
import { UNAUTHORIZED } from "../../Utils/UserStates.js";
import { tickers } from "../../Utils/tickers.js";
const { Header, Sider, Content } = Layout;


function Navbar(props) {
    let navigate = useNavigate();
    let [user, loading] = useAuthState(auth);
    let [tab, setTab] = useState("1");
    let [addFavorite, setAddFavorite] = useState("");
    const { setUserImpl } = useContext(AuthContext);
    let [allFavorites, setAllFavorites] = useState([]);

    let [id, setID] = useState("");

    useEffect(() => {
        if (user) {
            setID(user.uid);
            RequestUtils.get("/get_favorites/" + user.uid).then((response) => {
                response.json().then((data) => {
                    setAllFavorites(data);
                });
            });
        }
    }, [user]);

    const sendFavorite = () => {
        if (user) {
            if (tickers.includes(addFavorite) && !allFavorites.includes(addFavorite) && addFavorite !== "") {
                RequestUtils.post("/post_favorites?user_id=" + user.uid, [...allFavorites, addFavorite]).then((response) => {
                    console.log(response);
                });
                setAddFavorite("");
                window.location.reload();
            }
        }
    }

    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0))", // Added vertical gradient
                backdropFilter: "blur(5px)",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
                height: "72px",
            }}
        >
            <div className="logo-container" onClick={() => navigate("/dashboard")}>
                <img src={logoImg} alt="Logo" className="logo" />
            </div>


            <div className="right-buttons">
                <Form onFinish={sendFavorite} style={{ marginRight: "1rem" }}>
                    <Form.Item className="favorite-input">
                        <Input size="large" placeholder="  Add to favorites"
                            style={{ marginRight: "1rem", marginTop: 0 }}
                            prefix={<HeartOutlined />} value={addFavorite}
                            onChange={(e) => { setAddFavorite(e.target.value) }} />
                    </Form.Item>
                </Form>

                <Button onClick={() => {
                    navigate("/");
                    logout();
                }} className="nobg">
                    <LogoutOutlined style={{ fontSize: "20px", color: "black" }} />
                </Button>
            </div>
        </Header >
    );
}

export default Navbar;