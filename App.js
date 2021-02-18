import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Fetch from './components/Fetch';
import RegistForm from './components/RegistForm';

const Drawer = createDrawerNavigator();

function Home({navigation}) {
  return (
    <SafeAreaView style={styles.safeDiv}>
      <Image source={require('./assets/wave.png')} style={styles.wave} />
      <Text style={styles.title}>Cadastro de Produtos</Text>
      <RegistForm />
    </SafeAreaView>
  );
}

function List({navigation}) {
  return <Fetch />;
}

function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContentOptions={{
          activeTintColor: '#53CA55',
          itemStyle: { marginVertical: 5 },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{title: 'Cadastro de Produtos'}}
        />
        <Drawer.Screen
          name="List"
          component={List}
          options={{title: 'Lista de Produtos'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeDiv: {
    backgroundColor: '#F3F5F2',
    height: '100%',
  },
  wave: {
    resizeMode: 'cover',
    maxWidth: '25%',
    position: 'absolute',
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 20,
    maxHeight: 100,
    maxWidth: 100,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default App;
