import type { ReactNode } from 'react';
import { FlameKindling } from 'lucide-react';
import '../../App.css';
import { Heading } from '../../components/Heading';
import { Menu } from '../../components/Menu';
import { StreakBadge } from '../../components/StreakBadge';

type MainTemplateProps = {
  children: ReactNode;
  onOpenHistory?: () => void;
  onOpenSettings?: () => void;
};

export function MainTemplate({
  children,
  onOpenHistory,
  onOpenSettings,
}: MainTemplateProps) {
  return (
    <div className='app'>
      <header className='app-header'>
        <Heading>
          <span className='logo-mark' aria-hidden='true'>
            <FlameKindling className='logo-icon' />
          </span>
          VESTA
        </Heading>

        <StreakBadge />

        <Menu
          onOpenHistory={onOpenHistory}
          onOpenSettings={onOpenSettings}
        />
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
