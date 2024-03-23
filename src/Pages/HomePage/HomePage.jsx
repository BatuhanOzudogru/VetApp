// HomePage.js
import * as React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button } from "@mui/material";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="center">
        {/*  Home Page Content */}
        <div className="home-desc">
          <h2>
            Welcome! Welcome to our veterinary clinic! We're here for the health and happiness of your furry friends!
          </h2>
        </div>

        <div className="home-services">
          <h2>Our Services</h2>
 {/*  Services Content*/}
          <div className="home-services-content">

       
          <div className="home-services-p">
            <ul>
                <li>General veterinary services</li>
                <li>Emergency veterinary interventions</li>
                <li>Vaccination tracking and applications</li>
                <li>Surgeries and surgical interventions</li>
                <li>Dental care and treatments</li>
            </ul>
          </div>
        {/*   Services Image */}
          <div className="home-services-img">
            <img src="https://scontent.fsaw2-2.fna.fbcdn.net/v/t39.30808-6/257379140_1248316778999242_4092082968837736356_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=1pBi2qbrox4AX8XTNnf&_nc_ht=scontent.fsaw2-2.fna&oh=00_AfCwQQ_q8W4OHDxIWFX5iC4PbEChF-Zn3AhpyHM4YQvxDw&oe=660451C5" alt="" />
          </div>

          </div>
        
        </div>
        {/* Veterinarians */}
        <div className="home-docs">
          <h2>Our Veterinarians</h2>
          <div className="doctor-list">
            <div className="doctor">
            <img src="https://scontent.fsaw2-2.fna.fbcdn.net/v/t39.30808-6/216983711_1165671317263789_5585298573912851103_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=VLSOmrnxar4AX-SxZj0&_nc_ht=scontent.fsaw2-2.fna&oh=00_AfAc2wi1oLoXtSUaXrwUuVHmRi4mvKDhHy-5GnagoN66Xg&oe=6604B27A" alt="Vet Gloria K. Stevens" />
              <p>Vet Gloria K. Stevens <br /> General Surgery</p>
            </div>
            <div className="doctor">
              <img src="https://scontent.fsaw2-3.fna.fbcdn.net/v/t1.6435-9/150778670_1074151596415762_577591222102154125_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Anz1NLgXvaoAX9kv1FV&_nc_ht=scontent.fsaw2-3.fna&oh=00_AfCe5-rYr7JWQ3uBoEJgH-xYrRJ_wY5iL4S2_WDC5Gbeyg&oe=66214632" alt="Vet Gary R. Skinner" />
              <p>Vet Gary R. Skinner <br /> Internal Medicine and Check-up</p>
            </div>
            <div className="doctor">
              <img src="https://scontent.fsaw2-2.fna.fbcdn.net/v/t39.30808-6/240590044_1193431544487766_5926323084382789376_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=eGn5l_mR758AX9_VeMQ&_nc_ht=scontent.fsaw2-2.fna&oh=00_AfBuJPXZLAqDKusg4oAJscff3RY8xqA5e3d2H3KvrOn1YQ&oe=66045EB7" alt="Vet Dori C. Nevels " />
              <p>Vet Dori C. Nevels <br /> Pastry Polish</p>
            </div>
          </div>
        </div>
      {/*  Contact Form */}
        <div className="home-contact">
          <h2>How Can We Help?</h2>
          <p>
            If you have any questions about your pet's health or appointment requests, please feel free to contact us. <br /> Our expert veterinarians are here for you and your companion.
          </p>
          <div className="home-contact-inp">
          <input type="text" placeholder="Name" name="name" />
          <input type="text" placeholder="Email" name="name" />
          <textarea  className="custom-textarea" type="text" placeholder="Your Text" name="name" />
          
          </div>

          <div  className="home-contact-btn">
            <Button
              variant="outlined"
              endIcon={<PersonAddIcon />}
            >
              Send
            </Button>
            </div>
          
        </div>
      </div>
      {/*  Footer */}
      <footer className="footer">
        <div className="footer-contact">
        <h2>Contact Information</h2>
        <p>Address: Hampton, VA, United States, 23665</p>
        <p>Phone: 123-456-7890</p>
        <p>Email: info@veterinaryclinic.com</p>
        </div>
  
        <div className="footer-info">
        <h2>Working Hours</h2>
        <p>Monday - Friday: 09:00 - 18:00</p>
        <p>Saturday: 09:00 - 14:00</p>
        <p>Sunday: Closed</p>
        </div>
        
      </footer>
    </>
  );
}

export default HomePage;
