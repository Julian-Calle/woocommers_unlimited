import React from "react";

export default function DynamicOptions({ options }) {
  return options?.map((option, index) => {
    return (
      <option key={index} value={option.name} disabled={!option.available}>
        {`(${option.limit - option.count})${option.name}`}
      </option>
    );
  });
}
