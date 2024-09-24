"use client"

import React, { useState, useEffect } from 'react';

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

const SnackCard = ({ snack }) => {
    "use client";
    return (
        <div className="snack-card">
            <h3 className="snack-name">{snack.name}</h3>
            <p className="snack-description">{snack.description}</p>
            <span className="snack-price">${snack.price}</span>
        </div>
    );
};

export default function Page() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const [snacks, setSnacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSnacks(apiKey);
                setSnacks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiKey]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or animation
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
