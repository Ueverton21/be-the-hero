import React, {useEffect, useState} from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity,
    FlatList} from 'react-native';
import { Feather } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native';

import styles from './styles';

import logo from '../../../assets/logo.png';

import api from '../../services/api';

export default function Incidents() {

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }
        setLoading(true);

        try{
            const response = await api.get(`/incidents?page=${page}`);
            setIncidents([...incidents, ...response.data]);
            setTotal(response.headers['x-total-count']);
            setPage(page + 1);
            setLoading(false);
        }catch(err){
            alert(err);
        }
    }
    
    useEffect(() => {
        loadIncidents();
    }, []);

    const navigate = useNavigation();

    function renderInicident(incident){
        return(
            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>R$ {incident.value.toFixed(2)}</Text>

                <TouchableOpacity style={styles.detailsButton} onPress={() => {navigate.navigate('Details', {incident})}}>
                    <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#E02041"/>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo}/>
                <Text style={styles.headerText}>
                    Total de: <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator
                style={styles.incidentList}
                data={incidents}
                renderItem={ ({ item: incident }) => renderInicident(incident)}
                keyExtractor={incident => String(incident.id)}
            />

        </View>
    );
}