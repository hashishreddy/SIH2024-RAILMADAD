"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import a from "@/assets/images/1.png";
import b from "@/assets/images/2.png";
import c from "@/assets/images/3.png";
import d from "@/assets/images/4.png";
import e from "@/assets/images/5.png";
import f from "@/assets/images/6.png";
import g from "@/assets/images/7.png";
import h from "@/assets/images/8.png";

const Hero = ({ logoSrc }) => {
  return (
    <section className="relative w-full h-[820px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={logoSrc}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="-z-10 blur-sm"
        priority
      />
      <div
        className="flex items-center h-full px-6 mx-auto relative z-10"
        style={{ maxWidth: "1200px" }}
      >
        <div className="flex-1 pl-6 lg:pl-12">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-[#070301] mb-6">
            RailMadad
          </h1>

          <h2 className="text-3xl lg:text-5xl font-semibold leading-snug bg-gradient-to-r from-[#67a3a3] to-[#a0adbc] bg-clip-text text-transparent animate-gradient">
            Inquiry, Assistance & Grievance Redressal
          </h2>
          <div className="mt-10">
            <Link href="/complaint">
              <button className="py-3 px-8 mt-6 rounded-full bg-gradient-to-r from-[#9b8f8a] to-[#3e2723] text-white text-lg font-semibold transition-all duration-300 hover:from-[#3e2723] hover:to-[#d7ccc8] flex items-center space-x-3">
                <span>Register Complaint</span>
                <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>{" "}
      {/* Container padding and background color */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
          {" "}
          {/* Grid layout for two columns on small screens */}
          {/* Row 1 */}
          <ul className="grid grid-cols-2 sm:grid-cols-8 gap-4 ">
            {" "}
            {/* Two rows layout with grid */}
            <li className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <a
                href="https://www.irctc.co.in/nget/"
                title="Ticket Booking"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="icon mb-2">
                  <Image src={a} width={61} height={61} alt="Ticket Booking" />
                </span>
                <span className="text-center font-medium text-gray-700">
                  Ticket <br /> Booking
                </span>
              </a>
            </li>
            <li className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <a
                href="https://enquiry.indianrail.gov.in/"
                title="Train Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="icon mb-2">
                  <Image src={b} width={61} height={61} alt="Train Enquiry" />
                </span>
                <span className="text-center font-medium text-gray-700">
                  Train <br /> Enquiry
                </span>
              </a>
            </li>
            <li className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <a
                href="http://www.indianrail.gov.in/"
                title="Reservation Enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="icon mb-2">
                  <Image
                    src={c}
                    width={61}
                    height={61}
                    alt="Reservation Enquiry"
                  />
                </span>
                <span className="text-center font-medium text-gray-700">
                  Reservation <br /> Enquiry
                </span>
              </a>
            </li>
            <li className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <a
                href="https://rr.irctc.co.in/#/home"
                title="Retiring Room Booking"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="icon mb-2">
                  <Image
                    src={d}
                    width={61}
                    height={61}
                    alt="Retiring Room Booking"
                  />
                </span>
                <span className="text-center font-medium text-gray-700">
                  Retiring <br /> Room Booking
                </span>
              </a>
            </li>
            <li className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <a
                href="http://www.indianrailways.gov.in/"
                title="Indian Railways"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="icon mb-2">
                  <Image src={e} width={61} height={61} alt="Indian Railways" />
                </span>
                <span className="text-center font-medium text-gray-700">
                  Indian <br /> Railways
                </span>
              </a>
            </li>
            <li className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <a
                href="https://play.google.com/store/apps/details?id=com.cris.utsmobile&hl=en_IN"
                title="UTS Ticketing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="icon mb-2">
                  <Image src={f} width={61} height={61} alt="UTS Ticketing" />
                </span>
                <span className="text-center font-medium text-gray-700">
                  UTS <br /> Ticketing
                </span>
              </a>
            </li>
            <li className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <a
                href="https://www.fois.indianrail.gov.in/RailSAHAY/index.jsp"
                title="Freight Business"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="icon mb-2">
                  <Image
                    src={g}
                    width={61}
                    height={61}
                    alt="Freight Business"
                  />
                </span>
                <span className="text-center font-medium text-gray-700">
                  Freight <br /> Business
                </span>
              </a>
            </li>
            <li className="flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <a
                href="https://parcel.indianrail.gov.in/"
                title="Railway Parcel Website"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="icon mb-2">
                  <Image
                    src={h}
                    width={61}
                    height={61}
                    alt="Railway Parcel Website"
                  />
                </span>
                <span className="text-center font-medium text-gray-700">
                  Railway <br /> Parcel Website
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
