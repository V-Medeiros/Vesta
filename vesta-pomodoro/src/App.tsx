import { FlameKindling } from 'lucide-react';
import './App.css';
import { Container } from './components/Container';
import { Heading } from './components/Heading';
import { Menu } from './components/Menu';
import { Controller } from './components/Controller';
import { FocusFlame } from './components/FocusFlame';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycle } from './components/Cycle';

export function App() {
  return (
    <div className='app'>
      <header className='app-header'>
        <Container>
          <Heading>
            <button className='logo-button'>
              <FlameKindling className='logo-icon' />
            </button>
            VESTA
          </Heading>
          <Menu />
        </Container>
      </header>

      <main>
        <Container>
          {/* Chama de foco, cronômetro e controles da sessão */}
          <section className='timer-area'>
            <FocusFlame />
            <CountDown />
            <Controller />
          </section>

          {/* Tarefa atual e sequência de ciclos do Pomodoro */}
          <section className='session-details'>
            <form className='task-form'>
              <DefaultInput type='text' id='inputTask' labelText='Task' />
            </form>

            <Cycle />
          </section>
        </Container>
      </main>

      <footer className='app-footer'>
        <Container>
          <div className='footer-content'>
            <span className='footer-brand'>VESTA</span>
            <span className='footer-divider' />
            <span className='footer-copy'>One spark at a time.</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
