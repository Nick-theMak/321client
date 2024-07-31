import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompetitionHomePage.css';
import ChallengeCard from '../elements/ChallengeCard';
import '../../assets/images/OSINT.jpg'
import '../../assets/images/cryptography.jpg'
import '../../assets/images/exploit.png'
import '../../assets/images/networking.png'
import { Typography } from '@mui/material';

const challenges = [
  {
    title: 'Cryptography',
    description: 'Try your hand at some encryption, decryption, and code-breaking. Every cipher holds a secret waiting to be unveiled, are you ready?',
    imgSrc: require('../../assets/images/cryptography.jpg')
  },
  {
    title: 'Open Source Intelligence (OSINT)',
    description: 'Delve into the realm of digital investigation and intelligence gathering. Sift through the noise, piece together clues, and unravel mysteries using publicly available data.',
    imgSrc: require('../../assets/images/OSINT.jpg')
  },
  {
    title: 'Web Exploitation',
    description: 'Welcome to the frontier of cyber adventure, where the web becomes your playground and exploitation is the name of the game! Uncover vulnerabilities in our challenges and prove yourself!',
    imgSrc: require('../../assets/images/exploit.png')
  },
  {
    title: 'Networking',
    description: 'We invite you to dive into the dynamic world of our networking challenges. Gear up for an immersive experience where every connection counts and every packet tells a story.',
    imgSrc: require('../../assets/images/networking.png')
  }
];

const CompetitionHomePage = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const userDetails = JSON.parse(localStorage.getItem('user'));
      if (userDetails) {
        setUser(userDetails);
        console.log(user);
      } else {
        navigate('/login');
      }
    }

    loadUser();
  }, [navigate]);

  return (
    <div className="competition-home-page">
      <Typography variant="h5" className="header">
        Welcome {user.username}!
      </Typography>
      <div className="stats">
        <div className="stat">
          <h4>Current Team Points</h4>
          <p>200</p>
        </div>
        <div className="stat">
          <h4>Current Ranking</h4>
          <p>2/10</p>
        </div>
      </div>
      {/* <h2>Start a Challenge</h2>
      <button className="view-all-challenges-button">View All Challenges</button> */}
      <div className="challenges-carousel">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={index}
            title={challenge.title}
            description={challenge.description}
            imgSrc={challenge.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default CompetitionHomePage;
