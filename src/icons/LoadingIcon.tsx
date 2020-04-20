import React from "react";
import { Svg } from "./Svg";
import { colors } from '@Theme';

export const LoadingIcon = (props: any) => {
  const baseConfig = {
    width: "100%",
    height: "60",
    fill: colors.white.light,
    viewBox: "0 0 50 70"
  };

  const transitionValues = {
    duration: "0.9s",
    repeatCount: 'indefinite'
  };

  const config = {
      ...baseConfig,
      ...props
  };
  return (
      <Svg {...config}>
        <rect x="0" y="0" width="3" height="20">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 -10; 0 50; 0 -10"
            begin="0" dur={transitionValues.duration} repeatCount={transitionValues.repeatCount} />
        </rect>
        <rect x="20" y="0" width="3" height="20">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 -10; 0 50; 0 -10"
            begin="0.3s" dur={transitionValues.duration} repeatCount={transitionValues.repeatCount} />
        </rect>
        <rect x="40" y="0" width="3" height="20">
          <animateTransform attributeType="xml"
            attributeName="transform" type="translate"
            values="0 -10; 0 50; 0 -10"
            begin="0.6s" dur={transitionValues.duration} repeatCount={transitionValues.repeatCount} />
        </rect>
      </Svg>
  );
};
