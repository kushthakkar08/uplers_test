import { useState, useEffect } from 'react';

const JavaScriptPage = () => {
    const [stations, setStations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch('https://api.irail.be/stations/?format=json');
                const data = await response.json();
                setStations(data.station);
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };

        fetchStations();
    }, []);

    const handleSearch = (event:any) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (type:any) => {
        if (type === sortType) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortType(type);
            setSortDirection('asc');
        }
    };

    const sortedStations = [...stations].sort((a:any, b:any) => {
        const compareValueA = sortType === 'name' ? a.name : sortType === 'latitude' ? a.locationX : a.locationY;
        const compareValueB = sortType === 'name' ? b.name : sortType === 'latitude' ? b.locationX : b.locationY;

        if (sortDirection === 'asc') {
            return compareValueA.localeCompare(compareValueB);
        } else {
            return compareValueB.localeCompare(compareValueA);
        }
    });

    const filteredStations = sortedStations.filter((station:any) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Train Stations</h1>
            <input
                type="text"
                placeholder="Search by station name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th onClick={() => handleSort('latitude')}>Latitude</th>
                        <th onClick={() => handleSort('longitude')}>Longitude</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStations.map((station:any, index) => (
                        <tr key={index}>
                            <td>
                                <a
                                    href={`https://www.google.com/maps?q=${station.locationX},${station.locationY}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {station.name}
                                </a>
                            </td>
                            <td>{station.locationX}</td>
                            <td>{station.locationY}</td>
                            <td><input type="text" placeholder="Add note" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JavaScriptPage;
