import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
    };

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
     <div className={classes.content}>{props.children}</div>
        {/* So actually {prop.children} is the actual content passed between the modal opening and closing tags by the component where the modal getting used */}
     </div>
}    

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    // as there are two element to return we will use Fragment

    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;