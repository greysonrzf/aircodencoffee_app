import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import SpotList from '../components/SpotList'

// import { Container } from './styles';
import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim())

      setTechs(techsArray)
    })
  }, [])

  function handleLogout() {
    AsyncStorage.clear()

    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    marginTop: 20
  },

  logo: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 15
  }
})