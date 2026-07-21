import { Container } from '../../components/Container';
import { CountDown } from '../../components/CountDown';
import { Cycle } from '../../components/Cycle';
import { FocusFlame } from '../../components/FocusFlame';
import { MainForm } from '../../components/MainForm';
import type { TaskStateModel } from '../../Models/TaskStateModule';
import { MainTemplate } from '../../templates/MainTemplate';

type HomeProps = {
  stateHome: TaskStateModel
  setStateHome: React.Dispatch<React.SetStateAction<TaskStateModel>>
}

export function Home(props: HomeProps) {
  /* const {stateHome, setStateHome} = props; */ 

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
