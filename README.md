# Dashboard Armada Transjakarta

Aplikasi ini merupakan dashboard untuk memantau data kendaraan secara real-time menggunakan data dari API publik (MBTA). Dibangun menggunakan React TypeScript + Vite, React Tanstack Query, dan HeroUI dengan pendekatan modular dan scalable.

## Tech Stack

- React + TypeScript
- Vite
- React Query (@tanstack/react-query) → data fetching & caching
- HeroUI → UI components
- Tailwind CSS → styling
- Leaflet → peta lokasi kendaraan

## Instalasi dan Menjalankan Aplikasi

### 1. Clone Repository

```js
git clone https://github.com/gayabarumalamselatan/technical-test-transjakarta.git
```

### 2.Install Depedencies

```js
npm install
```

### 3. Jalankan Aplikasi

```js
npm run dev
```

Aplikasi akan berjalan secara default di http://localhost:5173

## Arsitektur Aplikasi

Menggunakan pendekatan arsitektur yang modular dengan pemisahan yang jelas.

## Struktur Folder

src/
├── components/ #Menyimpan komponen ui yang reusable
├── config/ #Menyimpan konfigurasi
├── constants/ #Menyimpan konstanta data yang sering digunakan
├── layout/ #Menyimpan struktur layouting tampilan  
 ├── services/ #Menyimpan fungsi crud dari api
├── types/ #Menyimpan tipe data
├── utils/ #Menyimpan fungsi helper dan axios interceptor
└── views/ #Berisi tampilan halaman beserta fungsi - fungsinya
