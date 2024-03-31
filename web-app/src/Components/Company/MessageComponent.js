import {
    Typography,
} from "antd";

import React, { useEffect, useState } from "react";

// add definitions to markdown
const MessageComponent = ({ messageHistory, definitions }) => {

    const { Paragraph } = Typography;

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }

    const renderMessageWithUnderlines = (message) => {
      // Split the message content into words and formatting
      const parts = message.split(/(\*\*.*?\*\*|_.*?_|`.*?`|\s+)/);
  
      // Process each part to identify if it's a term from the definitions
      const processedParts = parts.map((part, index) => {
        // Check if the part is plain text or formatted text
        if (/^\*\*.*?\*\*$|^_.*?_$|^`.*?`$/.test(part)) {
          // Preserve formatting for bold, italic, and code
          return part;
        } else {
          // Split plain text into words
          const words = part.split(/\s+/);
          // Process each word to identify if it's part of a term from the definitions
          const processedWords = [];
          let currentTerm = '';
  
          for (let i = 0; i < words.length; i++) {
            const word = words[i];
            currentTerm += (currentTerm ? ' ' : '') + word;
            const nextWord = i < words.length - 1 ? words[i + 1] : '';
  
            if (definitions[toTitleCase(currentTerm)]) {
              // If the current term (and possibly the next word) is found in the definitions
              processedWords.push(
                <Typography.Text underline key={i}>
                    <a>
                  {currentTerm}
                  </a>
                </Typography.Text>
              );
              currentTerm = ''; // Reset the current term
            } else if (definitions[toTitleCase(currentTerm) + ' ' + toTitleCase(nextWord)]) {
              // If the current term plus the next word forms a term
              processedWords.push(
                <a>
                  {currentTerm} {nextWord}
                </a>
              );
              currentTerm = ''; // Reset the current term
              i++; // Skip the next word
            } else {
              processedWords.push(word + ' '); // Preserve non-term word
            }
          }
          return <span key={index}>{processedWords}</span>;
        }
      });
  
      return processedParts;
    };
  
    return (
      <div className="message-container" style={{ height: 'calc(100% - 105px)', overflow: 'auto', lineHeight: "1.6em", margin: "0 8px" }}>
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
            <Paragraph className="message" key={index}>
              {renderMessageWithUnderlines(message.message)}
            </Paragraph>
          ))}
        </div>
      </div>
    );
  };

  export default MessageComponent;