import React from "react"
import ContentLoader from "react-content-loader" 

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={900}
    height={201}
    viewBox="0 0 900 201"
    backgroundColor="#f5f5f5"
    foregroundColor="#d6d3d3"
  >
    <rect x="200" y="5" rx="0" ry="0" width="330" height="37" /> 
    <rect x="5" y="61" rx="0" ry="0" width="650" height="15" /> 
    <rect x="5" y="92" rx="0" ry="0" width="650" height="15" /> 
    <rect x="5" y="122" rx="0" ry="0" width="650" height="15" /> 
    <rect x="5" y="163" rx="0" ry="0" width="400" height="15" />
  </ContentLoader>
)

export default MyLoader 