import React, { useEffect, useRef, useState } from "react";
import Controller from "../overlay-controller/applications/Controller";
import { isPropEmpty } from "../utils/CommonUtils";
import { SegmentParserClass } from "../parsing-handlers/segment-parse";
import { ContainerPerspectiveType } from "../typings/damage-controller.typing";
import { ControllerSettings } from "../overlay-controller/typings/platform-typings";

const styles = {
  sidebar: {
    minWidth: "70px",
    backgroundColor: "rgb(15, 23, 42)", // bg-slate-900
    borderRight: "1px solid rgb(30, 41, 59)", // border-slate-800
  },
  sidebarButton: {
    padding: "0.5rem",
    backgroundColor: "rgb(30, 41, 59)", // bg-slate-800
    borderRadius: "9999px",
    color: "white",
  },
  sidebarMenuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
    cursor: "pointer",
    paddingBottom: "2rem",
  },
  menuItemText: {
    fontSize: "clamp(14px, 0.8vw, 16px)",
    fontWeight: 500,
    marginTop: "0.5rem",
    color: "white",
    textTransform: "capitalize",
  },
  dropdownMenu: {
    position: "absolute",
    left: "100%",
    marginLeft: "1rem",
    backgroundColor: "rgb(31, 41, 55)",
    borderRadius: "0.5rem",
    padding: "1rem",
    minWidth: "200px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    zIndex: 10000,
  },
  containerMetadataContainer: {
    display: "grid",
    gap: "4px",
    width: "80%",
    padding: "12px",
    minHeight: "max-content",
    backgroundColor: "rgb(44, 46, 49)",
    color: "rgb(249, 249, 249)",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
  containerMetadataItem: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "5px",
  },
  containerMetadataLabel: {
    margin: 0,
    width: "50%",
    lineHeight: 1.2,
    fontSize: "14px",
    textTransform: "capitalize",
    opacity: 0.8,
  },
  containerMetadataValue: {
    margin: 0,
    width: "40%",
    lineHeight: 1.2,
    textTransform: "capitalize",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "start",
    flexDirection: "column",
    width: "max-content",
    gap: "1rem",
  },
  toggleLabel: {
    fontWeight: 500,
    color: '#ffffff',
    fontSize: "clamp(14px, 0.8vw, 16px)",
  },
};

interface ParsedSidebarItem {
  icon: string;
  activated_icon: string;
  name: string;
  isActivated: boolean;
  sideID: number;
  perpectives: Array<string>;
}

