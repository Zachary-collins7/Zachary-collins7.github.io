import * as React from 'react';
import NavBar from '../components/navbar';
import './sharedTemplate.scss';

export interface IStaticNavTemplateProps {
    children?: React.ReactNode
}

export default function StaticNavTemplate({ children }: IStaticNavTemplateProps) {
    return (
        <div className='template'>
            <NavBar />
            {children}
        </div>
    );
}
