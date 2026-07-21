import { CountDown } from '../../components/CountDown';
import { Cycle } from '../../components/Cycle';
import { FocusFlame } from '../../components/FocusFlame';
import { MainForm } from '../../components/MainForm';
import type { TaskStateModel } from '../../Models/taskStateModule';
import { MainTemplate } from '../../templates/MainTemplate';

type HomeProps = {
  state: TaskStateModel
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>
}

export function Home(props: HomeProps) {
  return (
    <MainTemplate>
      <section className='timer-area' aria-labelledby='session-title'>
        <FocusFlame />
        <h2 className='session-title' id='session-title'>
          Focus
        </h2>
        <CountDown />
        <Cycle />
        <MainForm />
      </section>
    </MainTemplate>
  );
}
