import React from 'react';

const Editor = props => {
  return (
    <div >
      <input
        style={{
          "height": "200%",
          "width": "100%"
        }
        }
        value={props.code}
        onChange={e => props.updateCodeinState(e.target.value)}
      />
    </div>
  );
};
export default Editor;
