import type { TaskModel } from "../Models/TaskModel";

export function NextCycleType(currentCycle: number): TaskModel['type'] {
    if (currentCycle % 8 === 0 || currentCycle === 4) return 'longBreakTime';
    if (currentCycle % 2 === 0) return 'shortBreakTime';
    return 'workTime';
}