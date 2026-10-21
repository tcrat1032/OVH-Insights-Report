export type ServerRange = "Advance" | "Scale" | "High Grade" | "Storage" | "Game";

export type DedicatedServer = {
  id: string;
  name: string;
  range: ServerRange;
  cpuBrand: "Intel" | "AMD";
  cpu: string;
  cores: number;
  threads: number;
  frequency: string; // GHz
  memory: string; // e.g. "64 GB DDR4"
  memoryGB: number;
  storage: string; // e.g. "2 × 960 GB NVMe"
  storageType: "NVMe" | "SSD" | "SAS" | "HDD";
  bandwidth: string; // e.g. "1 Gbps unmetered"
  bandwidthGbps: number;
  region: string;
  priceMonthly: number; // INR
  setupFee?: number;
  highlight?: string;
};

export const SERVER_RANGES: { key: ServerRange; title: string; desc: string }[] = [
  { key: "Advance", title: "Advance", desc: "Versatile servers for web, virtualisation and business workloads." },
  { key: "Scale", title: "Scale", desc: "High-density compute for demanding production workloads." },
  { key: "High Grade", title: "High Grade", desc: "Top-tier performance for mission-critical applications." },
  { key: "Storage", title: "Storage", desc: "Massive capacity for backup, archive and big data." },
  { key: "Game", title: "Game", desc: "Low-latency servers tuned for game hosting and streaming." },
];

export const DEDICATED_SERVERS: DedicatedServer[] = [
  {
    id: "adv-1", name: "ADV-1", range: "Advance", cpuBrand: "Intel",
    cpu: "Intel Xeon-E 2386G", cores: 6, threads: 12, frequency: "3.5 GHz",
    memory: "32 GB DDR4 ECC", memoryGB: 32,
    storage: "2 × 512 GB NVMe", storageType: "NVMe",
    bandwidth: "1 Gbps unmetered", bandwidthGbps: 1,
    region: "India - Delhi NCR", priceMonthly: 6499, highlight: "Best value",
  },
  {
    id: "adv-2", name: "ADV-2", range: "Advance", cpuBrand: "AMD",
    cpu: "AMD EPYC 4344P", cores: 8, threads: 16, frequency: "3.8 GHz",
    memory: "64 GB DDR5 ECC", memoryGB: 64,
    storage: "2 × 960 GB NVMe", storageType: "NVMe",
    bandwidth: "1 Gbps unmetered", bandwidthGbps: 1,
    region: "India - Delhi NCR", priceMonthly: 9499,
  },
  {
    id: "adv-3", name: "ADV-3", range: "Advance", cpuBrand: "Intel",
    cpu: "Intel Xeon Silver 4314", cores: 16, threads: 32, frequency: "2.4 GHz",
    memory: "128 GB DDR4 ECC", memoryGB: 128,
    storage: "2 × 1.92 TB NVMe", storageType: "NVMe",
    bandwidth: "2 Gbps unmetered", bandwidthGbps: 2,
    region: "India - Delhi NCR", priceMonthly: 14999,
  },
  {
    id: "scl-1", name: "SCALE-1", range: "Scale", cpuBrand: "AMD",
    cpu: "AMD EPYC 9354P", cores: 32, threads: 64, frequency: "3.25 GHz",
    memory: "256 GB DDR5 ECC", memoryGB: 256,
    storage: "2 × 3.84 TB NVMe", storageType: "NVMe",
    bandwidth: "10 Gbps unmetered", bandwidthGbps: 10,
    region: "India - Delhi NCR", priceMonthly: 28999, highlight: "Popular",
  },
  {
    id: "scl-2", name: "SCALE-2", range: "Scale", cpuBrand: "Intel",
    cpu: "2 × Intel Xeon Gold 6438Y+", cores: 64, threads: 128, frequency: "2.0 GHz",
    memory: "512 GB DDR5 ECC", memoryGB: 512,
    storage: "4 × 3.84 TB NVMe", storageType: "NVMe",
    bandwidth: "10 Gbps unmetered", bandwidthGbps: 10,
    region: "India - Delhi NCR", priceMonthly: 49999,
  },
  {
    id: "hg-1", name: "HG-1", range: "High Grade", cpuBrand: "AMD",
    cpu: "2 × AMD EPYC 9554", cores: 128, threads: 256, frequency: "3.1 GHz",
    memory: "1 TB DDR5 ECC", memoryGB: 1024,
    storage: "6 × 7.68 TB NVMe", storageType: "NVMe",
    bandwidth: "25 Gbps unmetered", bandwidthGbps: 25,
    region: "India - Delhi NCR", priceMonthly: 119999, highlight: "Top performance",
  },
  {
    id: "hg-2", name: "HG-2", range: "High Grade", cpuBrand: "Intel",
    cpu: "2 × Intel Xeon Platinum 8480+", cores: 112, threads: 224, frequency: "2.0 GHz",
    memory: "1 TB DDR5 ECC", memoryGB: 1024,
    storage: "8 × 3.84 TB NVMe", storageType: "NVMe",
    bandwidth: "25 Gbps unmetered", bandwidthGbps: 25,
    region: "India - Delhi NCR", priceMonthly: 134999,
  },
  {
    id: "stor-1", name: "STOR-1", range: "Storage", cpuBrand: "Intel",
    cpu: "Intel Xeon-E 2386G", cores: 6, threads: 12, frequency: "3.5 GHz",
    memory: "64 GB DDR4 ECC", memoryGB: 64,
    storage: "6 × 12 TB SATA HDD", storageType: "HDD",
    bandwidth: "1 Gbps unmetered", bandwidthGbps: 1,
    region: "India - Delhi NCR", priceMonthly: 18999,
  },
  {
    id: "stor-2", name: "STOR-2", range: "Storage", cpuBrand: "AMD",
    cpu: "AMD EPYC 4344P", cores: 8, threads: 16, frequency: "3.8 GHz",
    memory: "128 GB DDR4 ECC", memoryGB: 128,
    storage: "12 × 18 TB SAS HDD", storageType: "SAS",
    bandwidth: "2 Gbps unmetered", bandwidthGbps: 2,
    region: "India - Delhi NCR", priceMonthly: 34999, highlight: "Big capacity",
  },
  {
    id: "game-1", name: "GAME-1", range: "Game", cpuBrand: "Intel",
    cpu: "Intel Core i7-7700K", cores: 4, threads: 8, frequency: "4.2 GHz",
    memory: "64 GB DDR4", memoryGB: 64,
    storage: "2 × 500 GB NVMe", storageType: "NVMe",
    bandwidth: "1 Gbps unmetered", bandwidthGbps: 1,
    region: "India - Delhi NCR", priceMonthly: 7999,
  },
  {
    id: "game-2", name: "GAME-2", range: "Game", cpuBrand: "AMD",
    cpu: "AMD Ryzen 9 7950X", cores: 16, threads: 32, frequency: "4.5 GHz",
    memory: "128 GB DDR5", memoryGB: 128,
    storage: "2 × 2 TB NVMe", storageType: "NVMe",
    bandwidth: "2 Gbps unmetered", bandwidthGbps: 2,
    region: "India - Delhi NCR", priceMonthly: 15999, highlight: "Low latency",
  },
];
