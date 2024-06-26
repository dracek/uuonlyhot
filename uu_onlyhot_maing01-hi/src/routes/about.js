//@@viewOn:imports
import {
  Utils,
  BackgroundProvider,
  createVisualComponent,
  Environment,
  Lsi,
  DynamicLibraryComponent,
  useSession,
  useDynamicLibraryComponent,
} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import AboutCfg from "../config/about.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const COLORS = {
  polarWhite: "#f0f8ff",
  slateGray: "#708090",
};
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      background: "#23226e", 
      minHeight: "100vh",
      color: COLORS.polarWhite,
    }),
  content: () =>
    Config.Css.css({
      margin: "0 auto",
      maxWidth: "920px",
      color: COLORS.polarWhite,
      "& h1, h2, h3, h4, h5, h6, p, a, div": {
        color: `${COLORS.polarWhite} !important`,
      },
      "& .plus4u5-app-about > .uu5-bricks-header, .plus4u5-app-licence > .uu5-bricks-header, .plus4u5-app-authors > .uu5-bricks-header, .plus4u5-app-technologies > .uu5-bricks-header": {
        borderBottom: "0",
      },
      "& .plus4u5-app-authors > .uu5-bricks-header": {
        margin: "20px 0 10px 0",
        textAlign: "center",
      },
      "& > *:last-child": {
        paddingBottom: "56px",
      },
    }),
  text: () => Config.Css.css`
    color: ${COLORS.polarWhite} !important; 
  `,
  heading: () => Config.Css.css`
    color: ${COLORS.polarWhite} !important; 
  `,
  technologies: () => Config.Css.css({ maxWidth: 480 }),
  logos: () => Config.Css.css({ textAlign: "center", marginTop: 56 }),
  common: () =>
    Config.Css.css`
      max-width: 480px;
      margin: 12px auto 56px;
      color: ${COLORS.slateGray}; // Slate gray text

      & > * {
        border-top: 1px solid rgba(255, 255, 255, 0.12); 
        padding: 9px 0 12px;
        text-align: center;
        color: ${COLORS.slateGray}; // Slate gray text
        &:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.12); 
        }
      }
    `,
  technologiesLicenseRow: () =>
    Config.Css.css`
      display: grid;
      grid-template-columns: minmax(0, 12fr);
      margin-top: 40px;
      padding: 0 8px;
      gap: 0 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.12); 
      color: ${COLORS.slateGray};
      ${Utils.Style.getMinMediaQueries("l", {
        gridTemplateColumns: "minmax(0, 8fr) minmax(0, 4fr)",
      })}
    `,
  license: () => Config.Css.css({ width: "auto" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let About = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "About",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { awid } = useSubApp();
    const { state: sessionState } = useSession();
    const { data: systemData } = useSystemData();
    const {
      uuAppUuFlsBaseUri,
      uuAppUuSlsBaseUri,
      uuAppBusinessModelUri,
      uuAppApplicationModelUri,
      uuAppBusinessRequestsUri,
      uuAppUserGuideUri,
      uuAppWebKitUri,
      uuAppProductPortalUri,
    } = systemData?.relatedObjectsMap || {};
    const products = [];
    if (uuAppBusinessModelUri) products.push({ baseUri: uuAppBusinessModelUri });
    if (uuAppApplicationModelUri) products.push({ baseUri: uuAppApplicationModelUri });
    if (uuAppBusinessRequestsUri) products.push({ baseUri: uuAppBusinessRequestsUri });
    if (uuAppUserGuideUri) products.push({ baseUri: uuAppUserGuideUri });
    if (uuAppWebKitUri) products.push({ baseUri: uuAppWebKitUri });

    const { leadingAuthors, otherAuthors, license, about, usedTechnologies } = AboutCfg;

    const { state } = useDynamicLibraryComponent("Plus4U5.App.About");
    const legacyComponentsReady = !state.startsWith("pending");
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return legacyComponentsReady ? (
      <div {...attrs} className={Css.main()}>
        <BackgroundProvider background="dark">
          <RouteBar />
          <div className={Css.content()}>
            <DynamicLibraryComponent
              uu5Tag="Plus4U5.App.About"
              header={<Lsi import={importLsi} path={["About", "header"]} />}
              content={about}
              className={Css.text()} // Apply text color to the dynamic component
            />
            {sessionState === "authenticated" ? (
              <DynamicLibraryComponent
                uu5Tag="Plus4U5.App.Support"
                uuFlsUri={uuAppUuFlsBaseUri}
                uuSlsUri={uuAppUuSlsBaseUri}
                productCode="support/uuOnlyhot"
                productPortalUri={uuAppProductPortalUri}
                className={Css.text()} // Apply text color to the dynamic component
              />
            ) : null}
            {products.length > 0 ? (
              <DynamicLibraryComponent
                uu5Tag="UuProductCatalogue.Bricks.ProductList"
                type="16x9"
                products={products}
                className={Css.text()} // Apply text color to the dynamic component
              />
            ) : null}
            <div className={Css.common()}>
              <div className={Css.text()}>{`uuOnlyhot ${Environment.appVersion}`}</div>
              {license.termsOfUse && (
                <div>
                  <Uu5Elements.Link href={license.termsOfUse} target="_blank" className={Css.text()}>
                    <Lsi import={importLsi} path={["About", "termsOfUse"]} />
                  </Uu5Elements.Link>
                </div>
              )}
            </div>
            <DynamicLibraryComponent
              uu5Tag="Plus4U5.App.Authors"
              header={<Lsi import={importLsi} path={["About", "creatorsHeader"]} />}
              leadingAuthors={leadingAuthors}
              otherAuthors={otherAuthors}
              className={Css.text()} // Apply text color to the dynamic component
            />
            <div className={Css.technologiesLicenseRow()}>
              <div>
                <DynamicLibraryComponent
                  uu5Tag="Plus4U5.App.Technologies"
                  technologies={usedTechnologies.technologies}
                  content={usedTechnologies.content}
                  textAlign="left"
                  className={Css.text()} // Apply text color to the dynamic component
                />
              </div>
              <div>
                <DynamicLibraryComponent
                  uu5Tag="Plus4U5.App.Licence"
                  organisation={license.organisation}
                  authorities={license.authorities}
                  awid={<Uu5Elements.Link href={Environment.appBaseUri} className={Css.text()}>{awid}</Uu5Elements.Link>}
                  textAlign="left"
                  className={Css.text()} // Apply text color to the dynamic component
                />
              </div>
            </div>
            <div className={Css.logos()}>
              <img height={80} src="assets/plus4u.svg" />
              <img height={80} src="assets/unicorn.svg" />
            </div>
          </div>
        </BackgroundProvider>
      </div>) : (
      <Plus4U5App.SpaPending />
    );
  },
  //@@viewOff:render
});

About = withRoute(About);

//@@viewOn:exports
export { About };
export default About;
//@@viewOff:exports
