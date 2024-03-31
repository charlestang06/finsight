// CompanyCard.js
import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta.js";
import MiniChart from "../TradingChart/MiniChart.jsx";

const CompanyCard = ({ ticker }) => {
    let navigate = useNavigate();

    return (
        <Card
            style={{ width: 300, margin: "0.6rem", }}
            bodyStyle={{ padding: "12px" }}
            className="card1, glow"
            onClick={() => {
                navigate("/companies/" + ticker);
            }}
        >
            <MiniChart ticker={ticker} />
        </Card>
    );
};

export default CompanyCard;
