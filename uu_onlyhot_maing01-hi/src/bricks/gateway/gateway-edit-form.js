import { Utils, createVisualComponent, useSession, useContext } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import GatewayContext from "./gateway-context.js";
import Form from "../form.js";
import Uu5Forms from "uu5g05-forms";
import { Box } from "@mui/material";

const Css = {
  main: () =>
    Config.Css.css({}),
};

let GatewayEditForm = createVisualComponent({
  uu5Tag: Config.TAG + "GatewayEditForm",

  render(props) {

    const editMode = props.gateway != null;

    const initialValue = editMode ? {"name": props.gateway.name} : {};

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
          <Uu5Elements.Modal header={editMode ? "Edit gateway" : "Create new gateway"} collapsible={false} open={true} onClose={props.onClose}>
            <Form onCancel={props.onClose} onSubmit={props.onSubmit} initialValue={initialValue} disableLeaveConfirmation={true}>
  
              <Box sx={{ display: "grid", rowGap: 3 }}>
                <Uu5Forms.FormText
                  name="name"
                  label="Gateway name"
                  placeholder="Type gateway name..."
                  borderRadius = "expressive"
                  required
                />
              </Box>

            </Form>

          </Uu5Elements.Modal>
      </div>
    );
  }
});

export { GatewayEditForm };
export default GatewayEditForm;
