import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [profile, setProfile] = useState<any>(null);

  const handleScrape = async () => {
    const response = await axios.get('/api/linkedin/profile', {
      params: { url: linkedinUrl }
    });
    setProfile(response.data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="LinkedIn URL"
        value={linkedinUrl}
        onChange={(e) => setLinkedinUrl(e.target.value)}
      />
      <button onClick={handleScrape}>Scrape Profile</button>
      {profile && (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.photoUrl} alt={profile.name} />
        </div>
      )}
    </div>
  );
};

export default Profile;
