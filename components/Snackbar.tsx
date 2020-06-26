import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom';
//import '../scss/snackbar.scss'

const Snackbar = ({message, type}:{message: string, type?: string}): ReactElement => {
    var color: string;
    switch(type){
        case'normal':
            color = 'color-green';
            break;
        case'warning':
            color = 'color-yellow';
            break;
        case'error':
            color = 'color-red';
            break;
        default:
            color = 'color-green'
    }
    return(
        <div className={`${color} snackbar card`}>
            <div className="snackbar-inner">{message}</div>
        </div>
    )
}

export default (config: JSX.IntrinsicAttributes & { message: string; type?: string; delay?: number}) => {
    var container = document.createElement('div');
    container.id = "snackbar";
    document.body.appendChild(container);
    ReactDOM.render(<Snackbar {...config} />, container);
    setTimeout(()=>{
        container.classList.add('snackbar-hide')
        setTimeout(()=>container.remove(),500);
    }, config.delay || 3000)
}
