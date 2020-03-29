import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as MailComposer from 'expo-mail-composer';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import logo from '../../../assets/logo.png';

export default function Details({route}) {

  const { incident } = route.params;

  const navigation = useNavigation();
  const message = `Olá ${incident.name}, estou entrando em contato pois estou disposto a fazer uma doação no valor de R$ ${incident.value}.`;

  function sendEmail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [`${incident.email}`],
      body: message
    });
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${'55'+incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo}/>
        <TouchableOpacity onPress={() => {navigation.goBack()} }>
          <Feather name="arrow-left" size={28} color="#E02041"/>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty , {marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>R$ {incident.value.toFixed(2)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>

          <TouchableOpacity style={styles.action} onPress={() => sendWhatsapp()}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={() => sendEmail()}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
}