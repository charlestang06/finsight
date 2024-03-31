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
    Skeleton,
} from "antd";
import { HomeOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import Markdown from 'react-markdown';
import Typewriter from 'typewriter-effect';
import AIWriter from "react-aiwriter";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UNAUTHORIZED } from "../../Utils/UserStates";
import AuthContext from "../AuthContext/AuthContext";
import Navbar from "../Navbar/Navbar";
import "./Company.css";
import RequestUtils from "../../Utils/RequestUtils";
import MediumChart from "../TradingChart/MediumChart";
import FinInfo from "../TradingChart/FinInfo";

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
    const [analysis, setAnalysis] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [typing, setTyping] = useState(0);

    useEffect(() => {
        RequestUtils.get("/company/" + id).then((response) => {
            response.json().then((data) => {
                setCompany(data);
            });
        });
    }, []);

    useEffect(() => {
        setAnalysis("");
        setTyping(0);
        setMessageHistory([]);
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

    useEffect(() => {
        if (typing >= 0) {
            let intervalId = setInterval(function() {
                const typeRef = document.querySelector(".typing-reference");
                const typeBot = document.querySelector(".message-bot");
                if (typeRef && 
                    typeBot &&
                    typeRef.innerHTML.substring(0, typeRef.innerHTML.length) === typeBot.innerHTML.substring(0, typeRef.innerHTML.length)) {
                    setTyping(-1);
                    console.log("finished")
                    clearInterval(intervalId);
                }
            }, 500);
         }
    }, [typing]);

    function askQuestion(e) {
        e.stopPropagation();
        let message = currentMessage;
        setMessageHistory([...messageHistory, { message: message, sender: "user" }]);
        RequestUtils.get("/getChat?ticker=" + id + "&length=" + days + "&query=" + message).then((response) => {
            response.json().then((data) => {
                setMessageHistory([...messageHistory, { message: message, sender: "user" }, { message: data.response, sender: "bot" }]);
                setTyping(messageHistory.length-1);
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
                <Navbar tab={"2"} />

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
                        >
                            <Row style={{ width: "100%", display: "flex" }}>
                                <Col span={11} style={{ marginRight: "36px" }} >
                                    <MediumChart ticker={id} />
                                    <FinInfo ticker={id} />
                                    
                                </Col>

                                <Col span={12}>
                                    <h1 style={{ marginBottom: "0.75rem" }}>
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

                                    <div style={{ height: '100%' }}>
                                        <div className="message-history"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "1rem",
                                                marginBottom: "1rem",
                                                overflowY: "auto",
                                            }}
                                        >

                                            {messageHistory.map((message, index) => (
                                                <div key={index} className={message.sender === "bot" ? "message-bot" : "message-user"}>
                                                    {typing === index ? 

                                                    <>
                                                        <AIWriter className="message-bot">
                                                            <Markdown>{message.message}</Markdown>
                                                        </AIWriter> 
                                                        <div style={{display: "none"}}>
                                                            <Markdown className="typing-reference">{message.message}</Markdown>
                                                        </div>
                                                    </>
                                                    :
                                                    <Markdown>{message.message}</Markdown>
                                                    }
                                                </div>
                                            ))}

                                            {messageHistory.length % 2 === 0 ? <Typewriter
                                                options={{
                                                    strings: ['...'],
                                                    autoStart: true,
                                                    loop: true,
                                                  }}
                                                /> : <></>}
                                        </div>
                                            <div className="message-input" style={{ display: "flex", gap: "1rem" }}>
                                                <TextArea autoSize className="ask-box" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} disabled={typing >= 0 || messageHistory.length % 2 == 0} placeholder="Ask a clarifying question..." />
                                                <Button type="primary" onClick={(e) => { askQuestion(e) }} disabled={typing >= 0 || messageHistory.length % 2 == 0}><SendOutlined /></Button>
                                            </div>
                                    </div>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>

                </Content>
            </Layout >
        </ConfigProvider >

    );
}

export default Company;