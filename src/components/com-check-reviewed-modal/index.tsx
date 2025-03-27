import React from 'react';

import Modal from './Modal';


interface PersonRegisterProps {
  unitId?: any
  history?: any
  result?: any
}

const PersonRegister = (props: PersonRegisterProps) => {
  const { unitId, history, result } = props || {};

  return <Modal result={result} unitId={unitId} history={history} />
};

export default PersonRegister;
