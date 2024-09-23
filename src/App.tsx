import '@/styles/base.scss';
import PublicRoutes from './routes/PublicRoutes';
import configLocalization from './configs/Localization';

function App() {
  configLocalization();
  return <PublicRoutes />;
}

export default App;
