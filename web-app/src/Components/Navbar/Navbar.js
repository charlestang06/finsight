import logoImg from "../../assets/images/public.png";

import {
    BellOutlined,
    HeartOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, Input, Form } from "antd";
import { BiBuildingHouse, BiLogOut, BiSolidCity } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import { useEffect, useState, useContext } from "react";
import { auth, logout } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import RequestUtils from "../../Utils/RequestUtils";

import AuthContext from "../AuthContext/AuthContext";
import { UNAUTHORIZED } from "../../Utils/UserStates.js";
const { Header, Sider, Content } = Layout;



function Navbar(props) {
    let navigate = useNavigate();
    let [user, loading] = useAuthState(auth);
    let [tab, setTab] = useState("1");
    let [addFavorite, setAddFavorite] = useState("");
    const tickers = ["MSFT", "AAPL", "NVDA", "GOOG", "GOOGL", "AMZN", "META", "BRK.B", "LLY", "AVGO", "JPM", "V", "TSLA", "WMT", "XOM", "UNH", "MA", "PG", "JNJ", "HD", "ORCL", "MRK", "COST", "ABBV", "BAC", "CVX", "CRM", "AMD", "KO", "NFLX", "PEP", "ADBE", "DIS", "LIN", "TMO", "ACN", "WFC", "MCD", "CSCO", "ABT", "TMUS", "GE", "QCOM", "INTC", "DHR", "CAT", "INTU", "VZ", "IBM", "CMCSA", "AMAT", "AXP", "UBER", "BX", "TXN", "PFE", "NOW", "MS", "AMGN", "UNP", "COP", "LOW", "NKE", "PM", "ISRG", "SPGI", "SYK", "GS", "HON", "SCHW", "NEE", "MU", "RTX", "LRCX", "UPS", "T", "ETN", "BLK", "BKNG", "PGR", "C", "ELV", "PLD", "BA", "MDT", "TJX", "DE", "BMY", "LMT", "VRTX", "REGN", "ABNB", "CB", "SBUX", "CI", "ADP", "MMC", "BSX", "CVS", "ADI", "KLAC", "FI", "MDLZ", "AMT", "PANW", "GILD", "ANET", "SHW", "HCA", "SNPS", "WM", "CDNS", "TGT", "ITW", "CMG", "ICE", "SLB", "SO", "EQIX", "CME", "GD", "ZTS", "MO", "DUK", "EOG", "CL", "MAR", "MPC", "CSX", "NOC", "PYPL", "MCO", "BDX", "PH", "FDX", "MCK", "PSX", "CTAS", "USB", "APH", "TDG", "TT", "FCX", "ORLY", "AON", "ECL", "PCAR", "EMR", "PNC", "NXPI", "MNST", "PXD", "RSG", "ROP", "SMCI", "MSI", "MMM", "SPG", "CEG", "OXY", "NSC", "EW", "COF", "VLO", "ADSK", "CPRT", "EL", "TFC", "PSA", "GWW", "STZ", "ROST", "AFL", "LULU", "MCHP", "URI", "ODFL", "NUE", "WMB", "LEN", "HES", "OKE", "O", "IQV", "CCI", "DLR", "ALL", "SRE", "AEP", "IDXX", "KHC", "TEL", "JCI", "MSCI", "PAYX", "FAST", "AMP", "PCG", "KMB", "BK", "FIS", "A", "AME", "PRU", "CNC", "CHTR", "HUM", "KDP", "GEHC", "NEM", "D", "KR", "KVUE", "DOW", "MRNA", "KMI", "LHX", "SYY", "CTVA", "OTIS", "CMI", "HSY", "GIS", "CSGP", "YUM", "LVS", "COR"]

    const { setUserImpl } = useContext(AuthContext);
    let [allFavorites, setAllFavorites] = useState([]);

    let [id, setID] = useState("");

    useEffect(() => {
        if (user) {
            setID(user.uid);
        }
        RequestUtils.get("/get_favorites/" + user.uid).then((response) => {
            response.json().then((data) => {
                setAllFavorites(data);
            });
        });
        console.log(allFavorites)
    }, [user]);

    const sendFavorite = () => {
        console.log("sending favorite")
        if (tickers.includes(addFavorite) && addFavorite !== "") {
            setAllFavorites([...allFavorites, addFavorite]);
            console.log(allFavorites);
            RequestUtils.post("/post_favorites?user_id=" + user.uid, allFavorites).then((response) => {
                console.log(response);
            });
            setAddFavorite("");
            window.location.reload();
        }
    }

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
                <Form onFinish={sendFavorite} style={{marginRight:"1rem"}}>
                    <Form.Item>
                        <Input size="large" placeholder=" add to favorites"
                            style={{ marginRight: "1rem", marginTop: 0 }}
                            prefix={<HeartOutlined />} value={addFavorite}
                            onChange={(e) => { setAddFavorite(e.target.value) }} />
                    </Form.Item>
                </Form>
                {/* <Button
                    onClick={() => {
                        navigate("/profile/" + id);
                    }}
                    className="nobg"
                >
                    <UserOutlined
                        style={{ fontSize: "20px", color: "black", marginRight: "25px" }}
                    />
                </Button> */}

                <Button onClick={() => logout()} className="nobg">
                    <LogoutOutlined style={{ fontSize: "20px", color: "black" }} />
                </Button>
            </div>
        </Header>
    );
}

export default Navbar;