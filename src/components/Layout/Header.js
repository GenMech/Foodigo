import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsIMG from '../../assets/meals2.jpg';
import classes from './Header.module.css';

const Header = (props) => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>Foodigo <p className={classes.title}>by GenMech</p></h1>
                {/* <p className={classes.title}>by GenMech</p> */}
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsIMG} alt="Food Table"/>
            </div>
        </Fragment>
          );
};

export default Header;