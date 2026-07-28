import styles from './style.module.css';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { getNextCycle } from '../../utils/getNextcycle';
import { NextCycleType } from '../../utils/NextCycleType';
import type { TaskModel } from '../../Models/TaskModel';

const cycleDescriptionMap: Record<TaskModel['type'], string> = {
  workTime: 'foco',
  shortBreakTime: 'descanso curto',
  longBreakTime: 'descanso longo',
};

export function Cycle() {
  const { ContextState } = useTaskContext();
  const cycleSteps = Array.from({ length: 8 });

  if (ContextState.currentCycle === 0) return null;

  return (
    <div className={styles.cycle}>
      <div className={styles.cycleDots} role='list' aria-label='Etapas do ciclo'>
        {cycleSteps.map((_, index) => {
          const cycleNumber = getNextCycle(index);
          const cycleType = NextCycleType(cycleNumber);
          const isFilled = cycleNumber <= ContextState.currentCycle;
          const isCurrent = cycleNumber === ContextState.currentCycle;
          const cycleStatus = isFilled ? 'preenchido' : 'pendente';
          const description = `Ciclo ${cycleNumber}: ${
            cycleDescriptionMap[cycleType]
          }, ${cycleStatus}`;

          return (
            <span
              key={cycleNumber}
              className={`${styles.cycleDot} ${styles[cycleType]} ${
                isFilled ? styles.filled : ''
              } ${isCurrent ? styles.current : ''}`}
              role='listitem'
              aria-label={description}
              title={description}
            />
          );
        })}
      </div>

      <span className={styles.cycleText}>
        {ContextState.currentCycle} out of 8
      </span>
    </div>
  );
}
