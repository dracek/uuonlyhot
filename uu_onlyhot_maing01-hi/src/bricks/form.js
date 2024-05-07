import React from "react";
import { createVisualComponent } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import { Box } from "@mui/material";

const FormComponent = createVisualComponent({
  // Component properties
  uu5Tag: "MyApp.FormComponent",

  render() {
    // Submit handler function
    const handleSubmit = (e) => {
      const { data } = e;
      alert(`Submitted data:\n${JSON.stringify(data.value, null, 2)}`);
    };


   
    return (
      <Uu5Forms.Form.Provider onSubmit={handleSubmit}>
          <Uu5Forms.Form.View>
          <h2>čokoľvek</h2>
            <Box sx={{ display: "grid", rowGap: 7 }}>
              <Uu5Forms.FormText
                name="textField"
                label="Text Field"
                placeholder="Type your text here"
                borderRadius = "expressive"
                required
              />

            <Uu5Forms.FormDate
                name="datePicker"
                label="Select Date"
                borderRadius = "expressive"
                required
              />
              
            </Box>

            <Uu5Elements.Grid
              templateColumns={{ xs: "repeat(2, 1fr)", s: "repeat(2, auto)" }}
              columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
              justifyContent={{ s: "end" }}
            >
             
              <Uu5Forms.SubmitButton style={{
                background: 'transparent',
                color: 'purple'
              }}>SUBMIT</Uu5Forms.SubmitButton>
            </Uu5Elements.Grid>
          </Uu5Forms.Form.View>
      </Uu5Forms.Form.Provider>
    );
  }
});

export default FormComponent;
