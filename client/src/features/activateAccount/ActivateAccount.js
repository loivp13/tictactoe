import React from "react";

export default function ActivateAccount({
  match: {
    params: { token },
  },
}) {
  return <div>{token}</div>;
}
