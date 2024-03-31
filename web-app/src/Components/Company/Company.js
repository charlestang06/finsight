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
    Dropdown,
    Drawer,
    Typography,
    Skeleton,
} from "antd";
import {
    InfoCircleOutlined,
} from "@ant-design/icons";
import { HomeOutlined, PlusOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";
import Scrollbars from "react-custom-scrollbars-2"
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
import Joyride from 'react-joyride';

import DefinitionDrawer from "./DefinitionDrawer";
import MessageComponent from "./MessageComponent";
import definitions from "./definitions.js";

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
    const markdownText = `
        # This is a Markdown document
        This document talks about **finance** and **technology**. 
    `;
    const [days, setDays] = useState(1); // 1, 7, 30, 90, 365
    const [analysis, setAnalysis] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [terms, setTerms] = useState({});
    const [openDrawer, setOpenDrawer] = useState(false);
    const [typing, setTyping] = useState(0);

    const [joyrideCompanyCompleted, setJoyrideCompanyCompleted] = useState(localStorage.getItem('joyrideCompanyCompleted') === 'true');


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

    useEffect(() => {
        let newTerms = {};
        if (messageHistory.length === 0 || messageHistory[0].message === "") return;

        for (let i = 0; i < messageHistory.length; i++) {
            const message = messageHistory[i].message.toLowerCase(); // Access the message here
            for (let term in definitions) {
                if (message.indexOf(term.toLowerCase()) >= 0) {
                    newTerms[term] = definitions[term];
                }
            }
        }
        setTerms(newTerms);
    }, [messageHistory]);

    // CHECK USERIMPL FOR USER
    useEffect(() => {
        if (userImpl == UNAUTHORIZED) {
            navigate("/");
        }
    }, [navigate]);

    const { TabPane } = Tabs;

    useEffect(() => {
        if (typing >= 0) {
            let intervalId = setInterval(() => {
                setTyping(currentTyping => {
                    if (currentTyping < 0) clearInterval(intervalId);
                    const typeRef = document.querySelector(".typing-reference");
                    const typeBots = document.querySelectorAll(".message-bot");
                    const typeBot = typeBots[typeBots.length - 1];
                    if (typeRef && 
                        typeBot &&
                        typeBot.innerHTML &&
                        typeBot.innerHTML.includes(typeRef.innerHTML)) {
                        clearInterval(intervalId);
                        return -1;
                    }
                    if (typeBot) typeBot.scrollIntoView(false);
                    return currentTyping; // Return the current state to keep it unchanged
                });
            }, 300);
        }
    }, [typing]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setJoyrideState((prevState) => ({
                ...prevState,
                run: true,
            }));
        }, 1300);

        return () => clearTimeout(timer);
    }, []);

    const handleJoyrideCallback = (data) => {
        const { action, status, type } = data;

        if (action === 'close' || status === 'finished') {
            setJoyrideState((prevState) => ({
                ...prevState,
                run: false,
            }));
            setJoyrideCompanyCompleted(true);
            localStorage.setItem('joyrideCompanyCompleted', 'true');
        }
    }

    function askQuestion(e) {
        e.stopPropagation();
        let message = currentMessage;
        setMessageHistory([...messageHistory, { message: message, sender: "user" }]);
        setCurrentMessage("");
        RequestUtils.get("/getChat?ticker=" + id + "&length=" + days + "&query=" + message).then((response) => {
            response.json().then((data) => {
                setTyping(messageHistory.length + 1);
                setMessageHistory([...messageHistory, { message: message, sender: "user" }, { message: data.response, sender: "bot" }]);
            });
        });
    }

    useEffect(() => {
        if (document.querySelector(".beep-boop")) document.querySelector(".beep-boop").scrollIntoView(false);
    }, [currentMessage]);

    const [joyrideState, setJoyrideState] = useState({
        run: false,
        steps: [
            {
                target: ".lhs",
                content: "On the left hand side, you can view a stock's chart and view other details about the stock.",
                disableBeacon: true,
                placement: 'right',
            },
            {
                target: ".rhs",
                content: "The right hand side displays the RAG-powered LLM analysis of the stock. Sort by daily, weekly, monthly, quarterly, or yearly reports to see the stock's performance over time. Click on the info icon to view relevant definitions.",
                placement: 'left',
            },
            {
                target: ".message-input",
                content: "You can also ask questions about the stock here and gradually gain a better understanding of the stock market!",
            }
        ]
    });

    // RENDER
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#033D03", colorBgBase: "#FDF7F2", colorBgContainer: "white"
                },
            }}
        >
            <DefinitionDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}
                terms={terms}></DefinitionDrawer>
            <Layout>
                <Navbar tab={"2"} />
                <Content
                    style={{
                        backgroundColor: "#faebdf",
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        padding: "0 0 9vh",
                    }}
                    className=""
                >
                    <Layout
                        style={{
                            padding: "24px 40px 24px",
                            width: "100%",
                        }}
                    >
                        <Content
                            style={{
                                minHeight: 280,
                                borderRadius: borderRadiusLG,
                                display: "flex",
                                justifyContent: "center",
                                height: "100%",
                                margin: 0,
                                width: "100%",
                            }}
                        >
                            <Row style={{ width: "100%", display: "flex", justifyContent: "center", height: "79vh" }}>
                                    <Col classname="lhs" span={10} style={{
                                        backgroundColor: 'white',
                                        borderRadius: 8,
                                        height: '100%',
                                        marginRight: 28,
                                        overflow: 'auto'
                                    }}>
                                        <Scrollbars style={{height: "100%"}}>
                                            <div style={{
                                                backgroundColor: 'white',
                                                borderRadius: 8,
                                                padding: "20px",
                                                height: '100%',
                                            }}>
                                                <MediumChart ticker={id} />
                                                <p></p>
                                                <FinInfo ticker={id} />
                                            </div>
                                        </Scrollbars>
                                    </Col>
                                
                                {/* TODO: implement custom scrollbar */}
                                <Col className="rhs" span={12} style={{ backgroundColor: 'white', borderRadius: 8, padding: 20, height: '100%' }}>
                                    <div style={{ display: "flex" }}>
                                        <h1 className="rhs-title" style={{ margin: "0 0 16px" }}>
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
                                        <Button style={{ marginLeft: "auto", border: "0" }} onClick={() => { setOpenDrawer(true) }}>
                                            <InfoCircleOutlined style={{ color: "#444444", fontSize: "2.1rem" }} />
                                        </Button>
                                    </div>

                                    <div className="message-container" style={{ height: 'calc(100% - 105px)', overflow: 'auto', lineHeight: "1.6em", marginLeft: "8px", paddingRight: "1rem" }}>
                                        <div className="message-history"
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "1rem",
                                                marginBottom: "1rem",
                                                overflowY: "auto",
                                                fontSize: "17px",
                                            }}
                                        >

                                            {messageHistory.map((message, index) => (
                                                <>
                                                    <div key={index} className={message.sender === "bot" ? "message-bot" : "message-user"}>
                                                        {typing === index ? 

                                                        <AIWriter>
                                                            <Markdown>{message.message}</Markdown>
                                                        </AIWriter> 
                                                        :
                                                        <>
                                                            {message.sender === "user" ? <UserOutlined /> : <></>}
                                                            <Markdown>{message.message}</Markdown>
                                                        </>
                                                        }
                                                    </div>
                                                    {typing === index ? <div style={{display: "none"}}>
                                                    <Markdown className="typing-reference">{message.message}</Markdown>
                                                    </div> : <></>}
                                                </>
                                            ))}

                                            {analysis.length == 0 || messageHistory.length % 2 === 0 ? 
                                            <div class="beep-boop">
                                                <Typewriter
                                                    options={{
                                                        strings: ['Beep boop beep boop, generating...'],
                                                        autoStart: true,
                                                        loop: true,
                                                        delay: 50,
                                                        deleteSpeed: 0,
                                                        }}
                                                    />
                                            </div> : <></>}
                                        </div>
                                    </div>
                                    <div className="message-input" style={{ marginTop: 16, display: "flex", gap: "0.5rem" }}>
                                        <TextArea autoSize className="ask-box" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} 
                                            disabled={typing >= 0 || messageHistory.length % 2 == 0} 
                                            placeholder="Ask a clarifying question..." style={{ fontSize: '16px' }} 
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !(typing >= 0 || messageHistory.length % 2 == 0)) askQuestion(e)
                                            }}/>
                                        <Button type="primary"  disabled={typing >= 0 || messageHistory.length % 2 == 0} onClick={(e) => { askQuestion(e) }}>
                                            <SendOutlined />
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Content>
            </Layout >
            <Joyride steps={joyrideState.steps}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                run={joyrideState.run}
                styles={{
                    options: {
                        primaryColor: "#033d03",
                    }
                }}
            />
        </ConfigProvider >

    );
}

export default Company;