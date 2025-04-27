import React from 'react';

import Cards from '../components/cards/Cards';

import MachinesTable from '../components/table/MachinesTable';

function Machinedata() {
  // Inline styles object
  const styles = {
    container: {
      padding: '20px'
    },
    heading: {
      color: '#2c3e50',
      textAlign: 'center',
      fontSize: '1.8rem',
      fontWeight: '600',
      margin: '20px 0 30px',
      position: 'relative',
      paddingBottom: '10px'
    },
    headingAfter: {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '3px',
      background: 'linear-gradient(90deg, #3498db, #2ecc71)',
      borderRadius: '3px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        MACHINE DATA
        <span style={styles.headingAfter}></span>
      </h2>
      
      <Cards/>
      
      <MachinesTable/>
    </div>
  );
}

export default Machinedata;