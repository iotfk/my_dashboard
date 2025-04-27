// import React, { useState, useEffect } from 'react';
// import './mylayout.css';
// import ResponsiveTable from '../table/ResponsiveTable';
// import { GiSettingsKnobs } from "react-icons/gi";
// import { MdPowerSettingsNew } from "react-icons/md";
// import { FaFireAlt } from 'react-icons/fa';
// import { FiRefreshCcw } from 'react-icons/fi';

// const API = "https://mcuconnect.com/dashboard-api/machines";

// function MyLayout() {
//   const [machineData, setMachineData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMachineData = async () => {
//       try {
//         const response = await fetch(API);
//         const data = await response.json();
//         setMachineData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching machine data:', error);
//         setLoading(false);
//       }
//     };

//     fetchMachineData();
//   }, []);

//   // Calculate metrics
//   const totalMachines = machineData.length;
//   const onlineMachines = machineData.filter(machine => 
//     machine.status?.toLowerCase() === 'online'
//   ).length;
//   const burningEnabledMachines = machineData.filter(machine => 
//     machine.burning_status?.toLowerCase() === 'burning'
//   ).length;
//   const totalBurningCycles = machineData.reduce((total, machine) => 
//     total + (parseInt(machine.burning_cycles) || 0, 0
//   ));

//   if (loading) return <div className="layout-container">Loading...</div>;

//   return (
//     <div className="layout-container">
//       <div className="cards-container">
//         {/* Machine Installed Card */}
//         <div className="card">
//           <GiSettingsKnobs size={24} />
//           <h3>Machine Installed</h3>
//           <h1>{totalMachines}</h1>
//         </div>

//         {/* Machine Running Card */}
//         <div className="card">
//           <MdPowerSettingsNew size={24} />
//           <h3>Machine Running</h3>
//           <h1>{onlineMachines}</h1>
//         </div>

//         {/* Burning Enabled Card */}
//         <div className="card">
//           <FaFireAlt size={24} />
//           <h3>Burning Enabled</h3>
//           <h1>{burningEnabledMachines}</h1>
//         </div>

//         {/* Burning Cycle Card */}
//         <div className="card">
//           <FiRefreshCcw size={24} />
//           <h3>Burning Cycle</h3>
//           <h1>{totalBurningCycles}</h1>
//         </div>
//       </div>

//       <div className="table-container">
//         <ResponsiveTable 
//           machineData={machineData}
//         />
//       </div>
//     </div>
//   );
// }

// export default MyLayout;


// import React, { useState, useEffect } from 'react';
// import './mylayout.css';
// import ResponsiveTable from '../table/ResponsiveTable';
// import { GiSettingsKnobs } from "react-icons/gi";
// import { MdPowerSettingsNew } from "react-icons/md";
// import { FaFireAlt } from 'react-icons/fa';
// import { FiRefreshCcw } from 'react-icons/fi';

// const API = "https://mcuconnect.com/dashboard-api/machines";

// function MyLayout() {
//   const [machineData, setMachineData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMachineData = async () => {
//       try {
//         const response = await fetch(API);
//         if (!response.ok) {
//           throw new Error('Failed to fetch machine data');
//         }
//         const data = await response.json();
//         setMachineData(data || []); // Ensure we always have an array
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching machine data:', error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchMachineData();
//   }, []);

//   // Calculate metrics with proper error handling
//   const totalMachines = machineData?.length || 0;
//   const onlineMachines = machineData?.filter(machine => 
//     machine?.status?.toLowerCase() === 'online'
//   )?.length || 0;
//   const burningEnabledMachines = machineData?.filter(machine => 
//     machine?.burning_status?.toLowerCase() === 'burning'
//   )?.length || 0;
//   const totalBurningCycles = machineData?.reduce((total, machine) => 
//     total + (parseInt(machine?.burning_cycles) || 0
//   , 0) || 0;

//   if (loading) return <div className="layout-container">Loading...</div>;
//   if (error) return <div className="layout-container">Error: {error}</div>;

//   return (
//     <div className="layout-container">
//       <div className="cards-container">
//         {/* Machine Installed Card */}
//         <div className="card">
//           <GiSettingsKnobs size={24} />
//           <h3>Machine Installed</h3>
//           <h1>{totalMachines}</h1>
//         </div>

//         {/* Machine Running Card */}
//         <div className="card">
//           <MdPowerSettingsNew size={24} />
//           <h3>Machine Running</h3>
//           <h1>{onlineMachines}</h1>
//         </div>

//         {/* Burning Enabled Card */}
//         <div className="card">
//           <FaFireAlt size={24} />
//           <h3>Burning Enabled</h3>
//           <h1>{burningEnabledMachines}</h1>
//         </div>

