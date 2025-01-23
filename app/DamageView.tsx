import React, { useState } from "react";
import useDamage from "./useDamage";
import { DamageModuleEnum } from "./damage/typings/damage-controller.typing";
import ViewDamage from "./damage/views/ViewDamage";
// import {ViewDamage, DamageModuleEnum } from "atai-react-web";

const DamageView = () => {
  const [sideInfo, setSideInfo] = useState();
  const [containerData, setContainerData] = useState({
    entity_id: "dsf",
    transaction_id: "sdf",
    container_number: "sdf",
  });
  const [damageConfig, setDamageConfig] = useState();
  const [perspectives, setPerspectives] = useState();
  const [damageViewType, setDamageViewType] = React.useState<DamageModuleEnum>(
    DamageModuleEnum.VIEW
  );

  const {
    fetchDamageConfig,
    fetchContainerSideInfo,
    fetchDamageSidePerceptionInfo,
    fetchSideSegmentInfo,
    addContainerDamage,
    deleteContainerDamage,
    updateContainerDamage,
  } = useDamage();

  async function getDamageConfig() {
    const res = await fetchDamageConfig();
    setDamageConfig(res);
  }

  async function getSideInfo(data) {
    const res = await fetchContainerSideInfo(data);
    setSideInfo(res);
  }

  async function getPerspectives(data) {
    const res = await fetchDamageSidePerceptionInfo(data);
    setPerspectives(res);
  }

  function setDamageModule(module: DamageModuleEnum) {
    setDamageViewType(module);
  }

  React.useEffect(() => {
    setDamageModule(DamageModuleEnum.VIEW);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {damageViewType === DamageModuleEnum.VIEW && (
        <div>
          <ViewDamage
            sideInfo={sideInfo}
            damageConfig={damageConfig}
            sidePerspectives={perspectives}
            setSideInfo={getSideInfo}
            setDamageConfig={getDamageConfig}
            setSidePerspectives={getPerspectives}
          />
        </div>
      )}

      {damageViewType === DamageModuleEnum.ADD_DAMAGES && <div></div>}

      {damageViewType === DamageModuleEnum.ADD_HEATMAP && <div></div>}
    </div>
  );
};

export default DamageView;
