import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FaMapMarkerAlt, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";

import api from '../../services/api';
import noImage from '../../assets/no-image.png';
import './style.css'; 

export default function ProgCientifica(){

	const eventDays = ["12/12/2020","13/12/2020","14/12/2020","15/12/2020"];
	let [activities , setActivities] = useState([]);


	useEffect(() => {
		api.get('', { /*headers: { Authorization: eventId }*/ })
			.then(response => {
				console.log(response);

				let data = response.data.map(a => ({...a, 
					iniOrder: 
						a.DataPalestra.substring(0,10)
						.concat(a.HoraInicioPalestra.substring(11,16))
						.replace(/:|-/g, ""),
					DataPalestra: a.DataPalestra.substring(8,10).concat("/")
						.concat(a.DataPalestra.substring(5,7)).concat("/")
						.concat(a.DataPalestra.substring(0,4)),
					HoraInicioPalestra: a.HoraInicioPalestra.substring(11,16),
					HoraFimPalestra: a.HoraFimPalestra.substring(11,16),
					DataInicioAtividade: a.DataInicioAtividade.substring(8,10).concat("/")
						.concat(a.DataInicioAtividade.substring(5,7)).concat("/")
						.concat(a.DataInicioAtividade.substring(0,4)),
					DataFimAtividade: a.DataFimAtividade.substring(8,10).concat("/")
						.concat(a.DataFimAtividade.substring(5,7)).concat("/")
						.concat(a.DataFimAtividade.substring(0,4)),
					HoraInicioAtividade: a.HoraInicioAtividade.substring(11,16),
					HoraFimAtividade: a.HoraFimAtividade.substring(11,16),
					PalestranteImgUrl: (a.PalestranteImgUrl == null ? noImage : a.PalestranteImgUrl)
				}))

				setActivities(groupBy( data, 'AtividadeId'));
			})
	}, []); 

	function groupBy(data, key) {
			return data.reduce((acc, x) => {
				acc[x[key]] = [...(acc[x[key]] || []), x];
				return acc;
			}, []);
	}

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
										activities.map(activity => (
											activity.filter(talk => talk.DataPalestra == day)
											.sort((a,b) => a.iniOrder - b.iniOrder)
											.map((talk, index) => (
												<div key={talk.PalestraId} className="activity-item">
													
													{(talk.CategoriaPalestra != "PALESTRANTE" ? (
														<div className="activity-infos">
															<span className="activity-title">Atividade: {talk.DescricaoAtividade}</span>
															<span className="activity-desc">Atividade: {talk.ObsAtividade}</span>
															<span className="activity-title">Atividade: {talk.CategoriaPalestra}</span>
															
															<div className="finding-infos row">
																<span className="date col-sm-3 col-md-2"> 
																	<FaRegCalendarAlt size={16} color="red" className="evIcon"/>
																	{talk.DataInicioAtividade}
																</span>
																<span className="date col-sm-4 col-md-3"> 
																	<FaRegClock size={16} color="red" className="evIcon"/>
																	{talk.HoraInicioPalestra} - {talk.HoraFimPalestra}
																</span>
																<span className="location col-sm-4 col-md-7">
																	<FaMapMarkerAlt size={16} color="red" className="evIcon"/>
																	{talk.LocalAtividade}
																</span>
															</div>
														</div>
													) : (""))}
											
													<div key={talk.PalestraId} className="event-item">
														<div className="row">
															<div className="speaker-infos">
																{/* <img src={talk.DescricaoAtividade} alt=""/> */}
																<span>Palestra {talk.TemaPalestra}</span>
																<span>Subtema Palestra{talk.SubtemaPalestra}</span>
															</div>
														</div>
													</div>
												</div>
											))
										))
									}

									{
//                                         events.filter(event => event.DataPalestra == day)
//                                         .sort((a,b) => a.iniOrder - b.iniOrder)
//                                         .map(event => (
													
//                                             <div key={event.PalestraId} className="event-item">

//                                                 <div className="row">
//                                                     <div className="speaker-infos col-sm-2">
//                                                         <img src={event.PalestranteImgUrl} alt=""/>
//                                                         <span>{event.PalestranteNome}</span>
//                                                     </div>

//                                                     <div className="event-infos col-sm-10">
//                                                         <h2>{event.TemaPalestra}</h2>

//                                                         <div className="finding-infos row">
//                                                             <span className="date col-sm-3 col-md-2"> 
//                                                                 <FaRegCalendarAlt size={16} color="red" className="evIcon"/>
//                                                                 {event.DataPalestra}
//                                                             </span>
//                                                             <span className="date col-sm-4 col-md-3"> 
//                                                                 <FaRegClock size={16} color="red" className="evIcon"/>
//                                                                 {event.HoraInicioPalestra} - {event.HoraFimPalestra}
//                                                             </span>
//                                                             <span className="location col-sm-4 col-md-7">
//                                                                 <FaMapMarkerAlt size={16} color="red" className="evIcon"/>
//                                                                 {event.LocalAtividade}
//                                                             </span>
//                                                         </div>
// {/* 
//                                                         <strong>Palestrante:</strong>
//                                                         <p>{event.PalestranteNome}</p> */}

//                                                         <strong>Informações:</strong>
//                                                         <p>{event.DescricaoAtividade}</p>
//                                                     </div>
//                                                 </div>
															
//                                             </div>
//                                         ))
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
