import React,{useState} from 'react';
import { FiLogIn} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../services/api';

export default function Logon() {

    const history = useHistory();

    const [id, setId] = useState('');

    async function handleLogin(e){
        e.preventDefault();
        
        try{
            const response = await api.post('/sessions',{id});

            localStorage.setItem('ong_id',id);
            localStorage.setItem('ong_name',response.data.name);
            
            history.push('/profile');
        }catch(err){
            alert('Não existe ONG com esse ID');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}
