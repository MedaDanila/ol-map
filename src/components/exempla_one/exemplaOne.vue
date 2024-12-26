<script setup>
import GeoJson from "./GeoJson";
import { onMounted, ref } from "vue";
import { enableDarkMode, initializeMap } from "../../helpers/MapService";
import { setupClickInteraction } from "../../helpers/InteractionService";
import {
  createVectorLayer,
  createVectorSource,
} from "../../helpers/LayerService";
import {
  createLineStringStyle,
  createPointStyle,
  createPolygonStyle,
} from "../../helpers/StyleFactory";

const mapTargetElementExempleOne = ref();
const map = ref();
const information = ref("Нет выбранной фичи");

function initializeLayer() {
  // Создаем векторный слой
  const generalLayer = createVectorLayer({
    source: createVectorSource(GeoJson),
    style: {
      Point: createPointStyle({ fillColor: "#FF0000" }),
      Point_selected: createPointStyle({ fillColor: "#00FF2F" }),
      Polygon: createPolygonStyle({
        fillColor: "#FF000080",
        strokeColor: "#B10404",
      }),
      Polygon_selected: createPolygonStyle({
        fillColor: "#00FF2F80",
        strokeColor: "#00B922",
      }),
      LineString: createLineStringStyle({ strokeColor: "#FF0000", width: 3 }),
      LineString_selected: createLineStringStyle({
        strokeColor: "#00FF2F",
        width: 3,
      }),
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
    targetElement: mapTargetElementExempleOne.value,
    center: [37.617698, 55.755864],
  });
  enableDarkMode(map.value);

  initializeLayer();
});
</script>
<template>
  <div class="exempla-one">
    <div class="exempla-one__map" ref="mapTargetElementExempleOne"></div>
    <div class="exempla-one__feature-information">
      {{ information }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exempla-one {
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
