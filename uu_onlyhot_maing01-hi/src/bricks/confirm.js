import React from "react";
import { createVisualComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from '../config/config.js';

const Css = {
  main: () =>
    Config.Css.css({
      dialog: {
          background: '#23226e !important',
          'span': {
            color: '#white !important'
          }
          
      }
    })
};

const Confirm = createVisualComponent({

  uu5Tag: "Confirm",

  render(props) {
  
    return (<Uu5Elements.Dialog
                className={Css.main()}
                open={true}
                onClose={props.onClose} 
                header={props.header}
                info={props.info}
                actionDirection="horizontal"
                actionList={[
                  {
                    children: <span>CANCEL</span>,
                    onClick: props.onClose,
                  },
                  {
                    children: <span>{props.buttonTitle ? props.buttonTitle : "CONFIRM"}</span>,
                    onClick: props.onConfirm,
                    colorScheme: "negative",
                    significance: "highlighted",
                  },
                ]}
              />
    );
  }
});

export default Confirm;
