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

export default function ProgCientifica(){

	const eventDays = ["12/12/2020","13/12/2020","14/12/2020","15/12/2020"];
	const speakerTypes = ["PALESTRANTE", "EQUIPE DE PROFESSORES", "DEBATEDOR"]
	let [activities, setActivities] = useState([]);

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


	useEffect(() => {
		api.get('', { /*headers: { Authorization: eventId }*/ })
			.then(response => {
				console.log(response);

				const data = response.data.map(a => ({...a, 
					iniOrder: 
						a.DataInicioAtividade.substring(0,10)
						.concat(a.HoraInicioAtividade.substring(11,16))
						.concat(a.OrdemPalestra)
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

			setState({
				show: false,
				activeItem:''
			});

	}, []); 

	function groupBy(data, key) {
		return data.reduce((acc, x) => {
			acc[x[key]] = [...(acc[x[key]] || []), x];
			return acc;
		}, []);
	}

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
									activities.map(activity => (
										activity.filter(talk => talk.DataPalestra === day)
										.sort((a,b) => a.iniOrder - b.iniOrder)
										.map((talk, idx) => (
											<div className="row" key={talk.PalestraId}>
												<div className="col-sm-12">
													<div className="activity-item">
														<div className="type">
															{type = ( speakerTypes.includes(talk.CategoriaPalestra) ? ( "talk" ) : ("activity"))}
														</div>

														{/* <Button variant="primary" onClick={handleShow({ 
															nome:talk.PalestranteImgUrl, 
															img:talk.PalestranteImgUrl, 
															curriculo:talk.Minicurriculo
														})}>
															Launch demo modal
														</Button> */}

															
															{(idx === 0 ? (
																<div className="activity-infos row">
																	<div className="col-sm-12">
																		<div className="title">{talk.DescricaoAtividade}</div>
																	</div>
																	
																	<div className="location col-sm-12">
																		<FaMapMarkerAlt size={16} color="red" className="icon"/>
																		{talk.LocalAtividade}
																	</div>

																	<div className="date col-sm-12">
																			<FaRegClock size={15} color="red" className="icon"/>
																			{talk.HoraInicioAtividade} - {talk.HoraFimAtividade}
																	</div>

																	<div className="col-sm-12">
																		<div className="row">
																			<div className="desc">{talk.ObsAtividade}</div>
																		</div>
																		
																	
																		<div className={`${type}`}>
																			<div className="talk-infos col-sm-10 offset-sm-2 col-md-11 offset-md-1">
																				<div className="dot"></div>
																				<div className="row">
																					<div className="date col-sm-3 col-md-2"> 
																						{talk.HoraInicioPalestra} - {talk.HoraFimPalestra}
																					</div>

																					<div className="talk-title col-sm-9 col-md-10"> 
																						{talk.TemaPalestra}
																					</div>
																				</div>
																				
																				<div className="row">
																					<div onClick={() => setData(talk)} 
																							 className={`speaker-infos ${(type === "talk" ? ("col-sm-9 col-md-10 offset-sm-3 offset-md-2") : ("col-sm-12"))}`}>
																						<div className="speaker-img">
																							<img src={talk.PalestranteImgUrl} alt=""/>
																						</div>
																						<div className="speaker-name">{talk.PalestranteNome}</div>
																						<div className="category">{talk.CategoriaPalestra}</div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															) : (
																<div className={` ${type}`}>
																	<div className="talk-infos col-sm-10 offset-sm-2 col-md-11 offset-md-1">
																		<div className="dot"></div>
																		<div className="row">
																			<div className="date col-sm-3 col-md-2"> 
																				{talk.HoraInicioPalestra} - {talk.HoraFimPalestra}
																			</div>

																			<div className="talk-title col-sm-9 col-md-10"> 
																				{talk.TemaPalestra}
																			</div>
																		</div>
																		
																		<div className="row">
																			<div onClick={() => setData(talk)}
																					 className={`speaker-infos ${(type === "talk" ? ("col-sm-9 col-md-10 offset-sm-3 offset-md-2") : ("col-sm-12"))}`}>
																				<div className="speaker-img">
																					<img src={talk.PalestranteImgUrl} alt=""/>
																				</div>
																				<div className="speaker-name">{talk.PalestranteNome}</div>
																				<div className="category">{talk.CategoriaPalestra}</div>
																			</div>
																		</div>
																	</div>
																</div>
															))}
													</div>
												</div>
											</div>
										))
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
								activities.map(activity => (
									activity.filter(talk => talk.PalestranteId === state.activeItem.PalestranteId)
									.sort((a,b) => a.iniOrder - b.iniOrder)
									.map((talk) => (
										<div className="row talk-infos">
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
								))
							}
					</Modal.Body>
				</Modal>

			</div>
		</div>
	) 
}
