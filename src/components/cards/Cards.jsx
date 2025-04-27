import React, { useState, useEffect } from 'react';
import { MdPowerSettingsNew } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaFireAlt } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';
import './cards.css';

const API_URL = "https://mcuconnect.com/dashboard-api/machines";

function Cards() {
  const [machineData, setMachineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch machine data');
        }
        const data = await response.json();
        setMachineData(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate metrics
  const totalMachines = machineData.length;
  const onlineMachines = machineData.filter(
    machine => machine?.status?.toLowerCase() === 'online'
  ).length;
  const burningEnabledMachines = machineData.filter(
    machine => machine?.burning_status?.toLowerCase() === 'burning'
  ).length;
  const totalBurningCycles = machineData.reduce(
    (total, machine) => total + (parseInt(machine?.burning_cycles) || 0), 
    0
  );

  if (loading) {
    return <div className="cards-container loading">Loading data...</div>;
  }

  if (error) {
    return <div className="cards-container error">Error: {error}</div>;
  }

  return (
    <div className='cards-container'>
      {/* Machine Installed Card */}
      <div className='card'>
        <div className='card-inner'>
          <div className="icon-circle circle-color1">
            <GiSettingsKnobs className='card_icon card_icon1' />
          </div>
          <div className='text-container'>
            <p className='text-title'>Machine Installed</p>
            <h1>{totalMachines}</h1>
          </div>
        </div>
      </div>

      {/* Machine Running Card */}
      <div className='card'>
        <div className='card-inner'>
          <div className="icon-circle circle-color2">
            <MdPowerSettingsNew className='card_icon card_icon2' />
          </div>
          <div className='text-container'>
            <p className='text-title'>Machine Running</p>
            <h1>{onlineMachines}</h1>
          </div>
        </div>
      </div>

      {/* Burning Enabled Card */}
      <div className='card'>
        <div className='card-inner'>
          <div className="icon-circle circle-color2">
            <FaFireAlt className='card_icon card_icon2' />
          </div>
          <div className='text-container'>
            <p className='text-title'>Burning Enabled</p>
            <h1>{burningEnabledMachines}</h1>
          </div>
        </div>
      </div>

      {/* Burning Cycle Card */}
      <div className='card'>
        <div className='card-inner'>
          <div className="icon-circle circle-color3">
            <FiRefreshCcw className='card_icon card_icon3' />
          </div>
          <div className='text-container'>
            <p className='text-title'>Burning Cycle</p>
            <h1>{totalBurningCycles}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;