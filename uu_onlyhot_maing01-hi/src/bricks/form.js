import React from "react";
import { createVisualComponent } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from '../config/config.js';

const Css = {
  button: () =>
    Config.Css.css({
      background: 'transparent !important',
      color: 'purple'
    })
};

const FormComponent = createVisualComponent({

  uu5Tag: "FormComponent",

  render(props) {

    const sumbitData = (event) => props.onSubmit(event.data.value);
   
    return (
      <Uu5Forms.Form.Provider onSubmit={sumbitData} onCancel={props.onCancel} initialValue={props.initialValue}>
          <Uu5Forms.Form.View>

            {props.children}

            <Uu5Elements.Grid
              templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
              columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
              justifyContent={{ s: "end" }}
            >
              <Uu5Forms.CancelButton className={Css.button()} onClick={props.onCancel} >CANCEL</Uu5Forms.CancelButton>
              <Uu5Forms.SubmitButton className={Css.button()}>SUBMIT</Uu5Forms.SubmitButton>

            </Uu5Elements.Grid>
          </Uu5Forms.Form.View>
      </Uu5Forms.Form.Provider>
    );
  }
});

export default FormComponent;
