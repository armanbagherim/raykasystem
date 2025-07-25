import React from "react";

export default function ClientLoading() {
  return (
    <svg width={100} height={100} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#6F0CA9" stroke="#6F0CA9" stroke-width="9" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="0.6" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#6F0CA9" stroke="#6F0CA9" stroke-width="9" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="0.6" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#6F0CA9" stroke="#6F0CA9" stroke-width="9" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="0.6" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
  );
}
