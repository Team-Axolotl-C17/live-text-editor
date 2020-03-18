import React from 'react';

const Editor = props => {
  return (
    <div>
      <input
        value={props.code}
        onChange={e => props.updateCodeinState(e.target.value)}
      />
    </div>
  );
};
export default Editor;
