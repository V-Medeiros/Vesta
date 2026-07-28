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
  const cycleSteps = Array.from({ length: ContextState.currentCycle });

  if (ContextState.currentCycle === 0) return null;

  return (
    <div className={styles.cycle}>
      <div className={styles.cycleDots}>
        {cycleSteps.map((_, index) => {
          const cycleNumber = getNextCycle(index);
          const cycleType = NextCycleType(cycleNumber);
          const description =
            `Ciclo ${cycleNumber}: ${cycleDescriptionMap[cycleType]}`;

          return (
            <span
              key={cycleNumber}
              className={`${styles.cycleDot} ${styles[cycleType]}`}
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
