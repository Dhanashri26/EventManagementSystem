import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TeamMember = () => {
  const teamMembers = [
    {
      name: "Adesh Pardhi",
      role: "Frontend Designer",
      image: "/assests/Adesh_img.jpg",
    },
    {
      name: "Dhanashri Lambade",
      role: "Frontend Designer and Backend Designer",
      image: "/assests/Dhanashri_img.jpeg",
    },
    {
      name: "Achal Kalpande",
      role: "Frontend Designer",
      image: "/assests/Aanchal_img.jpeg",
    },
    {
      name: "Rohit Thakare",
      role: "Frontend Designer",
      image: "/assests/rohit_img.jpeg",
    },
    {
      name: "Divya Choudhury",
      role: "Backend Designer and Frontend Designer",
      image: "/assests/Divya_img.jpeg",
    },
    {
      name: "Kshitija Garud",
      role: "Backend Designer",
      image: "/assests/Kshitija1_img.jpeg",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        <i className="bi bi-people-fill me-2"></i>Our Team
      </h2>

      <div className="row">
        {teamMembers.map((member, index) => {
          const isFullStack =
            member.role.includes("Frontend") && member.role.includes("Backend");

          const badgeClass = isFullStack
            ? "bg-warning"
            : member.role.includes("Frontend")
            ? "bg-primary"
            : "bg-success";

          return (
            <div className="col-md-4 mb-4" key={index} data-aos="zoom-in">
              <div
                className={`card h-100 text-center p-3 shadow-sm ${
                  isFullStack ? "border border-warning border-2" : ""
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-circle mb-3 mx-auto"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "3px solid #007bff",
                  }}
                />
                <h5 className="card-title">{member.name}</h5>
                <span className={`badge ${badgeClass} text-white`}>
                  {member.role}
                </span>
                {isFullStack && (
                  <div className="mt-2">
                    <span className="text-warning fw-bold">
                      <i className="bi bi-stars"></i> Full Stack Contributor
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamMember;
