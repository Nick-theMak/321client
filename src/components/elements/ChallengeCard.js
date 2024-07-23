import React from 'react';
import './ChallengeCard.css';

const ChallengeCard = ({ title, description, imgSrc }) => {
  return (
    <div className="challenge-card">
      <img src={imgSrc} alt={title} className="challenge-image" />
      <div className="challenge-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="see-challenges-button">See Challenges</button>
      </div>
    </div>
  );
};

export default ChallengeCard;
