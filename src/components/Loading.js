import React from "react";
import { Icon } from "antd";

export default function Loading() {
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Icon type="loading" style={{ fontSize: "32px" }} />
    </div>
  );
}
