/* eslint-disable */

const sensorCreateDtoInType = shape({
    gatewayId: string().isRequired(),
    code: string().isRequired(),
    name: string().isRequired(),
});

const sensorGetDtoInType = shape({
    id: string().isRequired(),
});

const sensorUpdateDtoInType = shape({
    id: string().isRequired(),
    code: string().isRequired(),
    name: string().isRequired(),
});

const sensorDeleteDtoInType = shape({
    id: string().isRequired(),
});

const sensorListDtoInType = shape({
    gatewayId: string()
});
