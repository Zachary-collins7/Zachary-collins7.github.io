import * as React from 'react';
import { Link } from 'react-router-dom';
import './about.scss';

export interface IAboutProps {
}


const aboutData = [
    {
        title: "Started programming",
        text: "An aspiring developer since 13, I started programming in C++ using the codeblocks IDE. My first finished project was a text-based calculator capable of basic arithmetic."
    },
    {
        title: "Joined Robotics",
        text: "Two years later, I got invited to join FTC Robotics team 11572, and within a year, I was appointed lead programmer. Working with our robot was the first time I had united programming with a physical component and changed how I thought. Later this season, we compete at worlds against 10+ countries."
    },
    {
        title: "Invited to MIT",
        text: "The following summer, I got invited to MIT, where their department leads and partnered technology corporations mentored us through various control systems and technologies. Project-based learning allowed us to implement many of these technologies: Event, State, and SLAM control architectures. Sensor response algorithms like PID as well as control and tuning. And the installation and configuration of sensors: IMU, Lidar, and Stereoscopic cameras."
    },
    {
        title: "Advanced Robotics",
        text: "I went to implement some of my new knowledge within my robotics team. After being elected as team captain, I implemented PID and state control logic. And to advance our development, I created a simulation environment to test a potential field controller in a simulated copy of the competition environment. We later again competed at worlds."
    },
    {
        title: "Continue",
        text: "Since then, I've been working on independent and professional projects to advance my knowledge and skills."
    }
]

export default function About (props: IAboutProps) {
  return (
    <div className="wrapper">
          <div className="table">
              <table>
                  <thead>
                      <tr>
                          <td>
                              <h2 style={{ fontSize: '2rem', paddingBottom: '1rem' }}>Zachary Collins</h2>
                          </td>
                      </tr>
                  </thead>
                  <tbody>
                      {aboutData && aboutData.map(({ title, text }, idx) => {
                          return (
                              <tr key={idx}>
                                  <td>{title}</td>
                                  <td>{text}</td>
                              </tr>
                          )
                      })}
                  </tbody>
                  <tfoot>
                      <tr>
                          <td>
                              {/* <Link to="/about">Read more</Link> */}
                          </td>
                      </tr>
                  </tfoot>
              </table>
          </div>

          <div className="foot">
              In a hurry? Here's my <a href="/resume">resume</a>
          </div>
    </div>
  );
}
