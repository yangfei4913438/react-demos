import MobxCtrl from 'src/components/mobxCtrl';
import MobxShow from 'src/components/mobxShow';
import Welcome from 'src/components/Welcome';

function App() {
  return (
    <div className="p-8 space-y-8">
      <Welcome />
      <div className="space-y-4">
        <MobxShow />
        <MobxCtrl />
      </div>
    </div>
  );
}

export default App;
