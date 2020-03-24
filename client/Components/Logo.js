import React from 'react';

class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmPlJoW8I6zERaV0EocfA3bA26-l9_4cI_vn-6jMd6aX7kxXI7"
          width="50"
          height="50"></img>
        <br></br>
        <span> Team Axolotl </span>
        <br></br>
        <span> Live Text Editor </span>
      </div>
    );
  }
}

export default Logo;
