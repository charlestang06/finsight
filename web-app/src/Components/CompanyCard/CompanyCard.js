// CompanyCard.js
import React from "react";
import { Card } from "antd";
import { navigate } from "@reach/router";
import { Meta } from "antd";

const CompanyCard = ({ company }) => {
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
