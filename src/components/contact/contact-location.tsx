import React from "react";
import Image from "next/image";
// images
// images
import Link from 'next/link';

// data
const location_data = [
  {
    id: 1,
    country: "Toronto, Canada",
    time: "12:00 pm GMT+2",
    location_title: "GTA",
    address: "Downtown, Toronto",
    phone: "+1 (437) 879-4050",
    email: "info@stratx.io",
  },
  {
    id: 2,
    country: "Lahore, Pakistan",
    time: "11:00 pm GMT+2",
    location_title: "Lahore",
    address: "DHA Ph 6, Lahore.",
    phone: "+92 314 9505 428",
    email: "info@stratx.io",
  },
];

const ContactLocation = () => {
  return (
    <div className="cn-contact-info-area">
      <div className="container container-1840">
        <div className="cn-contact-info-bg black-bg">
          {location_data.map((item) => (
            <div key={item.id} className="cn-contact-info-item">
              <div className="row">
                <div className="col-xl-7">
                  <div className="cn-contact-left d-flex flex-wrap align-items-center">

                    <div className="cn-contact-left-info">
                      <h4 className="cn-contact-left-title">{item.country}</h4>
                      <span>
                        <i className="fa-regular fa-clock"></i>
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="cn-contact-right-wrap d-flex align-items-start justify-content-between">
                    <div className="cn-contact-right">
                      <div className="cn-contact-location">
                        <span className="cn-contact-location-title">
                          {item.location_title}
                        </span>
                        <Link
                          href="https://www.google.com/maps"
                          target="_blank"
                          dangerouslySetInnerHTML={{ __html: item.address }}
                        ></Link>
                      </div>
                      <div className="cn-contact-map">
                        <Link href="#">Google Maps</Link>
                      </div>
                    </div>
                    <div className="cn-contact-right-info text-start text-md-end">
                      <Link href="tel:(+91)76001726">{item.phone}</Link> <br />
                      <Link href="mailto:Hello@contact.com">{item.email}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
