import React from 'react';
import { Button, Icon, Badge, Link } from "uu5g05-elements";
import Config from "../config/config.js";



const Css = {
  row: () => 
    Config.Css.css({
      paddingLeft: "25px"
    }),
  text: () => 
    Config.Css.css({
      paddingLeft: "10px",
      paddingBottom: "10px"
    }),
};

const GatewayRow = (props) => {

    const {gateway, sensors} = props;


    return (
      <div className={Css.row()}>
        <h2>{gateway.name}</h2>
        {sensors.map(sensor => (<div className={Css.text()}>
          {sensor.name || sensor.code} ({sensor.id}) <Link href={"sensor?id=" + sensor.id}>link</Link> 
        </div>))}
      </div>
    );
};

  
  export default GatewayRow;