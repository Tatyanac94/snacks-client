import React from 'react';

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

// Page component (Server Component)
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
