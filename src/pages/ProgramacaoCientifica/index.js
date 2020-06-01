import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './style.css';

export default function ProgCientifica(){

    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get('', { /*headers: { Authorization: eventId }*/ })
            .then(response => {
                console.log(response);
                setEvents(response.data);
            })
    }, ); 

    return(
        
        <div className="event-container">
            <div className="top-header">
                <h1>Programação <br/> Científica <span>.</span></h1>
            </div>

            <div className="event-section">
                <ul>
                    {events.map(event => (
                        <li key={event.PalestraId}>
                            <strong>Palestrante:</strong>
                            <p>{event.PalestranteNome}</p>

                            <strong>Título:</strong>
                            <p>{event.DescricaoAtividade}</p>

                        </li>
                    ))}
                </ul>
            </div>
        
        </div>
        
    ) 
}
