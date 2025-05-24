import React from 'react';
import './Review.css';

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const testimonials = [
  {
    name: "Ashok Kumar",
    date: "2023-06-10",
    content: "Excellent…everyone was surprised by seeing their performances….. definitely will invite for next function…….highly recommended!!!!!! It's the highlight of our marriage!!!!",
  },
  {
    name: "Ashik Ch",
    date: "2023-05-10",
    content: "This is the best event management in Kerala. Our wedding event was amazing with this company. We are very happy with this group.",
  },
  {
    name: "PINDIYAN ANTONY",
    date: "2023-04-14",
    content: "In my point of view, the best event management in Thrissur and a very good wedding planner in Kerala.",
  },
  {
    name: "Saleena Devassy",
    date: "2023-04-12",
    content: "Very good event management company in Kerala. We had a wedding last year. The wedding was wonderful in Thrissur. Thanks, Melodia event management.",
  },
  {
    name: "Peter K P",
    date: "2023-04-09",
    content: "Very good event management company. Good team management and coordination. Wedding event management services of this company were amazing in my relative's wedding ceremony. Best event management in Kerala.",
  },
  {
    name: "Pushpa P L",
    date: "2023-04-07",
    content: "In my experience, it is the best event management company in Kerala.",
  }
];

const Reviewpage = () => {
  return (
    <section className="client-testimonials">
      <h2 style={{color:"purple"}}>See What Our Clients Have to Say</h2>
      {testimonials.map((testimonial, index) => (
        <div className="testimonial" key={index}>
          <div className="testimonial-header">
            <div
              className="client-initial"
              style={{ backgroundColor: getRandomColor() }} // Assigning random color for each circle
            >
              {testimonial.name.charAt(0)}
            </div>
            <span className="client-name">{testimonial.name}</span>
            <span className="testimonial-date">{testimonial.date}</span>
          </div>
          <div className="testimonial-content">
            <p>{testimonial.content}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Reviewpage;
