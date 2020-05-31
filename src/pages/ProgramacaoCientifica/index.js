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
                //setEvents(response.data);
            })
    }, ); 

    return(

        <div className="top-header">
            <h1>Programação <br/> Científica <span>.</span></h1>
        </div>
        
    ) 
}
