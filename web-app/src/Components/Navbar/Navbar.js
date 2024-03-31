import logoImg from "../../assets/images/public.png";

import {
    BellOutlined,
    HeartOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, Input, Form, ConfigProvider} from "antd";
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
    const tickers = [
        "MMM", "ABT", "ABBV", "ABMD", "ACN", "ATVI", "ADBE", "AMD", "AAP", "AES",
        "AFL", "A", "APD", "AKAM", "ALK", "ALB", "ARE", "ALXN", "ALGN", "ALLE",
        "LNT", "ALL", "GOOGL", "GOOG", "MO", "AMZN", "AMCR", "AEE", "AAL", "AEP",
        "AXP", "AIG", "AMT", "AWK", "AMP", "ABC", "AME", "GME", "AMGN", "APH", "ADI",
        "ANSYS", "ANTM", "AON", "APA", "AAPL", "AMAT", "APTV", "ADM", "ARNC",
        "ANET", "AJG", "AIZ", "T", "ATO", "ADSK", "ADP", "AZO", "AVB", "AVY",
        "BKR", "BLL", "BAC", "BK", "BAX", "BDX", "BRK.B", "BBY", "BIO", "BIIB",
        "BLK", "BA", "BKNG", "BWA", "BXP", "BSX", "BMY", "AVGO", "BR", "BF.B",
        "CHRW", "COG", "CDNS", "CZR", "CPB", "COF", "CAH", "KMX", "CCL", "CARR",
        "CTLT", "CAT", "CBOE", "CBRE", "CDW", "CE", "CNC", "CNP", "CERN", "CF",
        "SCHW", "CHTR", "CVX", "CMG", "CB", "CHD", "CI", "CINF", "CTAS", "CSCO",
        "C", "CFG", "CTXS", "CLX", "CME", "CMS", "KO", "CTSH", "CL", "CMCSA",
        "CMA", "CAG", "COP", "ED", "STZ", "COO", "CPRT", "GLW", "CTVA", "COST",
        "CCI", "CSX", "CMI", "CVS", "DHI", "DHR", "DRI", "DVA", "DE", "DAL",
        "XRAY", "DVN", "DXCM", "FANG", "DLR", "DFS", "DISCA", "DISCK", "DISH",
        "DG", "DLTR", "D", "DPZ", "DOV", "DOW", "DTE", "DUK", "DRE", "DD", "DXC",
        "EMN", "ETN", "EBAY", "ECL", "EIX", "EW", "EA", "EMR", "ENPH", "ETR",
        "EOG", "EFX", "EQIX", "EQR", "ESS", "EL", "ETSY", "EVRG", "ES", "RE",
        "EXC", "EXPE", "EXPD", "EXR", "XOM", "FFIV", "FB", "FAST", "FRT", "FDX",
        "FIS", "FITB", "FE", "FRC", "FISV", "FLT", "FLIR", "FLS", "FMC", "F",
        "FTNT", "FTV", "FBHS", "FOXA", "FOX", "BEN", "FCX", "GPS", "GRMN", "IT",
        "GNRC", "GD", "GE", "GIS", "GM", "GPC", "GILD", "GL", "GPN", "GS", "GWW",
        "HAL", "HBI", "HIG", "HAS", "HCA", "PEAK", "HSIC", "HSY", "HES", "HPE",
        "HLT", "HOLX", "HD", "HON", "HRL", "HST", "HWM", "HPQ", "HUM", "HBAN",
        "HII", "IEX", "IDXX", "INFO", "ITW", "ILMN", "INCY", "IR", "INTC", "ICE",
        "IBM", "IP", "IPG", "IFF", "INTU", "ISRG", "IVZ", "IPGP", "IQV", "IRM",
        "JKHY", "J", "JBHT", "SJM", "JNJ", "JCI", "JPM", "JNPR", "KSU", "K",
        "KEY", "KEYS", "KMB", "KIM", "KMI", "KLAC", "KHC", "KR", "LHX", "LH",
        "LRCX", "LW", "LVS", "LEG", "LDOS", "LEN", "LLY", "LNC", "LIN", "LYV",
        "LKQ", "LMT", "L", "LOW", "LUMN", "LYB", "MTB", "MRO", "MPC", "MKTX",
        "MAR", "MMC", "MLM", "MAS", "MA", "MKC", "MXIM", "MCD", "MCK", "MDT",
        "MRK", "MET", "MTD", "MGM", "MCHP", "MU", "MSFT", "MAA", "MHK", "TAP",
        "MDLZ", "MPWR", "MNST", "MCO", "MS", "MOS", "MSI", "MSCI", "NDAQ", "NTAP",
        "NFLX", "NWL", "NEM", "NWSA", "NWS", "NEE", "NLSN", "NKE", "NI", "NSC",
        "NTRS", "NOC", "NLOK", "NCLH", "NOV", "NRG", "NUE", "NVDA", "NVR", "NXPI",
        "ORLY", "OXY", "ODFL", "OMC", "OKE", "ORCL", "OTIS", "PCAR", "PKG", "PH",
        "PAYX", "PAYC", "PYPL", "PNR", "PBCT", "PEP", "PKI", "PRGO", "PFE", "PM",
        "PSX", "PNW", "PXD", "PNC", "POOL", "PPG", "PPL", "PFG", "PG", "PGR",
        "PLD", "PRU", "PTC", "PEG", "PSA", "PHM", "PVH", "QRVO", "PWR", "QCOM",
        "DGX", "RL", "RJF", "RTX", "O", "REG", "REGN", "RF", "RSG", "RMD", "RHI",
        "ROK", "ROL", "ROP", "ROST", "RCL", "SPGI", "CRM", "SBAC", "SLB", "STX",
        "SEE", "SRE", "NOW", "SHW", "SPG", "SWKS", "SNA", "SO", "LUV", "SWK",
        "SBUX", "STT", "STE", "SYK", "SIVB", "SYF", "SNPS", "SYY", "TMUS", "TROW",
        "TTWO", "TPR", "TGT", "TEL", "TDY", "TFX", "TER", "TSLA", "TXN", "TXT",
        "TMO", "TJX", "TSCO", "TT", "TDG", "TRV", "TRMB", "TFC", "TWTR", "TYL",
        "TSN", "UDR", "ULTA", "USB", "UAA", "UA", "UNP", "UAL", "UNH", "UPS",
        "URI", "UHS", "UNM", "VLO", "VTR", "VRSN", "VRSK", "VZ", "VRTX", "VFC",
        "VIAC", "VTRS", "V", "VNT", "VNO", "VMC", "WRB", "WAB", "WMT", "WBA", "DIS",
        "WM", "WAT", "WEC", "WFC", "WELL", "WST", "WDC", "WU", "WRK", "WY", "WHR",
        "WMB", "WLTW", "WYNN", "XEL", "XLNX", "XYL", "YUM", "ZBRA", "ZBH", "ZION",
        "ZTS"
    ]
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
                RequestUtils.post("/post_favorites?user_id=" + user.uid, { "favorites": [...allFavorites, addFavorite] }).then((response) => {
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
                backgroundColor: "#faece0",
                paddingTop: "1rem",
            }}
        >
            <div className="logo-container" onClick={() => navigate("/dashboard")}>
                <img src={logoImg} alt="Logo" className="logo" />
            </div>


            <div className="right-buttons">
                <Form onFinish={sendFavorite} style={{ marginRight: "1rem" }}>
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

                <Button onClick={() => {
                    navigate("/");
                    logout();
                }} className="nobg">
                    <LogoutOutlined style={{ fontSize: "20px", color: "black" }} />
                </Button>
            </div>
        </Header>
    );
}

export default Navbar;