import { FlameKindling, PlayCircleIcon } from 'lucide-react';
import './App.css';
import { Container } from './components/Container';
import { Heading } from './components/Heading';
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
          {/* FocusFlame, CountDown e Controller */}
          <section className='timer-area'>
            <FocusFlame />
            <CountDown />
            <DefaultButton icon={<PlayCircleIcon/>} />
          </section>

          {/* DefaultInput e Cycle  botaodefault*/}
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
