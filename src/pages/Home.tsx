import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTaskTitle: string) => {
    const addedTask: Task = {
      id: tasks.length,
      title: newTaskTitle,
      done: false,
    }
    setTasks(previousTasks => ([...previousTasks, addedTask]));
  }
  
  const handleRemoveTask = (id: number) => {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== id));
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