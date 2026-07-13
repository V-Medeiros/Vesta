import { FlameKindling, PlayIcon } from 'lucide-react';
import './App.css';
import { Menu } from './components/Menu';
import { FocusFlame } from './components/FocusFlame';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycle } from './components/Cycle';
import { DefaultButton } from './components/DefaultButton';

export function App() {
  return (
    <div className='app'>
      <header className='app-header'>
        <a className='brand' href='#session-title' aria-label='Vesta — ir para a sessão de foco'>
          <span className='brand-mark' aria-hidden='true'>
            <FlameKindling />
          </span>
          <span>VESTA</span>
        </a>

        <Menu />
      </header>

      <main className='app-main' aria-labelledby='session-title'>
        <h1 className='session-title' id='session-title'>Sessão de foco</h1>

        <FocusFlame />
        <CountDown />

        <form className='task-form' onSubmit={(event) => event.preventDefault()}>
          <DefaultInput
            type='text'
            id='inputTask'
            labelText='Tarefa'
            placeholder='Qual é o foco desta sessão?'
            autoComplete='off'
          />

          <DefaultButton type='submit' icon={<PlayIcon />}>
            Iniciar foco
          </DefaultButton>
        </form>

        <Cycle />
      </main>

      <footer className='app-footer'>
        <span className='footer-spark' aria-hidden='true' />
        <span>Uma faísca de cada vez.</span>
      </footer>
    </div>
  );
}
