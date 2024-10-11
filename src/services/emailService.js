// src/services/emailService.js

import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_lms98ij'; 
const SIGNUP_TEMPLATE_ID = 'template_1im1exq'; 
const HOST_SIGNUP_TEMPLATE_ID = 'template_1im1exq'; 
const FORGOT_PASSWORD_TEMPLATE_ID = 'template_rr4u90v'; 
const USER_ID = 'HXNWnVh9qXOXwvbfH'; // Replace with your EmailJS user ID

export const sendSignupEmail = (username, email) => {
  const templateParams = {
    username,
    email,
  };

  emailjs.send(SERVICE_ID, SIGNUP_TEMPLATE_ID, templateParams, USER_ID)
    .then(response => {
      console.log('Signup email sent successfully!', response.status, response.text);
    }, err => {
      console.error('Failed to send signup email.', err);
    });
};

export const sendHostSignupEmail = (username, email, school) => {
  const templateParams = {
    username,
    email,
    school,
  };

  emailjs.send(SERVICE_ID, HOST_SIGNUP_TEMPLATE_ID, templateParams, USER_ID)
    .then(response => {
      console.log('Host signup email sent successfully!', response.status, response.text);
    }, err => {
      console.error('Failed to send host signup email.', err);
    });
};

export const sendForgotPasswordEmail = (email) => {
  const templateParams = {
    email,
  };

  emailjs.send(SERVICE_ID, FORGOT_PASSWORD_TEMPLATE_ID, templateParams, USER_ID)
    .then(response => {
      console.log('Forgot password email sent successfully!', response.status, response.text);
    }, err => {
      console.error('Failed to send forgot password email.', err);
    });
};
