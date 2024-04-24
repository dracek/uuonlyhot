/* eslint-disable */

const gatewayCreateDtoInType = shape({
    name: string().isRequired()
});

const gatewayGetDtoInType = shape({
    id: string().isRequired(),
});

const gatewayListDtoInType = shape({
});

const gatewayDeleteDtoInType = shape({
    id: string().isRequired(),
});

const gatewayUpdateDtoInType = shape({
    id: string().isRequired(),
    name: string(),
    password: string()
});
