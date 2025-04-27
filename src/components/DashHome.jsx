import React, { useState, useEffect } from 'react';
import { GiSettingsKnobs } from "react-icons/gi";
import { MdPowerSettingsNew } from "react-icons/md";
import { FaFireAlt } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';
import { ResponsiveContainer } from 'recharts';
import PieChart from './charts/PieChart';
import DoughnutChart from './charts/DoughnutChart';
import '../styles/dashhome.css';
import Cards from './cards/Cards';

const API = "https://mcuconnect.com/dashboard-api/machines";

const DashHome = () => {
  const [machineData, setMachineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachineData = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error('Failed to fetch machine data');
        }
        const data = await response.json();
        setMachineData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMachineData();
  }, []);

  // Calculate metrics
  const totalMachines = machineData.length;
  const onlineMachines = machineData.filter(machine => 
    machine.status?.toLowerCase() === 'online'
  ).length;
  const burningEnabledMachines = machineData.filter(machine => 
    machine.burning_status?.toLowerCase() === 'burning'
  ).length;
  const totalBurningCycles = machineData.reduce((total, machine) => 
    total + (parseInt(machine.burning_cycles) || 0), 0
  );
  const totalCollection = machineData.reduce((total, machine) => 
    total + (parseFloat(machine.collection) || 0), 0
  );
  const totalItemsDispensed = machineData.reduce((total, machine) => 
    total + (parseInt(machine.items_dispensed) || 0), 0
  );

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <main className='main-container'>
      <div className='main-title'>
  <h3 className="dashboard-heading">DASHBOARD</h3> {/* Added className */}
</div>

      <Cards/>
      
      <div className='charts'>
        {/* Charts will use context data as before */}
        <ResponsiveContainer width="60%" height="60%">
          <p2 style={{ color: 'black', fontWeight: 'bold' }}>Machine Status</p2>
          <PieChart />
        </ResponsiveContainer>
        <ResponsiveContainer width="60%" height="60%">
          <p2 style={{ color: 'black', fontWeight: 'bold' }}>Burning Status</p2>
          <DoughnutChart />
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default DashHome;