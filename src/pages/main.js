import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, LoadingPage } from 'react-native';

export default class Main extends Component {


  static navigationOptions = {
    title: 'MEUS FILMES',
  }

  state = {
    arr: [],
    page: 1,
    counter: 0,
    loading: false
  }

  componentDidMount() {
    this.loadTotalPaginas();
    this.loadFilmes();
  }

  loadTotalPaginas = async () => {
    const response = await api.get();
    const counter = response.data.length;

    this.setState({ counter });
  };

  loadFilmes = async (page = 1) => {

    if (this.state.loading) return;

    this.setState({ loading: true });

    const response = await api.get(`/${page}?sort=rating&order=-1&genre=all`);
    const arr = response.data;
    console.log(page);

    this.setState({
      arr: [...this.state.arr, ...arr],
      page,
      loading: false
    });

  }

  loadMore = () => {
    const { page, counter } = this.state;

    if (page === counter) return;

    const pageNumber = page + 1;

    this.loadFilmes(pageNumber);


  };

  renderItem = ({ item }) => (
    <View style={styles.filmContainer}>
      <Image
        style={styles.filmImage}
        source={{ uri: item.images.poster }}
      />
      <View style={styles.filmDados}>
        <Text style={styles.filmTitle}>{item.title}</Text>
        <Text style={styles.filmYear}>{item.year}</Text>

        <TouchableOpacity style={styles.filmButton} >
          <Text style={styles.filmButtonText}>+ Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.arr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
        />
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 20,
  },
  filmContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15
  },
  filmImage: {
    width: 130,
    height: 186,
    backgroundColor: '#ff4040',
  },
  filmDados: {
    width: 250,
    padding: 10,
  },
  filmButton: {
    height: 42,
    width: 150,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#e50914',
    backgroundColor: 'transparent',
    lineHeight: 24,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filmButtonText: {
    fontSize: 16,
    color: '#e50914',
    fontWeight: 'bold',
  },
  filmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  filmYear: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 5,
  },

});
//https://tv-v2.api-fetch.website/movies/1?sort=rating&order=-1&genre=all
