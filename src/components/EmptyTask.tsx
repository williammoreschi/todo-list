import styles from './EmptyTask.module.css';
import { ClipboardText } from "phosphor-react";

export function EmptyTask() {
  return (
    <div className={styles.emptyTask}>
      <ClipboardText size={56} />
      <p><b>Você ainda não tem tarefas cadastradas</b><br />Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}