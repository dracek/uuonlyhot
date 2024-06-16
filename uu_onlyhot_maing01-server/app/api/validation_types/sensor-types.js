/* eslint-disable */

const sensorCreateDtoInType = shape({
    gatewayId: string().isRequired(),
    code: string().isRequired()
});

const sensorGetDtoInType = shape({
    id: string().isRequired(),
});

const sensorUpdateDtoInType = shape({
    id: string().isRequired(),
    gatewayId: string().isRequired(),
    code: string().isRequired(),
    name: string().isRequired(),
});

const sensorDeleteDtoInType = shape({
    id: string().isRequired(),
});

const sensorListDtoInType = shape({
    gatewayId: string()
});

const sensorImportDataDtoInType = shape({
    gatewayId: string().isRequired(),
    password: string().isRequired(),
    code: string().isRequired(),
    data: array(
        shape({
            timestamp: number().isRequired(),
            temperature: number().isRequired(),
        })
    ).isRequired(),
});
