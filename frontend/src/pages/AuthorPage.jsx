// pages/AuthorPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const AuthorPage = () => {
  const { id } = useParams();

  // In a real app, you would fetch author data based on the id
  const author = {
    id: 1,
    name: "Jack Kerouac",
    bio: "Jack Kerouac was an American novelist and Poet of French-Canadian ancestry."
  };

  return (
    <div>
      <h1>About Author</h1>
      
      <h2>Author Name:</h2>
      <p>{author.name}</p>
      
      <h2>Author Bio:</h2>
      <p>{author.bio}</p>
    </div>
  );
};

export default AuthorPage;