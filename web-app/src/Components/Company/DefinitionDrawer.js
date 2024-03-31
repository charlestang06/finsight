import {
    ConfigProvider,
    Drawer
} from "antd";
import definitions from "./definitions.js";


import React, { useEffect, useState } from "react";

function DefinitionDrawer({ openDrawer, setOpenDrawer, terms }) {

    // RENDER
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#7E70CC",
                },
            }}
        >
            <Drawer onClose={() => setOpenDrawer(false)} open={openDrawer}>
                <h1 style={{ fontFamily: 'Newsreader' }}>Relevant definitions</h1>
                <br />
                {Object.keys(terms).map((term) => (
                    <div style={{fontSize: 17, lineHeight: "1.2em"}}>
                        <p key={term}><strong>{term}:</strong> {terms[term]}</p>
                    </div>
                ))}
            </Drawer>
        </ConfigProvider >
    );
}

export default DefinitionDrawer;