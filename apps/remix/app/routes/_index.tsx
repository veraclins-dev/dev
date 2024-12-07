import { EditorField } from '../components/editor-field';
import NxWelcome from '../nx-welcome';

export default function Index() {
  return (
    <div className="container flex flex-col p-6 items-center">
      {/* <NxWelcome title={'remix'} /> */}
      <EditorField />
    </div>
  );
}
