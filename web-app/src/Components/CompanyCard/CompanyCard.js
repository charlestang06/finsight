// CompanyCard.js
import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta.js";
import MiniChart from "../TradingChart/MiniChart.jsx";

const CompanyCard = ({ company }) => {
    let navigate = useNavigate();

    return (
        <Card
            style={{ width: 300, margin: "1rem", }}

            className="card1, glow"
            onClick={() => {
                navigate("/companies/" + company.ticker);
            }}
        >
            <MiniChart ticker={company.ticker} />
        </Card>
    );
};

export default CompanyCard;
