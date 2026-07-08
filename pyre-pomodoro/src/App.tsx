import { FlameKindling } from 'lucide-react';
import './App.css';
import { Container } from './components/Container';
import { Heading } from './components/Heading';
import { Menu } from './components/Menu';
import { Controller } from './components/Controller';
import { FocusFlame } from './components/FocusFlame';
import { CountDown } from './components/CountDown';

export function App() {
  return (
    <div className='app'>
    {/*HEADER */}
      <section>
        <Container>
          <Heading>
            <button className='logo-button'>
              <FlameKindling className='logo-icon' />
            </button>
            PYRE
          </Heading>
        </Container>
      </section>

    {/*MENU */}
      <section>
        <Container>
          <Menu/>
        </Container>
      </section>

    {/* FLAME */}
      <section>
        <Container>
          <FocusFlame/>
        </Container>
      </section>

    {/* TIMER */}
      <section className='timer-section'>
        <Container>
          <CountDown />
        </Container>
      </section>

    {/* CONTROLLER */}
      <section>
      <Controller/>
      </section>
      
    {/* TASK */}
      <section>
        <Container>task input</Container>
      </section>
      

    
    {/* FOOTER */}
      <section>
        <Container>
          <footer className='app-footer'>
            <span className='footer-brand'>PYRE</span>
            <span className='footer-divider' />
            <span className='footer-copy'>One spark at a time.</span>
          </footer>
        </Container>
      </section>
    </div>
  );
}
