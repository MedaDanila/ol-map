<script setup>
import GeoJson from "./GeoJson";
import { onMounted, ref } from "vue";
import { enableDarkMode, initializeMap } from "../../helpers/MapService";
import { setupClickInteraction } from "../../helpers/InteractionService";
import {
  createClusterSource,
  createVectorLayer,
} from "../../helpers/LayerService";
import {
  createClusterPointStyle,
  createPointStyle,
} from "../../helpers/StyleFactory";

const mapTargetElementExempleTwo = ref();
const map = ref();
const information = ref("Нет выбранной фичи");

function initializeLayer() {
  // Создаем векторный слой
  const generalLayer = createVectorLayer({
    source: createClusterSource({ geoData: GeoJson }),
    style: {
      Point: createPointStyle({ fillColor: "#FF0000" }),
      Point_selected: createPointStyle({ fillColor: "#00FF2F" }),
      Cluster: (size) =>
        createClusterPointStyle({ size, fillColor: "#FF0000" }),
      Cluster_selected: (size) =>
        createClusterPointStyle({ size, fillColor: "#00FF2F" }),
    },
  });

  setupClickInteraction({
    map: map.value,
    onFeatureClick: (feature) => {
      information.value = feature !== null ? feature : "Нет выбранной фичи";
    },
    selectFeature: true,
  });

  map.value.addLayer(generalLayer);
}

onMounted(() => {
  map.value = initializeMap({
    targetElement: mapTargetElementExempleTwo.value,
    center: [37.617698, 55.755864],
  });
  enableDarkMode(map.value);
  initializeLayer();
});
</script>
<template>
  <div class="exempla-two">
    <div class="exempla-two__map" ref="mapTargetElementExempleTwo"></div>
    <div class="exempla-two__feature-information">
      {{ information }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exempla-two {
  width: 100%;
  height: calc(100dvh - 114px);

  display: flex;
  flex-direction: row;
  gap: 12px;

  &__map {
    width: 70%;
    height: 100%;

    overflow: hidden;
    border-radius: 8px;
  }

  &__feature-information {
    width: 30%;
    height: 100%;

    padding: 12px 16px;

    overflow-y: auto;

    background-color: white;
    border-radius: 8px;
  }
}
</style>
