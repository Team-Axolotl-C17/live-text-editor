import React from 'react';
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
      {/* <input
        style={{
          "height": "200%",
          "width": "100%"
        }
        }
        value={props.code}
        onChange={e => props.updateCodeinState(e.target.value)}
      /> */}
    </div>
  );
};
export default Editor;
