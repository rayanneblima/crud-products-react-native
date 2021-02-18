import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function RegistForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('R$ ');
  const [quantity, setQuantity] = useState('');

  function onSubmit() {
    if(name == '' || !name || name.length < 3) {
      alert('Informe o nome do produto!');
      return;
    }
    if(price == 0 || !price || price.length < 4) {
      alert('Informe o preço!');
      return;
    }
    if(quantity <= 0 || !quantity) {
      alert('Informe a quantidade!');
      return;
    }

    if(name.length > 0 && price.length > 3 && quantity > 0) {
      fetch('http://10.0.2.2:3000/products/create/', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({name: name, price: price, quantity: quantity}),
      })
      .then(response => {
        if(response.status !== 200) {
          alert("Erro HTTP: " + response.status);
        } else {
          alert("Produto cadastrado com sucesso!");
          setName('');
          setPrice('R$ ');
          setQuantity('');
        }
      })
      .catch(err => alert("Erro ao cadastrar produto:" + err));
    }
  }

  return (
    <View style={styles.div}>
      <Text style={styles.title}>Nome do Produto:</Text>
      <TextInput
        style={styles.txtInput}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.title}>Preço:</Text>
      <TextInput
        style={styles.txtInput}
        value={price}
        keyboardType="numeric"
        onChangeText={(text) => setPrice(text)}
      />
      <Text style={styles.title}>Quantidade:</Text>
      <TextInput
        style={styles.txtInput}
        value={quantity}
        keyboardType="numeric"
        onChangeText={(text) => setQuantity(text)}
      />
      <View>
        <TouchableOpacity style={styles.btnSend} onPress={() => onSubmit()}>
          <Text style={styles.txtBtnSend}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    marginTop: 30,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtInput: {
    borderColor: '#aaa',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
  },
  btnSend: {
    backgroundColor: '#53CA55',
    borderColor: '#aaa',
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
    width: '100%'
  },
  txtBtnSend: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default RegistForm;
