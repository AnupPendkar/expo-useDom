import AxiosHttpClient from "@/utils/AxiosHttpClient";
import { ApiRoutesEnum } from "@/utils/apiRoutes";
import {
  ContainerSideInfo,
  ContainerSideSegmentInfo,
} from "./damage/typings/damage-controller.typing";
// import {
//   ViewDamage,
//   DamageModuleEnum,
//   ContainerSideInfo,
//   ContainerSideSegmentInfo,
// } from "atai-react-web";
import { isPropEmpty } from "./utils/CommonUtils";

const useDamage = () => {
  const damageConfig = {
    entity_id: "omTX1hNdN",
    transaction_id: "1737623588",
    container_number: "IXYU4579160",
    container_position: `{"x": 1, "y": 1, "z": 1}`,
  };

  const dynamicUrl = "http://172.16.120.24:7005";

  function fetchDamageConfig(): Promise<any> {
    return new Promise((resolve) => {
      // resolve([
      //   {
      //     damage_name: "MINOR_WARP",
      //     damage_id: 0,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 0,
      //     color_code: "#FFDB58",
      //   },
      //   {
      //     damage_name: "WARP",
      //     damage_id: 1,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 1,
      //     color_code: "#90EE90",
      //   },
      //   {
      //     damage_name: "MINOR_SCRATCH",
      //     damage_id: 2,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 0,
      //     color_code: "#151515",
      //   },
      //   {
      //     damage_name: "MINOR_RUST",
      //     damage_id: 3,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 0,
      //     color_code: "#FF7F7F",
      //   },
      //   {
      //     damage_name: "RUST",
      //     damage_id: 4,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 1,
      //     color_code: "#8B0000",
      //   },
      //   {
      //     damage_name: "CUT_HOLE",
      //     damage_id: 5,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 1,
      //     color_code: "#483248",
      //   },
      //   {
      //     damage_name: "WELD",
      //     damage_id: 6,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 1,
      //     color_code: "#40E0D0",
      //   },
      //   {
      //     damage_name: "PILLAR_DAMAGE",
      //     damage_id: 10,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 1,
      //     color_code: "#FF7D29",
      //   },
      //   {
      //     damage_name: "PATCH",
      //     damage_id: 11,
      //     is_configured: true,
      //     is_notified: false,
      //     type_of_damage: 0,
      //     color_code: "#373A40",
      //   },
      // ]);
      // return;
      AxiosHttpClient.request()
        .get(ApiRoutesEnum.damageConfig)
        .then((res) => {
          if ([200, 201, 204].includes(res?.status)) {
            resolve(res?.data?.damage);
          }
        });
    });
  }

  function fetchDamageSidePerceptionInfo(data?: any): any {
    const params = {
      entity_id: damageConfig?.entity_id,
      transaction_id: damageConfig?.transaction_id,
      container_number: damageConfig?.container_number,
      container_position: damageConfig?.container_position,
    };

    return new Promise((resolve) => {
      // resolve({
      //   sides: [
      //     {
      //       side_id: 3,
      //       perspectives: ["RIGHT_CONTAINER"],
      //     },
      //     {
      //       side_id: 5,
      //       perspectives: ["TOP"],
      //     },
      //     {
      //       side_id: 1,
      //       perspectives: ["LEFT_FRONT", "RIGHT_FRONT"],
      //     },
      //     {
      //       side_id: 2,
      //       perspectives: ["RIGHT_REAR"],
      //     },
      //     {
      //       side_id: 4,
      //       perspectives: ["LEFT_CONTAINER"],
      //     },
      //   ],
      // });
      // return;
      AxiosHttpClient.request()
        .get(ApiRoutesEnum.containerSidePerspectiveInfo, {
          params,
        })
        .then((res) => {
          if ([200, 201, 204].includes(res?.status)) {
            resolve(res?.data);
          }
        });
    });
  }

  function fetchContainerSideInfo(data: any): any {
    const params = {
      entity_id: damageConfig?.entity_id,
      transaction_id: damageConfig?.transaction_id,
      container_number: damageConfig?.container_number,
      container_position: damageConfig?.container_position,
      side: data?.side as string,
      side_id: data?.side_id as string,
    };

    return new Promise((resolve) => {
      // resolve({
      //   stitched_image_path: dynamicUrl + "/media/1737370857/stitched/LEFT.jpg",
      //   heatmap_image_path:
      //     dynamicUrl +
      //     "/media/atdamage_heatmap_images/1737536827/bWcbLYX8z/minor_heat_map_stitched_LEFT.jpg",
      //   major_heatmap_image_path:
      //     dynamicUrl +
      //     "/media/atdamage_heatmap_images/1737536827/bWcbLYX8z/major_heat_map_stitched_LEFT.jpg",
      //   stitched_image_predictions: [
      //     {
      //       cx: 0.7949617400528892,
      //       cy: 0.6712998747825623,
      //       duplicate: 0.0,
      //       confidence: 0.10105155905087788,
      //       class_id: 0,
      //       height: 0.03329848498106003,
      //       width: 0.019459775649011135,
      //     },
      //   ],
      //   container_level: 1,
      //   container_position: {
      //     x: 1,
      //     y: 1,
      //     z: 1,
      //   },
      //   side: 4,
      //   segment_info: [
      //     {
      //       segment_index: 1,
      //       segment_start: 0.0,
      //       segment_end: 840.0,
      //       damage_info: {
      //         MINOR_WARP: 0,
      //         WARP: 0,
      //         MINOR_SCRATCH: 0,
      //         MINOR_RUST: 0,
      //         RUST: 0,
      //         CUT_HOLE: 0,
      //         WELD: 0,
      //         PILLAR_DAMAGE: 0,
      //         PATCH: 0,
      //       },
      //     },
      //     {
      //       segment_index: 2,
      //       segment_start: 840.0,
      //       segment_end: 1680.0,
      //       damage_info: {
      //         MINOR_WARP: 0,
      //         WARP: 0,
      //         MINOR_SCRATCH: 0,
      //         MINOR_RUST: 0,
      //         RUST: 0,
      //         CUT_HOLE: 0,
      //         WELD: 0,
      //         PILLAR_DAMAGE: 0,
      //         PATCH: 0,
      //       },
      //     },
      //     {
      //       segment_index: 3,
      //       segment_start: 1680.0,
      //       segment_end: 2520.0,
      //       damage_info: {
      //         MINOR_WARP: 1,
      //         WARP: 0,
      //         MINOR_SCRATCH: 0,
      //         MINOR_RUST: 1,
      //         RUST: 0,
      //         CUT_HOLE: 0,
      //         WELD: 0,
      //         PILLAR_DAMAGE: 0,
      //         PATCH: 0,
      //       },
      //     },
      //   ],
      //   meta_data: [
      //     {
      //       container_no: "PYFU5827495",
      //       container_damage_info: {
      //         minor_damages: 5,
      //         major_damages: 0,
      //       },
      //       side_damage_info: {
      //         MINOR_WARP: 1,
      //         WARP: 0,
      //         MINOR_SCRATCH: 0,
      //         MINOR_RUST: 1,
      //         RUST: 0,
      //         CUT_HOLE: 0,
      //         WELD: 0,
      //         PILLAR_DAMAGE: 0,
      //         PATCH: 0,
      //       },
      //     },
      //   ],
      // });
      // return;
      AxiosHttpClient.request()
        .get(ApiRoutesEnum.containerSideInfo, { params })
        .then((res) => {
          if ([200, 201, 204].includes(res?.status)) {
            const responseData = res?.data as ContainerSideInfo;

            if (isPropEmpty(responseData.stitched_image_path)) {
              responseData.stitched_image_path =
                "damage-contoller/dummy_container.png";
            } else {
              responseData.stitched_image_path =
                responseData.stitched_image_path
                  ? dynamicUrl + responseData.stitched_image_path
                  : responseData.stitched_image_path;
            }

            responseData.heatmap_image_path = responseData.heatmap_image_path
              ? dynamicUrl + responseData.heatmap_image_path
              : responseData.heatmap_image_path;
            responseData.major_heatmap_image_path =
              responseData.major_heatmap_image_path
                ? dynamicUrl + responseData.major_heatmap_image_path
                : responseData.major_heatmap_image_path;

            resolve(responseData);
          }
        });
    });
  }

  function fetchSideSegmentInfo(data: any): any {
    const params = {
      transaction_id: damageConfig?.transaction_id,
      entity_id: damageConfig?.entity_id,
      container_number: damageConfig?.container_number,
      side: data?.side,
      segment_id: data?.segment_id,
      side_id: data?.side_id,
      is_minor_enabled: data.is_minor_enabled,
    };

    return new Promise((resolve) => {
      AxiosHttpClient.request()
        .get(ApiRoutesEnum.containerSideSegmentInfo, { params })
        .then((res) => {
          if ([200, 201, 204].includes(res?.status)) {
            const responseData = res?.data as ContainerSideSegmentInfo;
            responseData.segment_image_path =
              dynamicUrl + responseData.segment_image_path;

            resolve(responseData);
          }
        });
    });
  }

  function addContainerDamage(data: any): any {
    const payload = {
      transaction_id: damageConfig?.transaction_id,
      entity_id: damageConfig?.entity_id,
      container_number: damageConfig?.container_number,
      side: data?.side,
      segment_id: data?.segment_id,
      side_id: data?.side_id,
      damages: data?.damages,
      is_minor_enabled: data.is_minor_enabled,
    };

    return new Promise((resolve) => {
      AxiosHttpClient.request()
        .post(ApiRoutesEnum.containerDamage, payload)
        .then((res) => {
          if ([200, 201, 204].includes(res?.status)) {
            resolve(res?.data);
          }
        });
    });
  }

  function deleteContainerDamage(data: any): any {
    const payload = {
      transaction_id: damageConfig?.transaction_id,
      entity_id: damageConfig?.entity_id,
      container_number: damageConfig?.container_number,
      side: data?.side,
      segment_id: data?.segment_id,
      side_id: data?.side_id,
      damages: data?.damages,
      is_minor_enabled: data.is_minor_enabled,
    };

    return new Promise((resolve) => {
      AxiosHttpClient.request()
        .delete(ApiRoutesEnum.containerDamage, {
          data: payload,
        })
        .then((res) => {
          if ([200, 201, 204].includes(res?.status)) {
            resolve(res?.data);
          }
        });
    });
  }

  function updateContainerDamage(data: any): any {
    const payload = {
      transaction_id: damageConfig?.transaction_id,
      entity_id: damageConfig?.entity_id,
      container_number: damageConfig?.container_number,
      side: data?.side,
      segment_id: data?.segment_id,
      side_id: data?.side_id,
      damages: data?.damages,
      is_minor_enabled: data.is_minor_enabled,
    };

    return new Promise((resolve) => {
      AxiosHttpClient.request()
        .put(ApiRoutesEnum.containerDamage, payload)
        .then((res) => {
          if ([200, 201, 204].includes(res?.status)) {
            resolve(res?.data);
          }
        });
    });
  }

  return {
    fetchDamageConfig,
    fetchDamageSidePerceptionInfo,
    fetchContainerSideInfo,
    fetchSideSegmentInfo,
    addContainerDamage,
    deleteContainerDamage,
    updateContainerDamage,
  };
};

export default useDamage;
