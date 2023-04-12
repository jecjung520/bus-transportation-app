import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text, FlatList} from 'react-native';

const BookmarkScreen = () => {
  const [newBookmark, setNewBookmark] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = () => {
    if (newBookmark.trim() === '') {
      return;
    }
    setBookmarks(prevBookmarks => [...prevBookmarks, newBookmark]);
    setNewBookmark('');
  };

  const renderItem = ({item}) => (
    <View style={styles.bookmarkItem}>
      <Text style={styles.bookmarkTitle}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add bookmarked route"
          onChangeText={setNewBookmark}
          value={newBookmark}
        />
        <TouchableOpacity style={styles.addButton} onPress={addBookmark}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.bookmarkList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookmarkList: {
    marginTop: 10,
  },
  bookmarkItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bookmarkTitle: {
    fontSize: 16,
  },
});

export default BookmarkScreen;
