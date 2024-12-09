import React, { ReactNode } from "react";
import { rules } from "@./bbcode";

const parseBBCode = (text: string): ReactNode[] => {
  const processedText = rules.reduce((content, [regex, replacement]) => {
    return content.replace(regex, (match, p1) => 
      replacement.replace('$1', p1)
    );
  }, text);

  const parseNodes = (input: string): ReactNode[] => {
    const nodes: ReactNode[] = [];
    let currentIndex = 0;
    const tagRegex = /<(b|i|)>(.+?)<\/\1>/g;
    

    let match;
    while ((match = tagRegex.exec(input)) !== null) {
      if (match.index > currentIndex) {
        nodes.push(input.slice(currentIndex, match.index));
      }

      const tag = match[1];
      const content = match[2];

      nodes.push(
        React.createElement(tag, { key: nodes.length }, 
          parseNodes(content)
        )
      );

      currentIndex = tagRegex.lastIndex;
    }

    if (currentIndex < input.length) {
      nodes.push(input.slice(currentIndex));
    }

    return nodes;
  };

  return parseNodes(processedText);
};

export { parseBBCode };
