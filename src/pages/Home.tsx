import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditingIndex] = useState<number| undefined>(undefined);
  const [newText, setNewText] = React.useState('');

  const handleAddTask = (newTaskTitle: string) => {
    const editedTaskIndex = tasks.findIndex(task => task.title === newTaskTitle);

    if(editedTaskIndex > -1){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar task com o mesmo nome');
      return;
    }

    const addedTask: Task = {
      id: tasks.length,
      title: newTaskTitle,
      done: false,
    }
    setTasks(previousTasks => ([...previousTasks, addedTask]));
  }
  
  const handleRemoveTask = (id: number) => { 
    Alert.alert('Remover item', 'Tem certza que você deseja remover este item?', [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => setTasks(previousTasks => previousTasks.filter(task => task.id !== id)),
      },
    ]);
  }

  const handleEditTask = React.useCallback((id: number, text: string) => {
    setNewText(text);
    setEditingIndex(id);
  },[tasks])

  const handleEditTextTask = (id: number, text: string) => {
    if(text.length === 0){
      Alert.alert('Tsk Vazia', 'Você não pode cadastrar uma task vazia');
      return;
    }
    const editedTaskIndex = tasks.findIndex(task => task.id === id);

    const EditTask = {
      id,
      done: tasks[editedTaskIndex].done,
      title: text
    };

    setTasks(previousTasks => {
      let editedTask = previousTasks;
      editedTask[editedTaskIndex] = EditTask;
      return (
        [...editedTask]
      )
    });
  }

  const handleToggleTaskDone = (id: number) => {
    const toogledTaskIndex = tasks.findIndex(task => task.id === id);

    const DoneTask = {
      id,
      done: !tasks[toogledTaskIndex].done,
      title: tasks[toogledTaskIndex].title
    };

    setTasks(previousTasks => {
      let toogledTask = previousTasks;
      toogledTask[toogledTaskIndex] = DoneTask;
      return (
        [...toogledTask]
      )
    });
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
        editing={editing}
        setEditingIndex={setEditingIndex}
        handleEditTextTask={handleEditTextTask}
        setNewText={setNewText}
        newText={newText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})