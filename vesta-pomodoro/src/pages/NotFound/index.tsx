import { Container } from '../../components/Container';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <h1>Page not found</h1>
      </Container>
    </MainTemplate>
  );
}
