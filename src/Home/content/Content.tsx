import React from "react";

const ProfileContent : React.FC = ()=>{
  const tags = ['React','HTML','CSS','NodeJs']
  return(
    <div className="tags">
      {tags.map((t) => (
        <span key={t} >
          {t}
        </span>
      ))}
      <p>ss</p>
      <h1>ss</h1>
    </div>
  )
}

export default ProfileContent;