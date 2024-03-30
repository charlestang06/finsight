import logoImg from "../../assets/images/public.png";

import {
    BellOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal } from "antd";
import { BiBuildingHouse, BiLogOut, BiSolidCity } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { auth, logout } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import RequestUtils from "../../Utils/RequestUtils";
const { Header, Sider, Content } = Layout;



function Navbar(props) {
    let navigate = useNavigate();
    let [tab, setTab] = useState("1");

    let [user, loading] = useAuthState(auth);

    let [id, setID] = useState("");
    useEffect(() => {
        if (user) {
            setID(user.uid);
        }
    }, [user]);

    const [notifsOpen, setNotifsOpen] = useState(false);

    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            <div className="logo-container" onClick={() => navigate("/dashboard")}>
                <img src={logoImg} alt="Logo" className="logo" />
            </div>

            <div className="right-buttons">
                <Button
                    onClick={() => {
                        navigate("/profile/" + id);
                    }}
                    className="nobg"
                >
                    <UserOutlined
                        style={{ fontSize: "20px", color: "black", marginRight: "25px" }}
                    />
                </Button>

                <Button onClick={() => logout()} className="nobg">
                    <LogoutOutlined style={{ fontSize: "20px", color: "black" }} />
                </Button>
            </div>
        </Header>
    );
}

export default Navbar;