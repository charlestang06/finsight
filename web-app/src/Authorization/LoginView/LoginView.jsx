// IMPORTS
import { Button, Form, Input, Checkbox } from "antd";
import {
    auth,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
} from "../../Firebase";
// IMAGES
import publicLogo from "../../assets/images/public.png";
import { useNavigate } from "react-router";
import "./LoginView.css";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RequestUtils from "../../Utils/RequestUtils";

// ADMIN LOGIN VIEW
function LoginView(props) {

    const [isEqualPW, setIsEqualPW] = useState(false);

    let [tab, setTab] = useState(false);

    let [email, setEmail] = useState("");
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [isCompany, setIsCompany] = useState(false);

    let [user, loading] = useAuthState(auth);
    let [error, setError] = useState("");
    let [ready, setReady] = useState(false);

    let [register, setRegister] = useState(false);


    const login = (values) => {
        try {
            if (tab && !isEqualPW) {
                throw new Error("Passwords do not match");
            }
            tab === false
                ? logInWithEmailAndPassword(email, password)
                : registration(name, email, password, isCompany);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    const registration = (name, email, pass, isCompany) => {
        registerWithEmailAndPassword(email, pass);
    };

    // DISPLAY ADMIN LOGIN VIEW
    return (
        <div className="login">
            <div className="login__container">
                <img className="coverLogo" src={publicLogo}></img>
                <Form
                    layout="vertical"
                    name="basic"
                    className="login_form"
                    style={{
                        width: 300,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    size="large"
                    onFinish={login}
                >
                    <p className="padded-text">
                    Finsight bridges the gap between new investors and financial markets as your personal, AI finance bro.
                    </p>
                    {tab === 1 ?
                        <Form.Item
                            label="Name"
                            style={{ marginTop: 0, fontWeight: "bold" }}
                            wrapperCol={{
                                span: 20,
                            }}
                        >
                            <Input
                                size="large"
                                className="br-10 my-2"
                                style={{ width: 300 }}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            ></Input>
                        </Form.Item>
                        : <></>}

                    <Form.Item
                        label="Email"
                        style={{ marginTop: 0, fontWeight: "bold" }}
                        wrapperCol={{
                            span: 20,
                        }}
                    >
                        <Input
                            size="large"
                            className="br-10 my-2"
                            style={{ width: 300 }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        ></Input>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        style={{ marginTop: 0, fontWeight: "bold" }}
                    >
                        <Input.Password
                            size="large"
                            className="br-10 my-3"
                            style={{ width: 300 }}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        ></Input.Password>
                    </Form.Item>

                    {tab && (
                        <Form.Item
                            label="Confirm Password"
                            style={{ marginTop: 0, fontWeight: "bold" }}
                        >
                            <Input.Password
                                size="large"
                                className="br-10 my-3"
                                style={{ width: 300 }}
                                onChange={(e) => {
                                    setIsEqualPW(e.target.value === password);
                                }}
                            ></Input.Password>
                        </Form.Item>
                    )}

                    {/* {tab && (
                        <Form.Item
                            style={{ marginTop: 0, fontWeight: "bold" }}
                        >
                            <Checkbox
                                onChange={() => setIsCompany(!isCompany)}
                            >Are you a company representative?</Checkbox>
                        </Form.Item>
                    )} */}

                    <p className="padded-text">{error}</p>
                    <Form.Item>
                        <Button style={{ margin: "10px 0" }}
                            type="primary" className="microsoft" htmlType="submit">
                            {tab === false ? "Login" : "Register"}
                        </Button>
                    </Form.Item>
                </Form>

                <Button
                    type="default"
                    className="register"
                    htmlType="submit"
                    onClick={() => setTab(!tab)}
                    target="0"
                    style={{ marginTop: 10 }}
                >
                    {tab === false ? "Register Account" : "Back to Login"}
                </Button>
                <p className="footerText mx-auto">

                </p>
            </div>
        </div>
    );
}

export default LoginView;