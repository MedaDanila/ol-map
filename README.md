## Описание
Это набор функций, которые упрощают работу с библиотекой OpenLayers. Этот инструмент создан для разработчиков, которые хотят избежать боли при создании карт, добавлении интерактивности и кастомизации стилей. С помощью данного инструментария вы сможете быстро создавать мощные и функциональные карты.

## Основные функции

### 1. MapService — работа с картой

Этот модуль включает функции для инициализации карты, настройки параметров (центр, масштаб) и добавления дополнительных возможностей, таких как тёмная тема.

Пример:
```javascript
import { initializeMap, enableDarkMode } from './helpers/MapService';

const map = initializeMap({
  targetElement: document.getElementById('map'),
  center: [43.984506, 56.305298],
  zoom: 11,
});

enableDarkMode(map);
```

---

### 2. LayerService — управление слоями

Позволяет легко создавать и настраивать векторные слои, поддерживает кастомные стили и кластеризацию.

Пример:
```javascript
import { createVectorLayer } from './helpers/LayerService';

const vectorLayer = createVectorLayer({
  source: myVectorSource,
  style: {
    Point: (feature) => myPointStyle(feature),
  },
});

map.addLayer(vectorLayer);
```

---

### 3. InteractionService — добавление интерактивности

Позволяет настраивать обработку кликов, отображение всплывающих окон и выбор объектов на карте.

Пример:
```javascript
import { setupClickInteraction } from './helpers/InteractionService';

setupClickInteraction({
  map,
  onFeatureClick: (feature) => console.log('Clicked feature:', feature),
  popupTargetElement: document.getElementById('popup'),
});
```

---

### 4. StyleFactory — создание стилей

Простой способ настройки стилей для точек, линий и других геометрий. Поддерживает параметризацию.

Пример:
```javascript
import { createPointStyle } from './helpers/StyleFactory';

const myPointStyle = createPointStyle({
  fillColor: 'green',
  radius: 10,
});
```
