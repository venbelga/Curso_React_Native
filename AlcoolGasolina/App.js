import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal
} from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorAlcool: '',
      valorGasolina: '',
      usar: '',
      exibirModal: false
    };

    this.calcular = this.calcular.bind(this);
  }

  calcular() {
    let alcool = parseFloat(this.state.valorAlcool.replace(',', '.'));
    let gasolina = parseFloat(this.state.valorGasolina.replace(',', '.'));
    if (isNaN(alcool) || isNaN(gasolina)) {
      alert('Digite um valor numérico válido!');
      return;
    }
    let resultado = alcool / gasolina;
    if (resultado >= 0.7) {
      this.setState({ usar: 'Compensa usar Gasolina!' });
    } else {
      this.setState({ usar: 'Compensa usar Álcool!' });
    }
    this.setState({ exibirModal: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerImg}>
          <Image style={styles.img} source={require('./src/logo.png')} />
          <Text style={styles.textoLogo}>Qual melhor opção?</Text>
        </View>
        <View style={styles.containerFormulario}>
          <Text style={styles.textoFormulario}>Álcool(preço por litro):</Text>
          <TextInput style={styles.imputFormulario} onChangeText={(text) => this.setState({ valorAlcool: text })} />
          <Text style={styles.textoFormulario}>Gasolina(preço por litro):</Text>
          <TextInput style={styles.imputFormulario} onChangeText={(text) => this.setState({ valorGasolina: text })} />
          <TouchableOpacity style={styles.btnCalcular} onPress={this.calcular}>
            <Text style={styles.textoBtnCalcular}>Calcular</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.exibirModal}
        >
          <View style={styles.container}>
            <View style={styles.containerImg}>
              <Image style={styles.img} source={require('./src/gas.png')} />
              <Text style={styles.textoMelhorOpcao}>{this.state.usar}</Text>
            </View>
            <View style={styles.resultado}>
              <Text style={styles.tituloResultado}>Com os preços:</Text>
              <Text style={styles.textoresultado}>Álcool: R$ {this.state.valorAlcool}</Text>
              <Text style={styles.textoresultado}>Gasolina: R$ {this.state.valorGasolina}</Text>
              <TouchableOpacity style={styles.btnCalcularNovamente} onPress={() => this.setState({ exibirModal: false })}>
                <Text style={styles.textoBtnCalcularNovamente}>Calcular Novamente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  containerImg: {
    alignItems: 'center',
    marginTop: 100
  },
  img: {
    width: 200,
    height: 200
  },
  textoLogo: {
    color: '#FFF',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  containerFormulario: {
    marginTop: 70,
    paddingLeft: 20,
    paddingRight: 20
  },
  textoFormulario: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 10,
  },
  imputFormulario: {
    borderWidth: 1,
    backgroundColor: '#FFF',
    height: 50,
    marginBottom: 20,
    color: '#000',
    fontSize: 18,
    borderRadius: 5,
  },
  btnCalcular: {
    backgroundColor: '#ef4130',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textoBtnCalcular: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textoMelhorOpcao: {
    color: '#2FF807',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  resultado: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  tituloResultado: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  textoresultado: {
    color: '#FFF',
    fontSize: 20,
    marginTop: 10
  },
  btnCalcularNovamente: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#ef4130',
    borderWidth: 2,
    marginTop: 50,
    width: '60%'
  },
  textoBtnCalcularNovamente: {
    color: '#ef4130',
    fontSize: 18,
    fontWeight: 'bold'
  }

});