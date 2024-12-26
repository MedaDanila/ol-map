<script setup>
import GeoJson from "./GeoJson";
import { onMounted, ref } from "vue";
import { enableDarkMode, initializeMap } from "../../helpers/MapService";
import { setupClickInteraction } from "../../helpers/InteractionService";
import {
  createVectorLayer,
  createVectorSource,
} from "../../helpers/LayerService";
import { createPointStyle } from "../../helpers/StyleFactory";

const mapTargetElementExemplaThree = ref();
const popupTargetElementExemplaThree = ref();
const map = ref();
const information = ref();

function initializeLayer() {
  // Создаем векторный слой
  const generalLayer = createVectorLayer({
    source: createVectorSource(GeoJson),
    style: {
      Point: createPointStyle({ fillColor: "#FF0000" }),
      Point_selected: createPointStyle({ fillColor: "#00FF2F" }),
    },
  });

  setupClickInteraction({
    map: map.value,
    onFeatureClick: (feature) => (information.value = feature),
    selectFeature: true,
    popupTargetElement: popupTargetElementExemplaThree.value,
  });

  map.value.addLayer(generalLayer);
}

onMounted(() => {
  map.value = initializeMap({
    targetElement: mapTargetElementExemplaThree.value,
    center: [37.617698, 55.755864],
  });
  enableDarkMode(map.value);

  initializeLayer();
});
</script>
<template>
  <div class="exempla-three">
    <div class="exempla-three__map" ref="mapTargetElementExemplaThree">
      <div
        ref="popupTargetElementExemplaThree"
        class="exempla-three__map__popup"
      >
        <span v-show="information !== null">{{ information }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exempla-three {
  width: 100%;
  height: calc(100dvh - 114px);

  display: flex;
  flex-direction: row;
  gap: 12px;

  &__map {
    width: 100%;
    height: 100%;

    overflow: hidden;
    border-radius: 8px;

    &__popup {
      width: 350px;
      height: 100%;
      max-height: 400px;

      padding: 12px 16px;

      overflow-y: auto;

      background-color: white;
      border-radius: 8px;
    }
  }
}
</style>
