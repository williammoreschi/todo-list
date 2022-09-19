import styles from './Task.module.css';
import { Trash } from 'phosphor-react';
import { ChangeEvent } from 'react';

interface ITask {
  id: number;
  content: string;
  onDeleteTask: (data: number) => void;
  onCheckedTask: (data: number, checked: boolean) => void;
  isChecked: boolean;
}

export function Task({ id, content, onDeleteTask, onCheckedTask, isChecked, ...props }: ITask) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }
  function handleCheckedTask(event: ChangeEvent<HTMLInputElement>) {
    onCheckedTask(id, event.target.checked);
  }
  return (
    <div className={styles.task}>
      <label>
        {(isChecked) ? (
          <input
            type="checkbox"
            checked
            onChange={handleCheckedTask}
            {...props}
          />
        ) : (
          <input
            type="checkbox"
            onChange={handleCheckedTask}
            {...props}
          />
        )}
        <p>{content}</p>
      </label>
      <button type="button" onClick={handleDeleteTask} title="Delete"><Trash size={18} /></button>
    </div>
  );
}