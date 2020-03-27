import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    
    const ong_id = localStorage.getItem('ong_id');

    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await api.post('/incidents',
                {title, description, value},
                {headers: {Authorization: ong_id}});
            
                history.push('/profile');
        }
        catch(err){
            alert('Erro ao criar novo caso, tente novamente');
        }
    }   

    return (
        <div>
            <div className="new-incidents-container">
                <div className="content">
                    <section>
                        <img src={logo} alt="Be The Hero"/>

                        <h1>Cadastrar novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>
                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041"/>
                            Voltar para a home
                        </Link>
                    </section>

                    <form onSubmit={handleSubmit}>
                        <input 
                            placeholder="Titulo do caso"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea 
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        <input 
                            type="number" 
                            placeholder="Valor em reais"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />

                        <div className="button-group">
                            <button className="button button-cancel" type="button">Cancelar</button>
                            <button className="button" type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
