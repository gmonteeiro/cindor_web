import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FaMapMarkerAlt, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";

import api from '../../services/api';
import noImage from '../../assets/no-image.png';
import './style.css'; 

export default function ProgCientifica(){

    const eventDays = ["12/12/2020","13/12/2020","14/12/2020","15/12/2020"]

    let [events, setEvents] = useState([]);
    events = events.map(a => ({...a, 
        iniOrder: 
            a.DataPalestra.substring(0,10)
            .concat(a.HoraInicioPalestra.substring(11,16))
            .replace(/:|-/g, ""),
        DataPalestra: a.DataPalestra.substring(8,10).concat("/")
            .concat(a.DataPalestra.substring(5,7)).concat("/")
            .concat(a.DataPalestra.substring(0,4)),
        HoraInicioPalestra: a.HoraInicioPalestra.substring(11,16),
        HoraFimPalestra: a.HoraFimPalestra.substring(11,16),
        PalestranteImgUrl: (a.PalestranteImgUrl == null ? noImage : a.PalestranteImgUrl)
    }));


    useEffect(() => {
        api.get('', { /*headers: { Authorization: eventId }*/ })
            .then(response => {
                console.log(response);
                setEvents(response.data);
            })
    }, []); 
    

    return(
        
        <div className="event-container">
            <div className="top-header">
                <h1>Programação <br/> Científica <span>.</span></h1>
            </div>           

            <Accordion defaultActiveKey="0">
                {
                    eventDays.map((day, index) => (
                        <Card key={day}>
                            <Card.Header>
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={index}>
                                    <span className="event-day"> Dia {index+1}</span> {day}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index}>
                                <Card.Body>
                                    {
                                        events.filter(event => event.DataPalestra === day)
                                        .sort((a,b) => a.iniOrder - b.iniOrder)
                                        .map(event => (
                                            
                                            <div key={event.PalestraId} className="event-item">

                                                <div className="row">
                                                    <div className="speaker-infos col-sm-2">
                                                        <img src={event.PalestranteImgUrl} alt=""/>
                                                        <span>{event.PalestranteNome}</span>
                                                    </div>

                                                    <div className="event-infos col-sm-10">
                                                        <h2>{event.TemaPalestra}</h2>

                                                        <div className="finding-infos row">
                                                            <span className="date col-sm-3 col-md-2"> 
                                                                <FaRegCalendarAlt size={16} color="red" className="evIcon"/>
                                                                {event.DataPalestra}
                                                            </span>
                                                            <span className="date col-sm-4 col-md-3"> 
                                                                <FaRegClock size={16} color="red" className="evIcon"/>
                                                                {event.HoraInicioPalestra} - {event.HoraFimPalestra}
                                                            </span>
                                                            <span className="location col-sm-4 col-md-7">
                                                                <FaMapMarkerAlt size={16} color="red" className="evIcon"/>
                                                                {event.LocalAtividade}
                                                            </span>
                                                        </div>
                                                        {/* 
                                                        <strong>Palestrante:</strong>
                                                        <p>{event.PalestranteNome}</p> */}

                                                        <strong>Informações:</strong>
                                                        <p>{event.DescricaoAtividade}</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        ))
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))
                }  
            </Accordion>
        </div>
    ) 
}
