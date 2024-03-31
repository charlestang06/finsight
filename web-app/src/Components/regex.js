import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { isValidElement, Children } from 'react';

// Define the Markdown text containing keywords
const markdownText = `
# This is a Markdown document

This document talks about **finance** and **technology**.
`;

// Keywords and corresponding tooltip text
const keywordsTooltips = {
    finance: 'Finance is the management of money and investments.',
    technology: 'Technology refers to the application of scientific knowledge for practical purposes.',
};

// Custom Tooltip component
const Tooltip = ({ children, title }) => (
    <div className="tooltip">
        {children}
        <span className="tooltiptext">{title}</span>
    </div>
);

// Custom component to handle keyword replacement
const MarkdownWithTooltips = ({ children }) => {
    return Children.map(children, (child) => {
        if (isValidElement(child)) {
            // If the child is a React element, recursively process it
            return React.cloneElement(child, {
                children: <MarkdownWithTooltips>{child.props.children}</MarkdownWithTooltips>,
            });
        } else {
            // If the child is a string, split it and replace keywords
            const words = child.split(' ');
            return words.map((word, index) => {
                // Check if the word matches a keyword
                const keyword = Object.keys(keywordsTooltips).find(
                    (key) => key.toLowerCase() === word.toLowerCase()
                );
                if (keyword) {
                    // Render the word as a Tooltip if it matches a keyword
                    console.log('Keyword found:', keyword);
                    return (
                        <Tooltip key={index} title={keywordsTooltips[keyword]}>
                            {word}
                        </Tooltip>
                    );
                }
                return word + ' ';
            });
        }
    });
};

// Render the Markdown text using the custom components
const Regex = () => {
    // Define a custom component for the 'strong' element
    const components = {
        strong: ({ children }) => <strong>{children}</strong>,
        // Use the custom MarkdownWithTooltips component
        p: MarkdownWithTooltips,
    };

    return (
        <div>
            <Markdown
                components={components}
                rehypePlugins={[rehypeRaw]}
                children={markdownText}
            />
            <style>{`
        .tooltip {
          position: relative;
          display: inline-block;
        }
        
        .tooltip .tooltiptext {
          visibility: hidden;
          width: 120px;
          background-color: black;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px 0;
          position: absolute;
          z-index: 1;
          bottom: 150%;
          left: 50%;
          margin-left: -60px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
        </div>
    );
};

export default Regex;