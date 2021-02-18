import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

function Fetch() {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:3000/products/')
      .then((resp) => resp.json())
      .then((json) => setDados(json))
      .catch((err) => alert('Erro ao carregar os produtos!' + err))
      .finally(() => setCarregando(false));
  }, [dados]);

  return (
    <View style={{flex: 1, marginBottom: 20}}>
      <View style={styles.divPageTitle}>
        <Text style={styles.pageTitle}>Lista de Produtos</Text>
      </View>
      {carregando ? (
        <ActivityIndicator />
      ) : (
        <FlatList style={styles.list}
          data={dados}
          keyExtractor={({_id}) => _id}
          renderItem={({item}) => (
            <View style={styles.divProduct}>
              <Text style={styles.titleProduct}>{item.name}</Text>
              <View style={styles.divFlexProduct}>
                <Text style={styles.priceProduct}>{item.price}</Text>
                <Text style={styles.qntProduct}>{item.quantity == 1 ? item.quantity + ' unidade disponível' : item.quantity + ' unidades disponíveis'}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  divPageTitle: {
    alignItems: 'center',
    backgroundColor: '#53CA55',
    height: 50,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  pageTitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  list: {
    backgroundColor: '#F6F7F9',
    height: '100%',
  },
  divProduct: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    elevation: 2,
  },
  titleProduct: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  divFlexProduct: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  priceProduct: {
    color: '#53CA55',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qntProduct: {
    fontSize: 14,
  },
});

export default Fetch;


/* TODO:
- Re-render na lista sempre que a tela for chamada;
*/