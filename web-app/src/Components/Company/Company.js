import {
    Breadcrumb,
    Col,
    ConfigProvider,
    DatePicker,
    Input,
    Layout,
    Row,
    theme
} from "antd";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UNAUTHORIZED } from "../../Utils/UserStates";
import AuthContext from "../AuthContext/AuthContext";
import Navbar from "../Navbar/Navbar";
import "./Company.css";

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

    // CHECK USERIMPL FOR USER
    useEffect(() => {
        if (userImpl == UNAUTHORIZED) {
            navigate("/");
        }
    }, [navigate])


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
                <Navbar tab={"2"} />
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
                            <Breadcrumb
                                style={{ margin: "16px 0 32px" }}
                                items={[{ title: <a href="/dashboard">Back to dashboard</a> }]}
                            />
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
                                <Row style={{ width: "80vw" }}>
                                    <Col span={7} style={{ marginRight: "36px" }} >

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