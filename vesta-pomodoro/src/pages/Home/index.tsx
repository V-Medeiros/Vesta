import { CountDown } from '../../components/CountDown';
import { Cycle } from '../../components/Cycle';
import { FocusFlame } from '../../components/FocusFlame';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate';


export function Home() {
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
