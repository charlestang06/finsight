import {
    Breadcrumb,
    Col,
    ConfigProvider,
    DatePicker,
    Input,
    Layout,
    Row,
    theme,
    Card,
    Divider,
    Tabs,
    Select,
    Button,
    Space,
} from "antd";
import { HomeOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import Markdown from 'react-markdown';

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UNAUTHORIZED } from "../../Utils/UserStates";
import AuthContext from "../AuthContext/AuthContext";
import Navbar from "../Navbar/Navbar";
import "./Company.css";
import RequestUtils from "../../Utils/RequestUtils";
import MediumChart from "../TradingChart/MediumChart";

const { Content } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

function Company() {
    // AUTHENTICATION
    const { userImpl } = useContext(AuthContext);
    let params = useParams();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    let navigate = useNavigate();

    const [id, setId] = useState(params.id);
    const [company, setCompany] = useState({
        name: "",
        description: "",
        website: "",
        marketCap: 0,
        links: [],
    });
    const [days, setDays] = useState(1); // 1, 7, 30, 90, 365
    const [analysis, setAnalysis] = useState("lorem ipsum dolor sit amet, consectetur adipiscing elit.");
    const [messageHistory, setMessageHistory] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        RequestUtils.get("/company/" + id).then((response) => {
            response.json().then((data) => {
                setCompany(data);
            });
        });
    }, []);

    useEffect(() => {
        RequestUtils.get("/get?ticker=" + id + "&length=" + days).then((response) => {
            response.json().then((data) => {
                setAnalysis(data.response);
            });
        });
    }, [id, days, company]);

    useEffect(() => {
        setMessageHistory([{ message: analysis, sender: "bot" }]);
    }, [analysis]);

    // CHECK USERIMPL FOR USER
    useEffect(() => {
        if (userImpl == UNAUTHORIZED) {
            navigate("/");
        }
    }, [navigate]);

    const { TabPane } = Tabs;

    function askQuestion(e) {
        e.stopPropagation();
        let message = currentMessage;
        setMessageHistory([...messageHistory, { message: message, sender: "user" }]);
        RequestUtils.get("/getChat?ticker=" + id + "&length=" + days + "&query=" + message).then((response) => {
            response.json().then((data) => {
                setMessageHistory([...messageHistory, { message: message, sender: "user" }, { message: data.response, sender: "bot" }]);
            });
        });
        setCurrentMessage("");
    }

    // RENDER
    return (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#7E70CC",
            },
        }}
    >
    <Layout className="white" style={{}}>
        <Navbar tab={"2"}/>
        
            <Content
                style={{
                    margin: 0,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    display: "flex",
                    justifyContent: "center",
                }}
                className="mx-auto"
            >
            <Layout
                style={{
                    padding: "24px 40px 24px",
                }}
                className="white"
            >
                {/* <Breadcrumb style={{ margin: "16px 0 32px", }}>
                    {<Breadcrumb.Item><a href="/dashboard">Back to dashboard</a></Breadcrumb.Item>}
                   
                </Breadcrumb>  */}
                <Content
                    style={{
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        margin: 0,
                    }}
                    className=""
                    >
                        
                    <Row style={{width: "100%", display: "flex"}}>
                        <Col span={11} style={{ marginRight: "36px" }} >
                        <Card  style={{}} >
                            <div className="profile-card">

                            <Meta
                                title={id}
                                description={company.name}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            />
                            </div>

                            <Divider />

                            <div>
                                <div style={{ marginBottom: "5px" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: "1rem"
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <HomeOutlined style={{ marginRight: 8 }} />
                                            <span style={{ fontWeight: "bold" }}>Website</span>
                                        </div>
                                        <span style={{ marginLeft: 8 }}><a href={company.website}>{company.website}</a> </span>
                                    </div>
                                </div>
                                    <MediumChart ticker={id} />
                            </div>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <h1 style={{ margin: "0 0 0" }}>
                                Your 
                                <Select
                                    defaultValue="1"
                                    style={{
                                        margin: "0 16px",
                                        width: 120,
                                    }}
                                    onChange={(value) => setDays(value)}
                                    options={[
                                        { value: "1", label: "Daily" },
                                        { value: "7", label: "Weekly" },
                                        { value: "30", label: "Monthly" },
                                        { value: "90", label: "Quarterly" },
                                        { value: "365", label: "Yearly" },
                                    ]}
                                />
                                Report
                            </h1>
                        
                            <div style={{height: '100%'}}>
                                <div className="message-history" 
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                        marginBottom: "1rem",
                                        overflowY: "auto",
                                    }}
                                    >
                                    {messageHistory.map((message) => (
                                        <Markdown className="message">
                                            {/* <span style={{fontWeight: "bold"}}>{message.sender}: </span> */}
                                           {message.message}
                                        </Markdown>
                                    ))}
                                </div>
                                <div className="message-input" style={{display: "flex", gap: "1rem"}}>
                                    <TextArea autoSize className="ask-box" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Ask a clarifying question..." />
                                    <Button type="primary" onClick={(e) => {askQuestion(e)}}><SendOutlined /></Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>

                    </Content>
            </Layout>
        </ConfigProvider>
    );
}

export default Company;