"use client"

import React, { useEffect, useState } from 'react';

async function fetchSnacks() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY; 
    const res = await fetch(`https://deployed-snacks-project.vercel.app/api/snacks`, {
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

const SnackCard = ({ snack }) => {
    return (
        <div className="snack-card">
            <h3 className="snack-name">{snack.name}</h3>
            <p className="snack-description">{snack.description}</p>
            <span className="snack-price">${snack.price}</span>
        </div>
    );
};

export default function Page() {
    const [snacks, setSnacks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSnacks = async () => {
            try {
                const fetchedSnacks = await fetchSnacks();
                setSnacks(fetchedSnacks);
            } catch (error) {
                setError(error.message);
            }
        };

        loadSnacks();
    }, []);

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