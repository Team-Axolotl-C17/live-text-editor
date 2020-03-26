import React from 'react';
import GetCode from './GetCode';
import PostCode from './PostCode';
import UpdateCode from './UpdateCode';
import DeleteCode from './DeleteCode';

// CodeMirror imports
import { Controlled as CodeMirror } from 'react-codemirror2';
import '../assets/codemirror-5.52.0/mode/javascript/javascript';
import '../assets/codemirror-5.52.0/lib/codemirror.css';
import '../assets/codemirror-5.52.0/theme/dracula.css';
import Console from './Console';

const Editor = props => {
  const options = {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true
  };

  return (
    <div>
      <CodeMirror
        className="codemirror"
        value={props.code}
        options={options}
        onBeforeChange={(editor, data, value) => {
          props.updateCodeinState(value);
        }}
      />
      <div className="buttons">
      <button onClick={() => props.runCode(props.code)}>Run Code</button>
      <GetCode />
      <PostCode />
      <UpdateCode />
      <DeleteCode />
      </div>
      <Console output={props.consoleOutput} />
    </div>
  );
};
export default Editor;
