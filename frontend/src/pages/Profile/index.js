import React,{useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {

    const history = useHistory();

    const name = localStorage.getItem('ong_name');
    const id = localStorage.getItem('ong_id');
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        async function getIncidents(){
            try{
                const response = await api.get('/profile', {headers: {Authorization: id}});
                setIncidents(response.data);
            }   
            catch(err){
                alert('Erro na listagem de casos');
            }
        }
        getIncidents();
    }, [id]);

    function handleLogout(){
        localStorage.removeItem('ong_id');
        localStorage.removeItem('ong_name');
    
        history.push('/');
    }

    async function handleDeleteIncident(id_caso){
        try{
            await api.delete(`/incidents/${id_caso}`,{headers: {Authorization: id}});

            setIncidents(incidents.filter(incident => incident.id !== id_caso));
        }
        catch(err){
            console.log(err);
            alert('Erro ao tentar exluir esse caso', err);
        }
    }

    function renderIncident(incident){
        return(
            <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                <button onClick={() => handleDeleteIncident(incident.id)}>
                    <FiTrash2 size={20} color="#A8A8B3"/>
                </button>
            </li>
        );
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero" />
                <span>Bem vinda, {name}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => renderIncident(incident))}
            </ul>
        </div>
    );
}
