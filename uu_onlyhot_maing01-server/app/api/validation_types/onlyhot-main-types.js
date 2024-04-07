/* eslint-disable */

const initDtoInType = shape({
  uuAppProfileAuthorities: uri().isRequired("uuBtLocationUri"),
  uuBtLocationUri: uri(),
  name: uu5String(512),
  sysState: oneOf(["active", "restricted", "readOnly"]),
  adviceNote: shape({
    message: uu5String().isRequired(),
    severity: oneOf(["debug", "info", "warning", "error", "fatal"]),
    estimatedEndTime: datetime(),
  }),
});

const testDtoInType = shape({
  code: string(20).isRequired()
});
const tempDtoInType = shape({
  sensorCode: number().isRequired(),
  data: array(
    shape({
      timestamp: number().isRequired(),
      temperature: string().isRequired(),
    })
  ).isRequired(),
});
