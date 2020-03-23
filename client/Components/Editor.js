import React from 'react';
import Console from './Console';

// CodeMirror imports
import { Controlled as CodeMirror } from 'react-codemirror2';
import '../assets/codemirror-5.52.0/mode/javascript/javascript';
import '../assets/codemirror-5.52.0/lib/codemirror.css';
import '../assets/codemirror-5.52.0/theme/dracula.css';

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
      <button onClick={() => props.runCode(props.code)}>Run Code</button>
      <Console output={props.consoleOutput} />
    </div>
  );
};
export default Editor;
