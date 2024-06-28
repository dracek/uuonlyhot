import { Utils, createVisualComponent, useSession, useContext } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import Form from "../form.js";
import Uu5Forms from "uu5g05-forms";
import { Box } from "@mui/material";

const Css = {
  main: () =>
    Config.Css.css({}),
};

let GatewayPasswordForm = createVisualComponent({
  uu5Tag: Config.TAG + "GatewayPasswordForm",

  render(props) {

    const initialValue = {};

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
          <Uu5Elements.Modal header={"Change password"} collapsible={false} open={true} onClose={props.onClose}>
            <Form onCancel={props.onClose} onSubmit={props.onSubmit} initialValue={initialValue} disableLeaveConfirmation={true}>
  
              <Box sx={{ display: "grid", rowGap: 3 }}>
                <Uu5Forms.FormText
                  type="password"
                  name="password"
                  label="New password"
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

export { GatewayPasswordForm };
export default GatewayPasswordForm;
