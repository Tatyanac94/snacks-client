// "use client"

// import React, { useEffect, useState } from 'react';

// async function fetchSnacks() {
//     const apiKey = process.env.NEXT_PUBLIC_API_KEY; 
//     const res = await fetch(`https://deployed-snacks-project.vercel.app/api/snacks`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${apiKey}`, 
//         },
//     });

//     if (!res.ok) {
//         throw new Error('Failed to fetch snacks');
//     }
//     return res.json();
// }

// const SnackCard = ({ snack }) => {
//     return (
//         <div className="snack-card">
//             <h3 className="snack-name">{snack.name}</h3>
//             <p className="snack-description">{snack.description}</p>
//             <span className="snack-price">${snack.price}</span>
//         </div>
//     );
// };

// export default function Page() {
//     const [snacks, setSnacks] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true); // Loading state

//     useEffect(() => {
//         const loadSnacks = async () => {
//             try {
//                 const fetchedSnacks = await fetchSnacks();
//                 setSnacks(fetchedSnacks);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false); // Set loading to false after fetch
//             }
//         };

//         loadSnacks();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>; // Loading message
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="container">
//             <h1 className="snack-list-title">Snack List</h1>
//             <div className="snacks-grid">
//                 {snacks.map(snack => (
//                     <SnackCard key={snack.id} snack={snack} />
//                 ))}
//             </div>
//         </div>
//     );
// }










// // src/app/page.js
// src/app/page.js

import React from 'react';

// Function to fetch snacks
async function fetchSnacks(apiKey) {
    const res = await fetch('https://deployed-snacks-project.vercel.app/api/snacks', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch snacks');
    }
    return res.json();
}

// SnackCard component (client component)
const SnackCard = ({ snack }) => {
    return (
        <div className="snack-card">
            <h3 className="snack-name">{snack.name}</h3>
            <p className="snack-description">{snack.description}</p>
            <span className="snack-price">${snack.price}</span>
        </div>
    );
};

// Page component (server component)
export default async function Page() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    let snacks = [];
    let error = null;

    try {
        snacks = await fetchSnacks(apiKey);
    } catch (err) {
        error = err.message;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="snack-list-title">Snack List</h1>
            <div className="snacks-grid">
                {snacks.map(snack => (
                    <SnackCard key={snack.id} snack={snack} />
                ))}
            </div>
        </div>
    );
}
