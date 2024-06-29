// Home.js

import { Utils, createVisualComponent, BackgroundProvider, useSession, useContext, useEffect, useState } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Button from '@mui/material/Button';
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import GatewayContext from "../bricks/gateway/gateway-context.js";
import SensorContext from "../bricks/sensor/sensor-context.js";
import GatewayRow from "../bricks/gateway/gateway-row.js";
import GatewayEditForm from "../bricks/gateway/gateway-edit-form.js";
import GatewayPswdForm from "../bricks/gateway/gateway-password-form.js";
import Confirm from "../bricks/confirm.js";

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const Css = {
  main: () =>
    Config.Css.css({
      background: "#23226e",
      minHeight: "100vh",
      padding: "16px",
      "@media (min-width: 600px)": {
        padding: "10px",
      },
    }),
    box: () =>
      Config.Css.css({
        display: "flex",
        padding:'10px',
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "90%",
        color: "f34fc7",
        "& > *": { width: "90%" },
        "& h1": {
          marginBottom: "45px",
          fontSize: "30px",
          "@media (min-width: 600px)": {
            fontSize: "50px",
            padding:'0'
          },
        },
      }),
  header: () =>
    Config.Css.css({
      fontSize: '30px',
      color: 'transparent',
      backgroundImage: 'linear-gradient(90deg, #00FFE5, #F7FF00)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      "@media (min-width: 600px)": {
        fontSize: '50px',
      },
    }),
  
};

let Home = createVisualComponent({
  uu5Tag: Config.TAG + "Home",

  render(props) {
    const { identity } = useSession();
    const gatewayContext = useContext(GatewayContext);
    const sensorContext = useContext(SensorContext);

    const [createGateway, setCreateGateway] = useState(false); 
    const [editGateway, setEditGateway] = useState(false);
    const [pswdGateway, setPswdGateway] = useState(false);
    const [deleteGateway, setDeleteGateway] = useState(false);

    useEffect(() => {
      gatewayContext.callsMap.gatewayList();
      sensorContext.callsMap.sensorList();
    }, []);


    const handleCreateFormOpen = () => {
      setCreateGateway(true);
    };

    const handleCreateFormClose = () => {
      setCreateGateway(false);
    };
    
    const handleCreateFormSubmit = async (data) => {
      await gatewayContext.callsMap.gatewayCreate({name: data.name});
      setCreateGateway(false);
      gatewayContext.callsMap.gatewayList();
    };


    const handleEditFormOpen = (gateway) => {
      setEditGateway(Object.assign({}, gateway));
    };

    const handleEditFormClose = () => {
      setEditGateway(false);
    };
    
    const handleEditFormSubmit = async (data) => {
      await gatewayContext.callsMap.gatewayUpdate({id: editGateway.id, name: data.name});
      setEditGateway(false);
      gatewayContext.callsMap.gatewayList();
    };


    const handlePswdFormOpen = (gateway) => {
      setPswdGateway(Object.assign({}, gateway));
    };

    const handlePswdFormClose = () => {
      setPswdGateway(false);
    };
    
    const handlePswdFormSubmit = async (data) => {
      await gatewayContext.callsMap.gatewayUpdate({id: pswdGateway.id, password: data.password});
      setPswdGateway(false);
      gatewayContext.callsMap.gatewayList();
    };


    const handleDeleteFormOpen = (gateway) => {
      setDeleteGateway(Object.assign({}, gateway));
    };

    const handleDeleteFormClose = () => {
      setDeleteGateway(false);
    };

    const handleDeleteFormConfirm = async () => {
      await gatewayContext.callsMap.gatewayDelete({id: deleteGateway.id});
      setDeleteGateway(false);
      gatewayContext.callsMap.gatewayList();
    };


    const renderGateways = (data, sensorData) => {
      if (!data.itemList || data.itemList.length === 0) {
        return <div>No data...</div>;
      }
      return (
        <div >
          {data.itemList.map((gateway) => {
            const sensors = sensorData.itemList ? sensorData.itemList.filter((sen) => sen.gatewayId === gateway.id) : [];
            return <GatewayRow key={gateway.id} gateway={gateway} sensors={sensors} onEdit={handleEditFormOpen} onPswd={handlePswdFormOpen} onDelete={handleDeleteFormOpen} style={{alignItems:'start'}}/>;
          })}
        </div>
      );
    };

    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (
      <div {...attrs}>
        <BackgroundProvider background="dark">
          
          <RouteBar />

          <div className={Css.box()}>
            <h1 className={Css.header()}>Gateways</h1>
            <Button 
              onClick={handleCreateFormOpen}
              startIcon={<AddCircleOutlineRoundedIcon />}  
              sx={{
                width: "230px",
                margin: 'auto',
                backgroundColor: '#e50099', 
                color: 'white', 
                '&:hover': {backgroundColor: '#ff42b4a0'},
                '&:active': {backgroundColor: '#e50099c6'}, 
              }}>Add new gateway</Button>
            {renderGateways(gatewayContext.listData, sensorContext.listData)}
          </div>
          
          {createGateway && <GatewayEditForm onSubmit={handleCreateFormSubmit} onClose={handleCreateFormClose} />}
          {editGateway && <GatewayEditForm onSubmit={handleEditFormSubmit} onClose={handleEditFormClose} gateway={editGateway} />}
          {pswdGateway && <GatewayPswdForm onSubmit={handlePswdFormSubmit} onClose={handlePswdFormClose} gateway={pswdGateway} />}
          {deleteGateway && <Confirm header={`Delete ${deleteGateway.name}?`} info="All data will be erased." onClose={handleDeleteFormClose} onConfirm={handleDeleteFormConfirm} buttonTitle="DELETE"></Confirm>}

          {/**<Uu5Elements.Modal header="Create new gateway" collapsible={false} open={isFormVisible} onClose={handleFormClose}>
            <Form onCancel={handleFormClose} onSubmit={handleFormSubmit} >
  
              <Box sx={{ display: "grid", rowGap: 3 }}>
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
            </Form>

          </Uu5Elements.Modal>*/}

        </BackgroundProvider>
      </div>
    );
  }
});

Home = withRoute(Home, { authenticated: true });

export { Home };
export default Home;