//         {/* Burning Cycle Card */}
//         <div className="card">
//           <FiRefreshCcw size={24} />
//           <h3>Burning Cycle</h3>
//           <h1>{totalBurningCycles}</h1>
//         </div>
//       </div>

//       <div className="table-container">
//         <ResponsiveTable 
//           machineData={machineData}
//         />
//       </div>
//     </div>
//   );
// }

// export default MyLayout;


// import React, { useState, useEffect } from 'react';
// import './mylayout.css';
// import ResponsiveTable from '../table/ResponsiveTable';
// import { GiSettingsKnobs } from "react-icons/gi";
// import { MdPowerSettingsNew } from "react-icons/md";
// import { FaFireAlt } from 'react-icons/fa';
// import { FiRefreshCcw } from 'react-icons/fi';

// const API = "https://mcuconnect.com/dashboard-api/machines";

// function MyLayout() {
//   const [machineData, setMachineData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMachineData = async () => {
//       try {
//         const response = await fetch(API);
//         if (!response.ok) {
//           throw new Error('Failed to fetch machine data');
//         }
//         const data = await response.json();
//         setMachineData(data || []);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching machine data:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchMachineData();
//   }, []);

//   // Calculate metrics with proper error handling
// //   const totalMachines = machineData?.length || 0;
// //   const onlineMachines = machineData?.filter(machine => 
// //     machine?.status?.toLowerCase() === 'online'
// //   )?.length || 0;
// //   const burningEnabledMachines = machineData?.filter(machine => 
// //     machine?.burning_status?.toLowerCase() === 'burning'
// //   )?.length || 0;
// //   const totalBurningCycles = machineData?.reduce((total, machine) => 
// //     total + (parseInt(machine?.burning_cycles) || 0, 0) || 0;



// // Calculate metrics with proper error handling
// const totalMachines = machineData?.length || 0;
// const onlineMachines = machineData?.filter(machine => 
//   machine?.status?.toLowerCase() === 'online'
// )?.length || 0;
// const burningEnabledMachines = machineData?.filter(machine => 
//   machine?.burning_status?.toLowerCase() === 'burning'
// )?.length || 0;
// const totalBurningCycles = machineData?.reduce((total, machine) => 
//   total + (parseInt(machine?.burning_cycles) || 0), 0);



//   if (loading) {
//     return <div className="layout-container">Loading...</div>;
//   }

//   if (error) {
//     return <div className="layout-container">Error: {error}</div>;
//   }

//   return (
//     <div className="layout-container">
//       <div className="cards-container">
//         <div className="card">
//           <GiSettingsKnobs size={24} />
//           <h3>Machine Installed</h3>
//           <h1>{totalMachines}</h1>
//         </div>

//         <div className="card">
//           <MdPowerSettingsNew size={24} />
//           <h3>Machine Running</h3>
//           <h1>{onlineMachines}</h1>
//         </div>

//         <div className="card">
//           <FaFireAlt size={24} />
//           <h3>Burning Enabled</h3>
//           <h1>{burningEnabledMachines}</h1>
//         </div>

//         <div className="card">
//           <FiRefreshCcw size={24} />
//           <h3>Burning Cycle</h3>
//           <h1>{totalBurningCycles}</h1>
//         </div>
//       </div>

//       <div className="table-container">
//         <ResponsiveTable machineData={machineData} />
//       </div>
//     </div>
//   );
// }

// export default MyLayout;


import React, { useState, useEffect } from 'react';
import './mylayout.css';
import '../././../styles/dashhome.css'
import ResponsiveTable from '../table/ResponsiveTable';
import { GiSettingsKnobs } from "react-icons/gi";
import { MdPowerSettingsNew } from "react-icons/md";
import { FaFireAlt } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';

const API = "https://mcuconnect.com/dashboard-api/machines";

function MyLayout() {
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
        setMachineData(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching machine data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMachineData();
  }, []);

  const totalMachines = machineData?.length || 0;
  const onlineMachines = machineData?.filter(machine =>
    machine?.status?.toLowerCase() === 'online'
  )?.length || 0;
  const burningEnabledMachines = machineData?.filter(machine =>
    machine?.burning_status?.toLowerCase() === 'burning'
  )?.length || 0;
  const totalBurningCycles = machineData?.reduce((total, machine) =>
    total + (parseInt(machine?.burning_cycles) || 0), 0);

  if (loading) {
    return <div className="layout-container">Loading...</div>;
  }

  if (error) {
    return <div className="layout-container">Error: {error}</div>;
  }

  return (
    <div className="layout-container">
      <div className="cards-container">
    
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

      <div className="table-container">
        {/* <ResponsiveTable machineData={machineData} /> */}
      </div>
    </div>
  );
}

export default MyLayout;