const ViewDamage = ({
  sideInfo,
  damageConfig,
  sidePerspectives,
  setSideInfo,
  setDamageConfig,
  setSidePerspectives,
}) => {
  const [sideToggleModel, setSideToggleModel] = useState(false);
  const [heatMapToggleModel, setHeatMapToggleModel] = useState(false);
  const [filteredSidebarMenu, setFilteredSidebarMenu] = useState<
    ParsedSidebarItem[]
  >([]);
  const activeMenu = useRef<number>();

  const [isNoMinorDamagePresent, setNoMinorDamagePresent] = useState(false);
  const [getIsHeatMapImagePathEmpty, setHeapMapImagePathEmpty] = useState(true);
  const [controlSetting, setControlSetting] = useState<ControllerSettings>();

  const containerMetaData = [
    {
      label: "Container No",
      value: "TILLU1251324",
    },
    {
      label: "Major Damages",
      value: "0",
    },
    {
      label: "Total Damages",
      value: "7",
    },
    {
      label: "Minor Damages",
      value: "7",
    },
  ];

  function handleMainPersClk(
    _menu: ParsedSidebarItem,
    filtered = filteredSidebarMenu
  ) {
    const getFilteredSidebarMenu = filteredSidebarMenu?.length
      ? filteredSidebarMenu
      : filtered;

    if (!isPropEmpty(filtered)) {
      activeMenu.current = null;
    } else {
      activeMenu.current =
        _menu?.sideID === activeMenu.current ? null : _menu?.sideID;
    }

    const modifiedSidebarMenu = getFilteredSidebarMenu?.map((itm) => {
      if (itm?.sideID === _menu?.sideID) {
        itm.isActivated = true;
        if (itm.perpectives?.length <= 1 || !isPropEmpty(filtered)) {
          handlePersClk(_menu, itm?.perpectives?.[0]);
        }
      } else {
        itm.isActivated = false;
      }
      return itm;
    });

    setFilteredSidebarMenu([...modifiedSidebarMenu]);
  }

  function handlePersClk(menu: ParsedSidebarItem, pers: string) {
    setSideInfo({ side_id: menu?.sideID, side: pers });
    console.log(menu, pers);
  }

  function handleContainerSidePerpectives(sides: ContainerPerspectiveType[]) {
    // console.log('heres----------',require("@/assets/container.jpg"));
    const containerSideMenu: ParsedSidebarItem[] = [
      {
        icon: require("@/assets/damage-contoller/left.svg")?.uri,
        activated_icon: require("@/assets/damage-contoller/Gleft.svg")?.uri,
        name: "left",
        isActivated: false,
        sideID: 4,
        perpectives: [],
      },
      {
        icon: require("@/assets/damage-contoller/right.svg")?.uri,
        activated_icon: require("@/assets/damage-contoller/Gright.svg")?.uri,
        name: "right",
        isActivated: false,
        sideID: 3,
        perpectives: [],
      },
      {
        icon: require("@/assets/damage-contoller/top.svg")?.uri,
        activated_icon: require("@/assets/damage-contoller/Gtop.svg")?.uri,
        name: "top",
        isActivated: false,
        sideID: 5,
        perpectives: [],
      },
      {
        icon: require("@/assets/damage-contoller/back.svg")?.uri,
        activated_icon: require("@/assets/damage-contoller/Gback.svg")?.uri,
        name: "back",
        isActivated: false,
        sideID: 2,
        perpectives: [],
      },
      {
        icon: require("@/assets/damage-contoller/Front_Side.svg")?.uri,
        activated_icon: require("@/assets/damage-contoller/GFront_Side.svg")
          ?.uri,
        name: "front",
        isActivated: false,
        sideID: 1,
        perpectives: [],
      },
    ];

    const map = new Map<number, string[]>();
    const sidesAvailable = [];
    sides?.forEach((side) => {
      sidesAvailable.push(side?.side_id);
      map.set(side?.side_id, side?.perspectives);
    });

    const modifiedSides = containerSideMenu
      ?.filter((side) => sidesAvailable?.includes(side?.sideID))
      ?.map((side) => {
        side.perpectives = map.get(side?.sideID);
        return side;
      });

    setFilteredSidebarMenu(modifiedSides);
  }

  useEffect(() => {
    setDamageConfig();
    setSidePerspectives();

    const timeout = setTimeout(() => {
      setFilteredSidebarMenu((val) => {
        activeMenu.current = null;
        handleMainPersClk(val?.[0], val);
        return val;
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!isPropEmpty(sideInfo) && !isPropEmpty(damageConfig)) {
      const data = new SegmentParserClass().generateSegments(
        sideInfo as any,
        damageConfig
      );
      setControlSetting(data);
    }
  }, [sideInfo, damageConfig]);

  useEffect(() => {
    if (!isPropEmpty(sidePerspectives))
      handleContainerSidePerpectives(sidePerspectives?.sides);
  }, [sidePerspectives]);

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", display: "flex", height: "100%" }}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div
            style={{
              display: "flex",
              overflow: "auto",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "2rem",
              }}
            >
              <button style={styles.sidebarButton}>
                <svg
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            </div>

            <div
              style={{
                justifyContent: "around",
                alignItems: "center",
                display: "grid",
                contentVisibility: "start",
                marginTop: "3rem",
              }}
            >
              {filteredSidebarMenu?.map((menu, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.sidebarMenuItem,
                    cursor: "pointer",
                    paddingBottom: "2rem",
                  }}
                  onClick={() => handleMainPersClk(menu)}
                >
                  <img
                    src={menu?.isActivated ? menu?.activated_icon : menu?.icon}
                    alt="Menu item"
                    style={{ width: "40px", height: "20px", cursor: "pointer" }}
                  />
                  <span style={styles.menuItemText}>{menu?.name}</span>

                  {activeMenu.current === menu?.sideID && (
                    <div style={styles.dropdownMenu}>
                      <div style={{ color: "white" }}>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                          }}
                        >
                          {menu?.perpectives?.map((pers) => (
                            <li
                              key={pers}
                              onClick={() => handlePersClk(menu, pers)}
                              style={{
                                padding: "0.5rem",
                                borderRadius: "0.25rem",
                                ":hover": {
                                  backgroundColor: "rgb(55, 65, 81)",
                                },
                              }}
                            >
                              {pers}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              padding: "1rem 1rem 0",
              height: "100%",
              overflowY: "auto",
              gap: "0.75rem",
            }}
          >
            {/* Top Controls */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                justifyContent: "start",
              }}
            >
              <div></div>
              <div style={styles.containerMetadataContainer}>
                {containerMetaData.map((container, index) => (
                  <div key={index} style={styles.containerMetadataItem}>
                    <p style={styles.containerMetadataLabel}>
                      {container?.label}
                    </p>
                    <p style={{ margin: 0, width: "10%" }}>:</p>
                    <p style={styles.containerMetadataValue}>
                      {container?.value}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                {/* Minor Damages Toggle */}
                <div style={styles.toggleContainer}>
                  <p style={styles.toggleLabel}>Minor Damages</p>
                  <label
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ position: "absolute", opacity: 0 }}
                      checked={sideToggleModel && !isNoMinorDamagePresent}
                      onChange={(e) => setSideToggleModel(e.target.checked)}
                      disabled={isNoMinorDamagePresent}
                    />
                    <div
                      style={{
                        width: "2.75rem",
                        height: "1.5rem",
                        backgroundColor: sideToggleModel
                          ? "#2563eb"
                          : "#D1D5DB",
                        borderRadius: "9999px",
                        position: "relative",
                        transition: "all 0.3s",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: sideToggleModel ? "calc(100% - 26px)" : "2px",
                          width: "21px",
                          height: "21px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          transition: "all 0.3s",
                        }}
                      />
                    </div>
                  </label>
                </div>

                {/* HeatMap Toggle */}
                <div
                  style={{
                    ...styles.toggleContainer,
                    pointerEvents: !getIsHeatMapImagePathEmpty
                      ? "none"
                      : "auto",
                  }}
                >
                  <p style={styles.toggleLabel}>HeatMap</p>
                  <label
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ position: "absolute", opacity: 0 }}
                      checked={heatMapToggleModel && getIsHeatMapImagePathEmpty}
                      onChange={(e) => setHeatMapToggleModel(e.target.checked)}
                      disabled={!getIsHeatMapImagePathEmpty}
                    />
                    <div
                      style={{
                        width: "2.75rem",
                        height: "1.5rem",
                        backgroundColor: heatMapToggleModel
                          ? "#2563eb"
                          : "#D1D5DB",
                        borderRadius: "9999px",
                        position: "relative",
                        transition: "all 0.3s",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "2px",
                          left: heatMapToggleModel
                            ? "calc(100% - 26px)"
                            : "2px",
                          width: "21px",
                          height: "21px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          transition: "all 0.3s",
                        }}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Container Viewer */}
            {controlSetting ? (
              <div
                style={{
                  display: "grid",
                  gap: "1.25rem",
                  height: "100%",
                  width: "100%",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    width: "100%",
                    maxHeight: "100%",
                    padding: "1rem",
                    justifyContent: "center",
                    gridTemplateColumns: "1fr",
                    margin: "0 auto",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0.75rem",
                  }}
                >
                  {!isPropEmpty(controlSetting) && (
                    <Controller
                      controllerSettings={controlSetting}
                      canPan={false}
                      canZoom={false}
                      heatMapShown={true}
                      isHoverAllowed={false}
                      objectTitleVisibilityCodes={{
                        text: "Minor",
                        visibilityCodes: [2, 3, 1],
                      }}
                      hoverTextVisibilityCode={[9, 11, 12]}
                      currentBackgroundPath={null}
                    />
                  )}
                </div>

                <div
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    overflowX: "auto",
                  }}
                >
                  {["Information", "Major Damage", "Minor Damage"].map(
                    (section, index) => (
                      <div key={index} style={{ width: "33.33%" }}>
                        <div
                          style={{
                            overflow: "auto",
                            borderRadius: "0.375rem",
                            padding: "1rem",
                            height: "9dvh",
                            backgroundColor:
                              index === 0
                                ? "rgb(209, 213, 219)"
                                : index === 1
                                  ? "rgb(254, 202, 202)"
                                  : "rgb(254, 240, 138)",
                          }}
                        >
                          {section}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    animation: "spin 1s linear infinite",
                    borderRadius: "50%",
                    height: "2rem",
                    width: "2rem",
                    borderBottom: "2px solid rgb(17, 24, 39)",
                  }}
                ></div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewDamage;
