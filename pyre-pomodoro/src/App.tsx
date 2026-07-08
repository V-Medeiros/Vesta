import { CirclePauseIcon, CogIcon, FlameKindling, HistoryIcon, HomeIcon, MoonIcon, PlayIcon, SquareIcon } from 'lucide-react';
import './App.css';
import { Container } from './components/Container';
import { Heading } from './components/Heading';

export function App() {
  return (
    <>
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
          <div className='Menu'>
          <button className='menu-button'>
            <HomeIcon className='button-menu' />
          </button>
          <button className='menu-button'>
            <CogIcon className='button-menu' />
          </button>
          <button className='menu-button'>
            <HistoryIcon className='button-menu' />
          </button>
          <button className='menu-button'>
            <MoonIcon className='button-menu' />
          </button>
          </div>
        </Container>
      </section>

    {/* TIMER */}
      <section>
        <Container>
          <div className='Timer'>00:00</div>
        </Container>
      </section>

    {/* TASK */}
      <section>
        <Container>task input</Container>
      </section>
      <section>
        <Container>
          <div className='Menu'>
          <button className='menu-button'>
            <PlayIcon className='button-menu' />
          </button>
          <button className='menu-button'>
            <CirclePauseIcon className='button-menu' />
          </button>
          <button className='menu-button'>
            <SquareIcon className='button-menu' />
          </button>
          </div>
        </Container>
      </section>

    {/* FOOTER */}
      <section>
        <Container>Footer</Container>
      </section>
    </>
  );
}
