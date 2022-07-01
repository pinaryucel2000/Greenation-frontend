import { useEffect, useState } from "react";
import "./meet-the-team.css";

function MeetTheTeam() {
  return (
    <section id="meet-the-team">
      <h2>Meet The Team</h2>
      <div className="team">
        <div className="teamMember">
          <div className="memberImageContainer">
            <img
              id="ropeItem"
              src="./team/arda.jpg"
              width="100%"
              height="100%"
            />
          </div>
          <div className="memberInfoContainer">
            <h3>Arda Göktoğan</h3>
            <h4>Backend Developer</h4>
            <div className="memberBorder"></div>
            <p>
              I am a 4th year Computer Science student in Bilkent University. I
              am interested in Machine Learning applications in computer vision
              and natural language processing. I am willing to pursue academic
              career in related areas. My contributions to this project includes
              project managment, graph processing and optimiztion.
            </p>
          </div>
        </div>

        <div className="teamMember">
          <div className="memberImageContainer">
            <img
              id="ropeItem"
              src="./team/cemal.jpg"
              width="100%"
              height="100%"
            />
          </div>
          <div className="memberInfoContainer">
            <h3>Cemal Gündüz</h3>
            <h4>Backend Developer</h4>
            <div className="memberBorder"></div>
            <p>
              Hi I am Cemal Gündüz. I am 4th year 2nd semester computer science
              student in Bilkent University who likes learning new things and
              loves to challenge with extraordinary problems. I am interested in
              Data Science and Machine Learning. I contributed Greenation
              project in Backend, Database and Machine Learning fields. Have a
              nice trip both in real life and in our site :).
            </p>
          </div>
        </div>

        <div className="teamMember">
          <div className="memberImageContainer">
            <img
              id="ropeItem"
              src="./team/eren.jpg"
              width="100%"
              height="100%"
            />
          </div>
          <div className="memberInfoContainer">
            <h3>Eren Şenoğlu</h3>
            <h4>Backend Developer</h4>
            <div className="memberBorder"></div>
            <p>
              Hi, I’m Eren Şenoğlu, a senior Computer Science student in Bilkent
              University. I like challenging myself and solving problems. For
              the time being, I'm interested in Data Science. Currently
              fulfilling my interest with contributing Data Science Ops in Getir
              as a Data Scientist. I have contributed to this project by
              developing backend, web scraping, developing ML models and
              assisting project management to my fellow teammates.
            </p>
          </div>
        </div>

        <div className="teamMember">
          <div className="memberImageContainer">
            <img
              id="ropeItem"
              src="./team/pinar.png"
              width="100%"
              height="100%"
            />
          </div>
          <div className="memberInfoContainer">
            <h3>Pınar Yücel</h3>
            <h4>Frontend Developer</h4>
            <div className="memberBorder"></div>
            <p>
              Being a curious person, I like learning about anything that pique
              my interest. I am especially interested in astronomy, chemistry,
              and of course, computer science. How computers function really
              amazed me when I was little. I love cooking desserts for my
              relatives, and playing an assortment of different games —
              including video games and tennis. I enjoyed my time working as a
              frontend developer for Greenation and I hope that you find
              Greenation to be to your liking.
            </p>
          </div>
        </div>
      </div>
      <div id="contact">
        <h3>Contact</h3>
        <p>bilkent-cs-senior-greenation@googlegroups.com</p>
      </div>
    </section>
  );
}

export default MeetTheTeam;
