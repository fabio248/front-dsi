import React from 'react';
import { useParams } from 'react-router-dom';

export function Perfil() {

    let params = useParams();
    console.log('====================================');
    console.log(params);
    console.log('====================================');
    return (
        <div>
            <h1>Perfil</h1>
            <h2 style={{ color: 'red' }}>{params.userId}</h2>
        </div>
    );
}