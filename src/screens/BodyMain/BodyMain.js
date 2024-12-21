// import React from "react";
// import "../BodyMain/BodyMain.css";
// // import "../Signup/Signup.css";

// const BodyMain = () => {
//   return (
//     <div id="mainBody">
//       <div id="mainBodyContent">
//         <h1>WELCOME TO SKILL SELECT</h1>
//         <p style={{ fontSize: "20px" }}>
//           Welcome to SKILL SELECT, your ultimate destination for online hiring!
//           We understand that finding the right talent or securing the perfect
//           opportunity can be a challenging task. That's why we have created a
//           platform that brings together job seekers and employers in a seamless
//           and efficient manner. Whether you are a student looking for part-time
//           work or a professional seeking a new career path, SKILL SELECT is here
//           to help you succeed. With our extensive database of job listings,
//           user-friendly interface, and powerful search tools, you can easily
//           navigate through a vast array of opportunities and connect with
//           potential employers. Join SKILL SELECT today and embark on a journey
//           towards your dream job!
//         </p>
//       </div>
//       <div id="featureContent" style={{ fontSize: "18px" }}>
//         <h1>FEATURES</h1>
//         <ul style={{ listStyleType: "none" }}>
//           <li style={{ padding: "1vh" }}>
//             Comprehensive Job Listings: Our platform provides an extensive
//             database of job listings across various industries and sectors. From
//             entry-level positions to executive roles, you'll find a wide array
//             of opportunities to explore.
//           </li>
//           <li style={{ padding: "1vh" }}>
//             Advanced Search Filters: Save time and find the perfect job or
//             candidate with our advanced search filters. Refine your search based
//             on location, salary range, experience level, and more, ensuring you
//             find the most relevant options.
//           </li>
//           <li style={{ padding: "1vh" }}>
//             Resume/CV Upload: Seamlessly upload your resume or CV to showcase
//             your qualifications and stand out from the crowd. Employers can
//             easily review applicant profiles and make informed hiring decisions.
//           </li>
//           <li style={{ padding: "1vh" }}>
//             Profile Creation: Build a compelling profile that highlights your
//             skills, qualifications, and experience. Job seekers can showcase
//             their expertise, while employers can create a company profile to
//             attract top talent.
//           </li>
//         </ul>
//       </div>
//       <div id="whiteBox"></div>
//     </div>
//   );
// };

// export default BodyMain;
import React from "react";
import "../BodyMain/BodyMain.css";

const BodyMain = () => {
  return (
    <div id="mainBody">
      <div id="whiteBox"></div>
      <div id="mainBodyContent">
        <h1>WELCOME TO SKILL SELECT</h1>
        <p>
          Welcome to SKILL SELECT, your ultimate destination for online hiring!
          We understand that finding the right talent or securing the perfect
          opportunity can be a challenging task. That's why we have created a
          platform that brings together job seekers and employers in a seamless
          and efficient manner. Join SKILL SELECT today and embark on a journey
          towards your dream job!
        </p>
      </div>
      <div id="featureContent">
        <h1>FEATURES</h1>
        <ul>
          <li>
            <span>🔍</span> <strong>Advanced Search Filters:</strong> Save time
            and find the perfect job or candidate with our advanced search
            filters.
          </li>
          {/* <li>
            <span>📂</span> <strong>Resume/CV Upload:</strong> Seamlessly upload
            your resume or CV to showcase your qualifications.
          </li> */}
          <li>
            <span>👤</span> <strong>Profile Creation:</strong> Build a
            compelling profile to highlight your skills and experience.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BodyMain;
