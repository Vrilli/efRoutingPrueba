# 🚀 SpaceX Launches App

Aplicación móvil desarrollada con **React Native (Expo)** que consume la API pública de SpaceX y muestra información detallada sobre lanzamientos espaciales pasados y futuros.

Incluye navegación entre pantallas, arquitectura modular con adaptadores y repositorios, validación de datos con Zod, estilo con `StyleSheet.create`, y un pipeline de CI/CD con GitHub Actions.

---

## 🧠 Tecnologías utilizadas

* **Expo (Managed Workflow)**
* **React Native**
* **React Navigation (native-stack + bottom-tabs)**
* **Zod** para validación de datos
* **Axios** para consumo de API
* **EAS CLI** para generar builds
* **GitHub Actions** para CI/CD
* **react-native-vector-icons** (incluido vía Expo) para íconos en navegación

---

## 🎨 Estilos

El proyecto utiliza `StyleSheet.create` nativo de React Native para definir estilos.
**No** se usa TailwindCSS ni NativeWind, asegurando mayor control visual y compatibilidad multiplataforma (incluido Web con Expo).

---

## 📱 Funcionalidades

* 🚁 Listado de lanzamientos espaciales de SpaceX (pasados y futuros)
* 📄 Vista de detalles para cada lanzamiento: misión, cohete, imágenes, estado y plataforma
* 🔍 Barra de búsqueda y filtros por estado y orden
* ✅ Validación estricta de datos con Zod
* 🤖 Pruebas unitarias básicas con Jest y React Native Testing Library
* 🔄 Build automatizado y artefacto APK con GitHub Actions

---

## 📦 Instalación y ejecución local

### 1. Clona el repositorio

```bash
git clone https://github.com/Vrilli/efRoutingPrueba.git
```

### 2. Accede al directorio del proyecto

```bash
cd efRoutingPrueba
```

### 3. Instala las dependencias

```bash
npm install
```

### 4. Corre la aplicación en modo desarrollo

```bash
npx expo start
```

---

## 🧪 Scripts útiles

```bash
npx expo start    # Inicia el servidor de desarrollo (iOS, Android, Web)
npx expo run:android # Ejecuta en dispositivo/emulador Android
npx expo run:ios     # Ejecuta en iOS (macOS requerido)
```

---

## 🔗 API usada

[SpaceX API](https://github.com/r-spacex/SpaceX-API) – Información pública sobre lanzamientos, misiones y cohetes.

---

## 📁 Estructura del proyecto

```bash
src/
├── app/                  # Componentes principales de la app
├── core/                 # Modelos, adaptadores, validaciones y repositorios
├── features/             # Features específicas (lanzamientos)
├── navigation/           # Stack y Tabs
```

---

## 🤝 Contribuciones

¿Tienes ideas para mejorar? ¡Pull requests y estrellas son bienvenidos!

---

## 🥀 Autor

Desarrollado por [Vrilli](https://github.com/Vrilli)
