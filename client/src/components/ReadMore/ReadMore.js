import React, { useState } from "react";
import "../ReadMore/ReadMore.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function ReadMore({ inputText }) {
  const [isTruncated, setIsTruncated] = useState(true);

  var slicedText = "";
  if (inputText.length > 95) {
    const lastSpaceIndex = inputText.lastIndexOf(" ", 95);
    slicedText = inputText.slice(0, lastSpaceIndex) + " ";
  } else {
    slicedText = inputText;
  }
  const resultString = isTruncated ? slicedText : inputText;

  const toggleReadMore = () => {
    setIsTruncated(!isTruncated);
  };
  return (
    <div className="justify-content-center text-center">
      <div className="text">
        {resultString}
        {inputText.length > 95 && (
          <span onClick={toggleReadMore}>
            {isTruncated ? (
              <div>
                <span
                  style={{ display: "block", color: "#49a1eb" }}
                  className="pointer"
                >
                  <span style={{ borderBottom: "1px solid" }}>Show more</span>
                  <FaAngleDown />
                </span>
              </div>
            ) : (
              <div>
                <span
                  style={{ display: "block", color: "#49a1eb" }}
                  class="pointer"
                >
                  <span style={{ borderBottom: "1px solid" }}>Show less</span>
                  <FaAngleUp />
                </span>
              </div>
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default ReadMore;
