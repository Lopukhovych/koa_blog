import React from 'react';
import {Link} from 'react-router-dom';
import {
  FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram, FaCameraRetro,
} from 'react-icons/fa';

const SocialList = {
  facebook: 'facebook',
  twitter: 'twitter',
  googlePlus: 'google-plus',
  instagram: 'instagram',
};

export const getSocialLinkIcon = (socialNetwork) => {
  switch (socialNetwork.title) {
    case SocialList.facebook:
      return (
        <Link to={socialNetwork.link} className="social-facebook">
          <FaFacebookF size={24} />
        </Link>
      );
    case SocialList.twitter:
      return (
        <Link to={socialNetwork.link} className="social-twitter">
          <FaTwitter size={24} />
        </Link>
      );
    case SocialList.googlePlus:
      return (
        <Link to={socialNetwork.link} className="social-google-plus">
          <FaGooglePlusG size={24} />
        </Link>
      );
    case SocialList.instagram:
      return (
        <Link to={socialNetwork.link} className="social-instagram">
          <FaInstagram size={24} />
        </Link>
      );
    default:
      return (
        <Link to={socialNetwork.link} className="social-default">
          <FaCameraRetro size={24} />
        </Link>
      );
  }
};
