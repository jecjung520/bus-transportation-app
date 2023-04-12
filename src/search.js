import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = () => {
    // A dummy data of buses. This later can be implemented to retrieve API or database
    const dummyResults = [
      {id: '1', title: 'Bus 1'},
      {id: '2', title: 'Bus 2'},
      {id: '3', title: 'Bus 3'},
    ];
    setResults(dummyResults);
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.resultItem}>
      <Text style={styles.resultTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search buses or routes"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={search}
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.resultsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultsList: {
    marginTop: 10,
  },
  resultItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultTitle: {
    fontSize: 16,
  },
});

export default SearchScreen;
