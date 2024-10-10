import React from 'react';
import './OfflineResources.css';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download'; 

const resources = [
  {
    name: 'Cryptography_Hashing.pdf',
    link: 'https://drive.google.com/file/d/1YIbrr0v4AxV82T-DANHZUluq2yMKS3dN/view?usp=sharing',
  },
  {
    name: 'Cryptography-Hashing In-Depth.pdf',
    link: 'https://drive.google.com/file/d/1IkWQ0IN4QwjsVX3YZDJnmVV3OehhJbKa/view?usp=sharing',
  },
  {
    name: 'Cryptography- HashingAdvanced.pdf',
    link: 'https://drive.google.com/file/d/1zbQ1gS8X1ZqffL9-Yc10Qqmcg1UIYPdO/view?usp=sharing',
  },
  {
    name: 'OSINT.pdf',
    link: 'https://drive.google.com/file/d/1pk6HsXncWecA2Q8tBuDFTxo6Hkm65sHP/view?usp=sharing',
  },
  {
    name: 'SocialMediaMining.pdf',
    link: 'https://drive.google.com/file/d/1njwRef5huhbLdWfkQYTXRA_7mPhrNnId/view?usp=sharing',
  },
  {
    name: 'AnalyzingDataBreaches.pdf',
    link: 'https://drive.google.com/file/d/13ZTmrpvse-_7lFvsZ_aWFEcUjFqH8EN6/view?usp=sharing',
  },
  {
    name: 'SQLInjection.pdf',
    link: 'https://drive.google.com/file/d/1wHuuOb95lhza6bHM3t2efLn_mM8T9gg3/view?usp=sharing',
  },
  {
    name: 'XSS.pdf',
    link: 'https://drive.google.com/file/d/1TV0BmViC-eL_iQH_f4S4lTCZHa7CAqLh/view?usp=sharing',
  },
  {
    name: 'DirectoryTraversal.pdf',
    link: 'https://drive.google.com/file/d/1Jg_lo7Or7CcaH4vFC9t6nvye4GmIr4sf/view?usp=sharing',
  },
  {
    name: 'IPAddressing.pdf',
    link: 'https://drive.google.com/file/d/1PaNTySoaB7jxjEve9dV5h3snyn4POYX5/view?usp=sharing',
  },
  {
    name: 'DNSFundamentals.pdf',
    link: 'https://drive.google.com/file/d/1jn8Z2vtz-fD5k31BH8ADWSQR6WG-QsLX/view?usp=sharing',
  },
  {
    name: 'ConfiguringFirewalls.pdf',
    link: 'https://drive.google.com/file/d/161WWnOVh8Hr9qNk7qjTqHMlY8l0T0WKV/view?usp=sharing',
  },
];

const OfflineResources = () => {
    return (
      <div className="offline-resources">
        <Typography variant="h4" className="header">
          Offline Resources
        </Typography>
        <Typography variant="body1" className="description">
          Below are some downloadable resources to help you with your challenges. Click on the file name to download.
        </Typography>
        <List>
          {resources.map((resource, index) => (
            <ListItem
              key={index}
              button
              component={Link}
              href={resource.link}
              target="_blank"
              rel="noopener"
              className="resource-item"
            >
              <ListItemIcon>
                <PictureAsPdfIcon />
              </ListItemIcon>
              <ListItemText primary={resource.name} />
              {/* Add the download icon to the right */}
              <DownloadIcon className="download-icon" />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };
  
  export default OfflineResources;
