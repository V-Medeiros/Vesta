import { FlameKindling, PlayIcon } from 'lucide-react';
import './App.css';
import { Heading } from './components/Heading';
import { Menu } from './components/Menu';
import { FocusFlame } from './components/FocusFlame';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycle } from './components/Cycle';
import { DefaultButton } from './components/DefaultButton';

export function App() {

  return (
    <>
      <div className='app'>
        <header className='app-header'>
          <Heading>
            <span className='logo-mark' aria-hidden='true'>
              <FlameKindling className='logo-icon' />
            </span>
            VESTA
          </Heading>

          <nav className='mode-menu' aria-label='Modos do temporizador'>
            <button className='mode-button active-mode' type='button'>
              Pomodoro
            </button>
            <button className='mode-button' type='button'>
              Stopwatch
            </button>
            <button className='mode-button' type='button'>
              Timer
            </button>
          </nav>

          <Menu />
        </header>

        <main className='app-main'>
          <section className='timer-area' aria-labelledby='session-title'>
            <FocusFlame />
            <h2 className='session-title' id='session-title'>
              Focus
            </h2>
            <CountDown />
            <Cycle />

            <form className='task-form'>
              <DefaultInput
                type='text'
                id='inputTask'
                labelText='Foco da sessao'
                placeholder='What drives you today?'
              />
              <DefaultButton type='button' icon={<PlayIcon />} color='orange'>
                Start
              </DefaultButton>
              {/* <DefaultButton type='button' icon={<PlayIcon />} color='red'>
              Stop
            </DefaultButton>*/}
            </form>
          </section>
        </main>

        <footer className='app-footer'>
          <div className='footer-content'>
            <span className='footer-divider' aria-hidden='true' />
            <span className='footer-copy'>One spark at a time.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
