# Dashboard Armada Transjakarta

Aplikasi ini merupakan dashboard untuk memantau data kendaraan secara real-time menggunakan data dari API publik (MBTA). Dibangun menggunakan React TypeScript + Vite, React Tanstack Query, dan HeroUI dengan pendekatan modular dan scalable.

## Tech Stack

- React + TypeScript
- Vite
- React Query (@tanstack/react-query) → data fetching & caching
- HeroUI → UI components & pagination
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

1. components/ #Menyimpan komponen ui yang reusable
2. config/ #Menyimpan konfigurasi
3. constants/ #Menyimpan konstanta data yang sering digunakan
4. layout/ #Menyimpan struktur layouting tampilan
5. services/ #Menyimpan fungsi crud dari api
6. types/ #Menyimpan tipe data
7. utils/ #Menyimpan fungsi helper dan axios interceptor
8. views/ #Berisi tampilan halaman beserta fungsi - fungsinya
