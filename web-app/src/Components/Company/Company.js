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
    Divider
} from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta.js";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UNAUTHORIZED } from "../../Utils/UserStates";
import AuthContext from "../AuthContext/AuthContext";
import Navbar from "../Navbar/Navbar";
import "./Company.css";
import RequestUtils from "../../Utils/RequestUtils";

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
        name: "Google Inc.",
        ticker: "GOOG",
        description: "Description",
        website: "https://www.google.com",
    });
    const [days, setDays] = useState(1); // 1, 7, 30, 365
    const [analysis, setAnalysis] = useState("lorem ipsum dolor sit amet, consectetur adipiscing elit.");

    useEffect(() => {
        // RequestUtils.get("/get/%7Bresponse%7D%7D?ticker=" + id + "&length=" + days).then((response) => {
        //     setAnalysis(response.data.response);
        // });
    }, [id, days]);

    // CHECK USERIMPL FOR USER
    useEffect(() => {
        if(userImpl == UNAUTHORIZED) {
            navigate("/");
        }
    }, [navigate]);

       
    // RENDER
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#7E70CC",
                },
            }}
        >
            <Layout className="white">
                <Navbar tab={"2"}/>
                <Layout
                    className="white"
                >
                    <Content
                        style={{
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            display: "flex",
                            justifyContent: "center",
                        }}
                        className="mx-auto"
                    >
            <Layout
                style={{
                    padding: "24px 100px 24px",
                }}
                className="white"
            >
                <Breadcrumb style={{ margin: "16px 0 32px", }}>
                    {<Breadcrumb.Item><a href="/dashboard">Back to dashboard</a></Breadcrumb.Item>}
                   
                </Breadcrumb> 
                <Content
                    style={{
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        display: "flex",
                        justifyContent: "center",
                    }}
                    className="mx-auto"
                >
                    <Row style={{width: "80vw"}}>
                        <Col span={7} style={{ marginRight: "36px" }} >
                        <Card className="profile-card" >
                                <Meta
                                    title={company.ticker}
                                    description={company.name}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                />
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

                                    <div style={{ margin: "24px 0 4px" }}>
                                        {company.description}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={16}>
                            
                        </Col>
                    </Row>
                </Content>
            </Layout>

            </Content>
                </Layout>
            </Layout>
        </ConfigProvider>

    );
}

export default Company;