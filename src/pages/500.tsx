import Link from 'next/link';
import React from 'react';

const Custom500 = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>500 - Server-side error occurred</h1>
      <p style={styles.description}>
        Something went wrong on our end. Please try again later.
      </p>
      <Link href="/">Back home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    textAlign: 'center' as 'center',
  },
  title: {
    fontSize: '2rem',
    margin: '0.5rem 0',
  },
  description: {
    fontSize: '1.2rem',
    margin: '0.5rem 0',
  },
  link: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default Custom500;
