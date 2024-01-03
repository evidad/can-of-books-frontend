import React, { Component } from "react";

class Profile extends Component {
  render() {

    return (
      <div className="bio">
        <img id="aboutPic" src='../../public/assets/IMG-1979.jpg' alt="image of Negin" />
        <p className="about">
          Hello, I'm Negin, a 32-year-old trailblazer with a story shaped by
          resilience and relentless pursuit of dreams.
          <br />
          🌐 At 18, I ventured to Malaysia for higher education. At 21, my family
          and I immigrated to the U.S., where I navigated banking while
          pursuing education part-time.
          <br />
          🎖️ After five years in banking, I enlisted in the U.S. Army for three
          years, facing challenges with unwavering determination.
          <br />
          💻 Now, I'm transitioning into software development, driven by a
          passion for technology and a commitment to pushing boundaries.
          <br />
          📜 My journey is a testament to adaptability, resilience, and an
          ever-evolving pursuit of dreams. Excited for the endless
          possibilities ahead.
        </p>
        <h2>Errol Vidad, PMP, Top Secret/SCI :)</h2>
        <img id="aboutPic2" src='../../public/assets/PXL_20231115_014112122.jpg' alt="image of Errol" />
        <p className="about">
          Hi, I'm Errol Vidad. Naval Officer and Project Manager turned Systems
          Analyst and now Software Developer. I have over a decade of military
          experience in both active and reserve naval components and a year of
          defense contracting work in information systems. I am passionate
          about formulating innovative software solutions to address military
          challenges and I would like to bring my diverse expertise to benefit
          meaningful projects in the defense sector.

        </p>
      </div>
    );
  }
}

export default Profile;
