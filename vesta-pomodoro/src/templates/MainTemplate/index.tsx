import type { ReactNode } from 'react';
import { FlameKindling } from 'lucide-react';
import '../../App.css';
import { Heading } from '../../components/Heading';
import { Menu } from '../../components/Menu';

type MainTemplateProps = {
  children: ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
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

      <main className='app-main'>{children}</main>

      <footer className='app-footer'>
        <div className='footer-content'>
          <span className='footer-divider' aria-hidden='true' />
          <span className='footer-copy'>One spark at a time.</span>
        </div>
      </footer>
    </div>
  );
}
