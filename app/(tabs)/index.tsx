import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";
import Controller from "../overlay-controller/applications/Controller";
import { useEffect, useState } from "react";
import { SegmentParserClass } from "../parsing-handlers/segment-parse";
import { isPropEmpty } from "../utils/CommonUtils";
import DefualtCanvas from "./DefualtCanvas";
import Demo from "./Demo";

export default function HomeScreen() {
  const [controlSetting, setControlSetting] = useState();

  useEffect(() => {
    const clonedRes = {
      stitched_image_path:
        "http://172.16.120.69:7005/media/1734436738/stitched/LEFT.jpg",
      heatmap_image_path: null,
      major_heatmap_image_path: null,
      stitched_image_predictions: [
        {
          cx: 0.22648610020646417,
          cy: 0.8285495865853938,
          duplicate: 0.0,
          confidence: 0.71,
          class_id: 6,
          height: 0.2404272338049231,
          width: 0.3382383575086084,
        },
        {
          cx: 0.4427638254321708,
          cy: 0.6165965525349324,
          duplicate: 0.0,
          confidence: 0.54,
          class_id: 4,
          height: 0.2564932850280468,
          width: 0.3556117665668817,
        },
      ],
      container_level: 1,
      container_position: {
        x: 1,
        y: 1,
        z: 1,
      },
      side: 4,
      segment_info: [
        {
          segment_index: 1,
          segment_start: 0.0,
          segment_end: 499.0,
          damage_info: {
            WARP: 0,
            MINOR_SCRATCH: 0,
            RUST: 0,
            CUT_HOLE: 0,
            WELD: 1,
            PILLAR_DAMAGE: 0,
            PATCH: 0,
          },
        },
        {
          segment_index: 2,
          segment_start: 500.0,
          segment_end: 999.0,
          damage_info: {
            WARP: 1,
            MINOR_SCRATCH: 0,
            RUST: 0,
            CUT_HOLE: 0,
            WELD: 1,
            PILLAR_DAMAGE: 0,
            PATCH: 0,
          },
        },
        {
          segment_index: 3,
          segment_start: 1000.0,
          segment_end: 1499.0,
          damage_info: {
            WARP: 1,
            MINOR_SCRATCH: 1,
            RUST: 0,
            CUT_HOLE: 0,
            WELD: 0,
            PILLAR_DAMAGE: 0,
            PATCH: 0,
          },
        },
        {
          segment_index: 4,
          segment_start: 1500.0,
          segment_end: 1999.0,
          damage_info: {
            WARP: 0,
            MINOR_SCRATCH: 0,
            RUST: 0,
            CUT_HOLE: 0,
            WELD: 0,
            PILLAR_DAMAGE: 0,
            PATCH: 0,
          },
        },
      ],
      meta_data: [
        {
          container_no: "NOFU1006135",
          container_damage_info: {
            minor_damages: 6,
            major_damages: 17,
          },
          side_damage_info: {
            WARP: 2,
            MINOR_SCRATCH: 1,
            RUST: 0,
            CUT_HOLE: 0,
            WELD: 2,
            PILLAR_DAMAGE: 0,
            PATCH: 0,
          },
        },
      ],
    };
    const damageConfig = [
      {
        damage_name: "MINOR_WARP",
        damage_id: 0,
        is_configured: false,
        is_notified: false,
        type_of_damage: 0,
        color_code: "#ffdb58",
      },
      {
        damage_name: "WARP",
        damage_id: 1,
        is_configured: true,
        is_notified: true,
        type_of_damage: 1,
        color_code: "#adbbad",
      },
      {
        damage_name: "MINOR_SCRATCH",
        damage_id: 2,
        is_configured: true,
        is_notified: false,
        type_of_damage: 0,
        color_code: "#151515",
      },
      {
        damage_name: "MINOR_RUST",
        damage_id: 3,
        is_configured: false,
        is_notified: false,
        type_of_damage: 0,
        color_code: "#ff7f7f",
      },
      {
        damage_name: "RUST",
        damage_id: 4,
        is_configured: true,
        is_notified: true,
        type_of_damage: 1,
        color_code: "#9c27b0",
      },
      {
        damage_name: "CUT_HOLE",
        damage_id: 5,
        is_configured: true,
        is_notified: false,
        type_of_damage: 1,
        color_code: "#483248",
      },
      {
        damage_name: "WELD",
        damage_id: 6,
        is_configured: true,
        is_notified: false,
        type_of_damage: 1,
        color_code: "#40e0d0",
      },
      {
        damage_name: "PILLAR_DAMAGE",
        damage_id: 10,
        is_configured: true,
        is_notified: false,
        type_of_damage: 1,
        color_code: "#ff7d29",
      },
      {
        damage_name: "PATCH",
        damage_id: 11,
        is_configured: true,
        is_notified: false,
        type_of_damage: 0,
        color_code: "#373a40",
      },
    ];

    const data = new SegmentParserClass().generateSegments(
      clonedRes as any,
      damageConfig
    );

    console.log(data);
    setControlSetting(data as any);
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <DefualtCanvas />
      {/* <Demo /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
