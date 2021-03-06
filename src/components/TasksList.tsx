import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';
export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, text: string) => void;
  editing: number | undefined;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | undefined>>
  handleEditTextTask: (id: number, text: string) => void;
  setNewText: React.Dispatch<React.SetStateAction<string>>;
  newText: string;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask, editing, setEditingIndex, handleEditTextTask, newText }: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={({id}) => String(id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <View>
            {editing === item.id ? (
                  <TextInput 
                    style={{height: 56, flex: 1, color: '#666666', paddingVertical: 15, paddingHorizontal: 24, alignItems: 'center', marginLeft: 30}} 
                    value={newText}
                    returnKeyType="send"
                    onChangeText={text => editTask(item.id,text)}
                    onSubmitEditing={() => {handleEditTextTask(item.id, newText); setEditingIndex(undefined)}}
                    />
                ):(
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={editing === item.id ? undefined : () => toggleTaskDone(item.id)}
              >
                  <>
                  <View 
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>
                    <Text 
                    style={item.done ? styles.taskTextDone : styles.taskText}
                  >
                    {item.title}
                  </Text>
                  </>

              </TouchableOpacity>
                    )}
            </View>
            <View style={{ flexDirection: 'row' }}>
              {editing === item.id ?  (              
              <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 24 }}
                onPress={() => setEditingIndex(undefined)}
              >
                <Icon name="x" size={24} color="#b2b2b2" />
              </TouchableOpacity>):
              (
                <>
                <TouchableOpacity
                  testID={`edit-${index}`}
                  style={{ paddingHorizontal: 24 }}
                  onPress={() => editTask(item.id, item.title)}
                >
                  <Icon name="edit-2" size={24} color="#b2b2b2" />
                </TouchableOpacity>
  
                <TouchableOpacity
                  testID={`trash-${index}`}
                  style={{ paddingHorizontal: 24 }}
                  onPress={() => removeTask(item.id)}
                >
                  <Icon name="trash" size={24} color="#b2b2b2" />
                </TouchableOpacity>
                  </>
              )}
            </View>
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})