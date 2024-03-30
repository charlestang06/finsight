// CompanyCard.js
import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta.js";

const CompanyCard = ({ company }) => {
    let navigate = useNavigate();

    return (
        <Card
            style={{ width: 300, margin: "1rem" }}
            className="card1, glow"
            onClick={() => {
                // Navigate to the company details page when clicked
                navigate("/companies/" + company.id);
            }}
        >
            <Meta
                title={company.ticker}
                description={company.name}
                style={{ marginBottom: 20 }}
            />
            {/* Add other details like stock graph, current price, change percentage here */}
        </Card>
    );
};

export default CompanyCard;
