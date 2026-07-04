import { CirclePauseIcon, CogIcon, FlameKindling, HistoryIcon, HomeIcon, MoonIcon, PlayIcon, PlusIcon, SquareIcon } from 'lucide-react';
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
        <Container contentClassName='Menu'>
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
        <Container contentClassName='TaskPanel'>
          <div className='TaskHeader'>Tasks</div>
          <form className='TaskInputGroup'>
            <input
              className='TaskInput'
              type='text'
              placeholder='Add a focus task'
              aria-label='Add a focus task'
            />
            <button className='TaskAddButton' type='button' aria-label='Add task'>
              <PlusIcon className='TaskAddIcon' />
            </button>
          </form>
        </Container>
      </section>
    
      <section>
        <Container contentClassName='Menu'>
          <button className='menu-button'>
            <PlayIcon className='button-menu' />
          </button>
          <button className='menu-button'>
            <CirclePauseIcon className='button-menu' />
          </button>
          <button className='menu-button'>
            <SquareIcon className='button-menu' />
          </button>
        </Container>
      </section>

      <section>
        <Container>crontroller</Container>
      </section>

      <section>
        <Container>Footer</Container>
      </section>
    </>
  );
}
