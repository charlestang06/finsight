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

    const items1 = [
        {
            key: "1",
            icon: <BiBuildingHouse />,
            title: "Home",
            label: "Home",
            onClick: () => {

                navigate("/dashboard");
            },
        },
    ];

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
            <div className="demo-logo" />
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={[props.tab != undefined ? props.tab : "0"]}
                items={items1}
                style={{
                    flex: 1,
                    minWidth: 0,
                    fontSize: "16px",
                }}
            />
            
            {
            <>
            <Button className="nobg"
                // onClick={() => navigate("/notifications")}
                style={{ marginRight: "25px" }}
                onClick={() => setNotifsOpen(true)}
            >
                <BellOutlined style={{ fontSize: "20px", color: "black" }} />
            </Button>
            <Button onClick={() => {
                navigate("/profile/" + id);

            }} className="nobg">
                <UserOutlined style={{ fontSize: "20px", color: "black", marginRight: "25px" }} />
            </Button>
            
            </>}
            <Button onClick={() => logout()} className="nobg">
                <LogoutOutlined style={{ fontSize: "20px", color: "black", }} />
            </Button>
            <Modal title="Notifications" open={notifsOpen} onOk={() => setNotifsOpen(false)} onCancel={() => setNotifsOpen(false)}>
                <p>You have no notifications. Have a beautiful day!</p>
            </Modal>
        </Header>
    );
}

export default Navbar;