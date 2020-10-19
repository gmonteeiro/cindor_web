import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';


import { FaMapMarkerAlt, FaRegClock, FaRegCalendarAlt } from "react-icons/fa";

import api from '../../services/api';
import noImage from '../../assets/no-image.png';
import bgImage from '../../assets/bg-progcientifica.jpg';
import './style.css'; 
import { resolve } from 'path';

export default function ProgCientifica(){

	const eventDays = ["12/12/2020","13/12/2020","14/12/2020","15/12/2020"];
	const speakerTypes = ["PALESTRANTE", "EQUIPE DE PROFESSORES", "DEBATEDOR"]
	const [activities, setActivities] = useState([]);
	const [events, setEvents] = useState([]);

	let [state, setState] = useState({
		show: false,
		activeItem:''
	});

		
	

  function handleClose() {
		setState({activeItem:'', show: false });
	};

	function setData(dt){
		setState({activeItem:dt, show: true })
	}

	

	let type = "";

	async function getFromApi(type){
		const url = (type === 'Activities' ? ('/GetAtividades?codEve=3') : ('?codEve=3'));

		await api.get(url, {})
		.then(res => {
			const data = res.data.map(a => ({...a, 
				iniOrder: 
					a.DataInicioAtividade.substring(0,10)
					.concat(a.HoraInicioAtividade.substring(11,16))
					.concat((a.OrdemPalestra == null ? '' : a.OrdemPalestra))
					.replace(/:|-/g, ""),
				DataPalestra: (a.DataPalestra == null ? ('') : (a.DataPalestra.substring(8,10).concat("/")
					.concat(a.DataPalestra.substring(5,7)).concat("/")
					.concat(a.DataPalestra.substring(0,4)))),
				HoraInicioPalestra: (a.HoraInicioPalestra == null ? '' : a.HoraInicioPalestra.substring(11,16)),
				HoraFimPalestra: (a.HoraFimPalestra == null ? '' : a.HoraFimPalestra.substring(11,16)),
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
			.sort((a,b) => a.iniOrder - b.iniOrder);

			console.log(data);
			(type === 'Activities' ? (setActivities(data)) : (setEvents(data)));
		})

		setState({
			show: false,
			activeItem:''
		});
	}


	useEffect(() => {
		getFromApi('Activities');
		getFromApi('Events');
	}, []); 

	return(
		<div className="event-content">
			<div className="top-header">
				<div className="img-container">
					<img src={bgImage} alt=""/>
				</div>
				<h1>Programação <br/> Científica <span>.</span></h1>
			</div>  

			<div className="container event-container">
				<Tabs>
					{
						eventDays.map((day, index) => (
							<Tab eventKey={index} title={day} key={index} >
								{
									
									activities.filter(talk => talk.DataInicioAtividade === day)
										.map((talk, idx) => (
											<div className="row" key={talk.AtividadeId}>
												<div className="col-sm-12">
													<div className="activity-item">
														
														{/* {talk.iniOrder} - Palestra: {talk.DataPalestra} {talk.HoraInicioPalestra} - Atividade: {talk.DataInicioAtividade} {talk.HoraInicioAtividade} */}
														
														{/* <div className="type">
															{type = ( speakerTypes.includes(talk.CategoriaPalestra) ? ( "talk" ) : ("activity"))}
														</div> */}
															
														<div className="activity-infos row">
															<div className="col-sm-12">
																<div className="title">{talk.DescricaoAtividade}</div>
															</div>

															<div className="date col-sm-12">
																	<FaRegClock size={14} color="red" className="icon"/>
																	{talk.HoraInicioAtividade} - {talk.HoraFimAtividade}
															</div>
															
															<div className="location col-sm-12">
																<FaMapMarkerAlt size={15} color="red" className="icon"/>
																{talk.LocalAtividade}
															</div>

															

															<div className="col-sm-12">
																<div className="row">
																	<div className="desc">{talk.ObsAtividade}</div>
																</div>
															</div>
														</div>
															
														{
															
															events.filter(a => a.AtividadeId == talk.AtividadeId)
															.sort((a,b) => a.iniOrder > b.iniOrder)
															.map((ev, idx) => {
																console.log(ev);
																type = speakerTypes.includes(ev.CategoriaPalestra) ? ("event") : ('activity');
																return (	
																	(type == "event" && (
																		<div className={'talk'} key={ev.PalestraId}>
																			<div className="talk-infos col-sm-10 offset-sm-2 col-md-11 offset-md-1">
																				<div className="dot"></div>
																				<div className="row">
																					<div className="date col-sm-3 col-md-2"> 
																						{ev.HoraInicioPalestra} - {ev.HoraFimPalestra}
																					</div>

																					<div className="talk-title col-sm-9 col-md-10"> 
																						{ev.TemaPalestra}
																					</div>
																				</div>
																				
																				<div className="row">
																					<div onClick={() => setData(talk)}
																							className={`speaker-infos ${(type === "talk" ? ("col-sm-9 col-md-10 offset-sm-3 offset-md-2") : ("col-sm-12"))}`}>
																						<div className="speaker-img">
																							<img src={ev.PalestranteImgUrl} alt=""/>
																						</div>
																						<div className="speaker-name">{ev.PalestranteNome}</div>
																						<div className="category">{ev.CategoriaPalestra}</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	))
																)
															})
														}

														{
															events.filter(a => a.AtividadeId == talk.AtividadeId)
															.map((ev, idx) => {
																type = speakerTypes.includes(ev.CategoriaPalestra) ? ("event") : ('activity');
																return (	
																	(type == "activity" && (
																		<div className={'activity'} key={ev.PalestraId}>
																			<div className="talk-infos col-sm-10 offset-sm-2 col-md-11 offset-md-1">
																				<div className="dot"></div>
																				<div className="row">
																					<div className="date col-sm-3 col-md-2"> 
																						{ev.HoraInicioPalestra} - {ev.HoraFimPalestra}
																					</div>

																					<div className="talk-title col-sm-9 col-md-10"> 
																						{ev.TemaPalestra}
																					</div>
																				</div>
																				
																				<div className="row">
																					<div onClick={() => setData(talk)}
																							className={`speaker-infos ${(type === "talk" ? ("col-sm-9 col-md-10 offset-sm-3 offset-md-2") : ("col-sm-12"))}`}>
																						<div className="speaker-img">
																							<img src={ev.PalestranteImgUrl} alt=""/>
																						</div>
																						<div className="speaker-name">{ev.PalestranteNome}</div>
																						<div className="category">{ev.CategoriaPalestra}</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	))
																)
															})
														}
														
													</div>
												</div>
											</div>
										))
								}
							</Tab>
						))
					}  
				</Tabs>
				
				<Modal show={state.show} onHide={handleClose} size="lg"> 
					<Modal.Header closeButton>
						<div className="row">
							<div className="col-sm-4">
								<div className="speaker-img">
									<img src={state.activeItem.PalestranteImgUrl} alt=""/>
								</div>
							</div>
							<div className="col-sm-8">
								<h3>{state.activeItem.PalestranteNome}</h3>
								<p>{state.activeItem.Minicurriculo}</p>
							</div>
						</div>
					</Modal.Header>
					<Modal.Body>
							<h3>PALESTRAS</h3>
							{
								
								activities.filter(talk => talk.PalestranteId === state.activeItem.PalestranteId)
								.sort((a,b) => a.iniOrder - b.iniOrder)
								.map((talk, idx) => (
									<div className="row talk-infos" key={idx}>
										<div className="col-sm-4">
											<span className="highlight">
												<FaRegCalendarAlt size={13} color="#ffffff" className="icon"/>
												{talk.DataPalestra} - {talk.HoraInicioAtividade} às {talk.HoraFimAtividade} 
											</span> 

											<p>	<FaMapMarkerAlt size={13} color="#9698b5" className="icon"/>
											{talk.LocalAtividade} </p>
										</div>

										<div className="talk-title col-sm-8"> 
											{talk.TemaPalestra}
										</div>
									</div>
								))
							}
					</Modal.Body>
				</Modal>

			</div>
		</div>
	) 
}
