import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InputHTMLAttributes, InvalidEvent, useState } from 'react';
import styles from './App.module.css';
import { Header } from './components/Header';
import { EmptyTask } from './components/EmptyTask';
import { Task } from './components/Task';

interface ITaskList {
  id: number;
  content: string;
  checked: boolean;
}

function App() {
  const [tasksList, setTaskList] = useState<ITaskList[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTaskList([...tasksList, { id: new Date().getTime(), content: newTaskText, checked: false }]);
    setNewTaskText('');
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório');
  }

  function checkedTask(idChecked: number, taskChecked: boolean) {
    const newTaskList = tasksList.map(task => {
      if (task.id === idChecked) {
        task.checked = taskChecked;
      }
      return task;
    });
    console.log(newTaskList);
    setTaskList(newTaskList);
  }

  function deleteTask(idToDelete: number) {
    const taskWhithoutDeleteOne = tasksList.filter(task => task.id !== idToDelete);
    setTaskList(taskWhithoutDeleteOne);
  }

  const taskCompleted = tasksList.filter(task => task.checked);
  return (
    <>
      <Header />
      <form onSubmit={handleCreateNewTask} className={styles.newTask}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onInvalid={handleNewTaskInvalid}
          value={newTaskText}
          onChange={handleNewTaskChange}
          required
        />
        <button type="submit">Criar <PlusCircle size={18} /></button>
      </form>
      <main className={styles.tasks}>
        <header className={styles.info}>
          <div className={styles.created}>
            <p>Tarefas Criadas</p>
            <span>{tasksList.length}</span>
          </div>
          <div className={styles.done}>
            <p>Concluídas</p>
            {tasksList.length ? (<span>{taskCompleted.length} de {tasksList.length}</span>) : (<span>0</span>)}
          </div>
        </header>
        <section className={styles.list}>
          {(tasksList.length > 0)
            ?
            tasksList.map(task => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  content={task.content}
                  onDeleteTask={deleteTask}
                  onCheckedTask={checkedTask}
                  isChecked={task.checked}
                />
              )
            })
            :
            <EmptyTask />
          }
        </section>
      </main>
    </>
  )
}

export default App
