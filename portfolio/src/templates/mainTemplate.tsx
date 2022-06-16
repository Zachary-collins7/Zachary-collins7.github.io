import * as React from 'react';
import NavBar from '../components/navbar';
import './mainTemplate.scss';

export interface IMainTemplateProps {
  children?: React.ReactNode
}

export default function MainTemplate({ children }: IMainTemplateProps) {
  return (
    <div className='template'>
      <NavBar animate />
      { children }
    </div>
  );
}
