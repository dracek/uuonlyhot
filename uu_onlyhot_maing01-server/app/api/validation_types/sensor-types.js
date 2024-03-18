/* eslint-disable */

const sensorCreateDtoInType = shape({
    sensorCode: string().isRequired(),
    enabled: boolean().isRequired(),
    public: boolean().isRequired()
});

const sensorGetDtoInType = shape({
    id: string().isRequired(),
});

const sensorUpdateDtoInType = shape({
    id: string().isRequired(),
    sensorCode: string().isRequired(),
    enabled: boolean().isRequired(),
    public: boolean().isRequired()
});

const sensorDeleteDtoInType = shape({
    id: string().isRequired(),
});

const sensorListDtoInType = shape({

});
