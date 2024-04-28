
const withProvider = (Provider, children) => (
    <Provider>
      {children}
    </Provider>);
;

//@@viewOn:exports
export { withProvider };
export default withProvider;
//@@viewOff:exports
