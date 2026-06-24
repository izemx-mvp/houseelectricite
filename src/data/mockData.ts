import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Gauge,
  Zap,
  LineChart,
  ShieldCheck,
  CircleDot,
} from "lucide-react";
import catPowerQuality from "@/assets/category-power-quality.jpg";
import catMeasurement from "@/assets/category-measurement.jpg";
import catPowerFactor from "@/assets/category-power-factor.jpg";
import catEnergyMgmt from "@/assets/category-energy-management.jpg";
import catProtection from "@/assets/category-protection.jpg";
import catCT from "@/assets/category-current-transformers.jpg";
import solEnergy from "@/assets/solution-energy-management.jpg";
import solPF from "@/assets/solution-power-factor.jpg";
import solProtection from "@/assets/solution-protection.jpg";
import imgPanelMeter from "@/assets/product-panel-meter.jpg";
import imgEnergyMeter from "@/assets/product-energy-meter.jpg";
import imgPFController from "@/assets/product-pf-controller.jpg";
import imgMonitoringRelay from "@/assets/product-monitoring-relay.jpg";
import imgPhaseRelay from "@/assets/product-phase-relay.jpg";
import imgTimer from "@/assets/product-timer.jpg";

export type CategoryId =
  | "power-quality"
  | "measurement"
  | "power-factor"
  | "energy-management"
  | "protection"
  | "current-transformers";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export const categories: Category[] = [
  {
    id: "power-quality",
    name: "Power Quality & Energy",
    description: "Analyzers and meters for harmonic, voltage, and quality monitoring.",
    icon: Activity,
    image: catPowerQuality,
  },
  {
    id: "measurement",
    name: "Electrical Measurement",
    description: "Precision metering, current and voltage measurement devices.",
    icon: Gauge,
    image: catMeasurement,
  },
  {
    id: "power-factor",
    name: "Power Factor Correction",
    description: "Reactive power controllers and capacitor switching systems.",
    icon: Zap,
    image: catPowerFactor,
  },
  {
    id: "energy-management",
    name: "Energy Management",
    description: "Hardware and software platforms for site-wide consumption tracking.",
    icon: LineChart,
    image: catEnergyMgmt,
  },
  {
    id: "protection",
    name: "Protection & Control",
    description: "Phase, voltage and timing relays for industrial safety.",
    icon: ShieldCheck,
    image: catProtection,
  },
  {
    id: "current-transformers",
    name: "Current Transformers",
    description: "Toroidal and split-core CTs for accurate current sensing.",
    icon: CircleDot,
    image: catCT,
  },
];

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  highlight: string;
  description: string;
  specs: { label: string; value: string }[];
}

const productImageMap: Record<string, string> = {
  "epm-04": imgPanelMeter,
  "epm-06": imgPanelMeter,
  "es3-63ls": imgEnergyMeter,
  "es3-80ls": imgEnergyMeter,
  "rgp-9": imgPFController,
  "rgp-12": imgPFController,
  "emk-01": imgMonitoringRelay,
  "akc-01a": imgMonitoringRelay,
  "akc-01d": imgMonitoringRelay,
  "gkrc-03": imgPhaseRelay,
  "gkrc-03f": imgPhaseRelay,
  "mcb-25": imgTimer,
  "mcb-7": imgTimer,
  "mcb-8": imgTimer,
  "mcb-9": imgTimer,
};

export function getProductImage(slug: string): string {
  return productImageMap[slug] ?? imgPanelMeter;
}

export const products: Product[] = [
  {
    slug: "epm-04",
    name: "EPM-04",
    category: "power-quality",
    highlight: "Compact energy and power meter, 4-DIN rail mount.",
    description:
      "Multi-function energy meter measuring active, reactive and apparent energy with class 0.5S accuracy. Designed for sub-billing and consumption monitoring in industrial and commercial sites.",
    specs: [
      { label: "Accuracy class", value: "0.5S (active) / 1 (reactive)" },
      { label: "Voltage input", value: "3 × 57.7 / 100 V — 3 × 230 / 400 V AC" },
      { label: "Current input", value: "X / 5 A or X / 1 A via CT" },
      { label: "Communication", value: "RS-485 Modbus RTU" },
      { label: "Display", value: "4-line illuminated LCD" },
      { label: "Mounting", value: "DIN rail, 4 modules" },
    ],
  },
  {
    slug: "epm-06",
    name: "EPM-06",
    category: "power-quality",
    highlight: "Multi-function network analyzer with harmonics up to 31st.",
    description:
      "Advanced network analyzer measuring electrical parameters in 3-phase systems including THD, individual harmonics, demand and energy. RS-485 Modbus communication.",
    specs: [
      { label: "Measurement", value: "V, I, P, Q, S, PF, F, THD" },
      { label: "Harmonics", value: "Up to 31st order" },
      { label: "Accuracy", value: "Class 0.5" },
      { label: "Communication", value: "RS-485 Modbus RTU" },
      { label: "Display", value: "Backlit LCD, 96 × 96 mm" },
      { label: "Power supply", value: "85 – 270 V AC/DC" },
    ],
  },
  {
    slug: "es3-63ls",
    name: "ES3-63LS",
    category: "energy-management",
    highlight: "Direct-connect 3-phase energy meter, 63 A, with Ethernet.",
    description:
      "Class 1 energy meter for direct connection up to 63 A per phase. LCD display, multi-tariff, MID-style architecture with built-in Ethernet for energy management integration.",
    specs: [
      { label: "Rated current", value: "5 (63) A direct" },
      { label: "Accuracy", value: "Class 1 active / 2 reactive" },
      { label: "Voltage", value: "3 × 230 / 400 V AC" },
      { label: "Communication", value: "Ethernet + RS-485" },
      { label: "Tariffs", value: "4 programmable" },
      { label: "Mounting", value: "DIN rail, 7 modules" },
    ],
  },
  {
    slug: "es3-80ls",
    name: "ES3-80LS",
    category: "energy-management",
    highlight: "Direct-connect 3-phase energy meter, 80 A, Ethernet & Modbus.",
    description:
      "Higher current variant of the ES3 line with direct connection up to 80 A per phase. Designed for sub-metering panels in commercial buildings and industrial loads.",
    specs: [
      { label: "Rated current", value: "5 (80) A direct" },
      { label: "Accuracy", value: "Class 1" },
      { label: "Voltage", value: "3 × 230 / 400 V AC" },
      { label: "Communication", value: "Ethernet, RS-485 Modbus RTU" },
      { label: "Pulse output", value: "1 × SO" },
      { label: "Mounting", value: "DIN rail, 7 modules" },
    ],
  },
  {
    slug: "rgp-9",
    name: "RGP-9",
    category: "power-factor",
    highlight: "Automatic power factor controller, 9 stages.",
    description:
      "Microprocessor-based reactive power controller managing up to 9 capacitor steps. Auto-recognition of stage values, alarms for over/under voltage, harmonics and temperature.",
    specs: [
      { label: "Number of stages", value: "9 outputs" },
      { label: "Target cos φ", value: "0.80 inductive – 0.80 capacitive" },
      { label: "Voltage measurement", value: "Single phase L-N" },
      { label: "Current measurement", value: "X / 5 A CT" },
      { label: "Alarms", value: "Under-compensation, over-voltage, THD" },
      { label: "Mounting", value: "Panel cut-out 138 × 138 mm" },
    ],
  },
  {
    slug: "rgp-12",
    name: "RGP-12",
    category: "power-factor",
    highlight: "Automatic power factor controller, 12 stages.",
    description:
      "12-stage reactive power controller for medium and large capacitor banks. Real-time monitoring of network parameters and capacitor health, with alarm relay output.",
    specs: [
      { label: "Number of stages", value: "12 outputs" },
      { label: "Target cos φ", value: "0.80 inductive – 0.80 capacitive" },
      { label: "Display", value: "Graphic LCD with backlight" },
      { label: "Communication", value: "RS-485 Modbus RTU (optional)" },
      { label: "Auxiliary supply", value: "85 – 270 V AC/DC" },
      { label: "Mounting", value: "Panel cut-out 138 × 138 mm" },
    ],
  },
  {
    slug: "emk-01",
    name: "EMK-01",
    category: "measurement",
    highlight: "Current protection relay with adjustable threshold.",
    description:
      "Single-phase current monitoring relay with adjustable over/under-current detection, delay and hysteresis. Used to protect motors and loads against abnormal current draw.",
    specs: [
      { label: "Measurement range", value: "0.1 – 5 A direct" },
      { label: "Output", value: "1 C/O contact, 8 A 250 V AC" },
      { label: "Time delay", value: "0.1 – 10 s adjustable" },
      { label: "Supply", value: "85 – 270 V AC/DC" },
      { label: "Mounting", value: "DIN rail, 1 module" },
    ],
  },
  {
    slug: "akc-01a",
    name: "AKC-01A",
    category: "measurement",
    highlight: "Phase sequence and asymmetry relay, analog adjustment.",
    description:
      "Protects 3-phase loads against phase loss, phase sequence error and asymmetry. Analog adjustments for asymmetry threshold and time delay.",
    specs: [
      { label: "Voltage", value: "3 × 400 V AC" },
      { label: "Asymmetry", value: "5 – 25% adjustable" },
      { label: "Time delay", value: "0.1 – 10 s" },
      { label: "Output", value: "1 C/O, 8 A" },
      { label: "Mounting", value: "DIN rail, 2 modules" },
    ],
  },
  {
    slug: "akc-01d",
    name: "AKC-01D",
    category: "measurement",
    highlight: "Phase sequence and asymmetry relay, digital display.",
    description:
      "Digital version of the AKC line with on-board display and precise programmable thresholds for asymmetry, under/over-voltage and time delays.",
    specs: [
      { label: "Voltage", value: "3 × 400 V AC" },
      { label: "Display", value: "3-digit LED" },
      { label: "Protections", value: "Phase loss, sequence, asymmetry, U<, U>" },
      { label: "Output", value: "1 C/O, 8 A" },
      { label: "Mounting", value: "DIN rail, 2 modules" },
    ],
  },
  {
    slug: "gkrc-03",
    name: "GKRC-03",
    category: "protection",
    highlight: "Phase protection relay with voltage monitoring.",
    description:
      "3-phase protection relay monitoring phase sequence, phase loss and over/under-voltage with adjustable thresholds. Designed for switchgear and motor control centers.",
    specs: [
      { label: "Voltage", value: "3 × 400 V AC" },
      { label: "Adjustable U<", value: "300 – 380 V" },
      { label: "Adjustable U>", value: "400 – 460 V" },
      { label: "Output", value: "1 C/O, 8 A" },
      { label: "Mounting", value: "DIN rail, 2 modules" },
    ],
  },
  {
    slug: "gkrc-03f",
    name: "GKRC-03F",
    category: "protection",
    highlight: "Phase protection relay with frequency monitoring.",
    description:
      "Extended version of the GKRC-03 with frequency monitoring (under/over) in addition to voltage and phase sequence protection.",
    specs: [
      { label: "Voltage", value: "3 × 400 V AC" },
      { label: "Frequency", value: "45 – 55 Hz adjustable" },
      { label: "Voltage thresholds", value: "Adjustable U< / U>" },
      { label: "Output", value: "1 C/O, 8 A" },
      { label: "Mounting", value: "DIN rail, 2 modules" },
    ],
  },
  {
    slug: "mcb-25",
    name: "MCB-25",
    category: "protection",
    highlight: "Multi-function digital timer with LCD display.",
    description:
      "Programmable digital timer with 8 timing functions and LCD display. Used for automation, sequential start-up and process control.",
    specs: [
      { label: "Functions", value: "8 selectable timing modes" },
      { label: "Range", value: "0.1 s – 999 h" },
      { label: "Display", value: "Backlit LCD" },
      { label: "Output", value: "1 C/O, 8 A 250 V AC" },
      { label: "Mounting", value: "DIN rail, 1 module" },
    ],
  },
  {
    slug: "mcb-7",
    name: "MCB-7",
    category: "protection",
    highlight: "Single-function timer relay, on-delay.",
    description:
      "Single-function on-delay timer with rotary adjustment, used in motor starting and control automation.",
    specs: [
      { label: "Function", value: "On-delay" },
      { label: "Range", value: "0.1 s – 100 h, 7 ranges" },
      { label: "Output", value: "1 C/O, 8 A" },
      { label: "Supply", value: "24 – 240 V AC/DC" },
      { label: "Mounting", value: "DIN rail, 1 module" },
    ],
  },
  {
    slug: "mcb-8",
    name: "MCB-8",
    category: "protection",
    highlight: "Multi-function timer with rotary selectors.",
    description:
      "Multi-function analog timer relay with rotary selectors for time range and function. Suitable for industrial automation panels.",
    specs: [
      { label: "Functions", value: "4 selectable" },
      { label: "Range", value: "0.1 s – 100 h" },
      { label: "Output", value: "1 C/O, 8 A" },
      { label: "Supply", value: "24 – 240 V AC/DC" },
      { label: "Mounting", value: "DIN rail, 1 module" },
    ],
  },
  {
    slug: "mcb-9",
    name: "MCB-9",
    category: "protection",
    highlight: "Star-delta timer relay for motor starting.",
    description:
      "Specialized timer for star-delta motor starting with adjustable changeover delay. Reduces inrush current on large motors.",
    specs: [
      { label: "Function", value: "Star-delta" },
      { label: "Range", value: "0.5 – 60 s" },
      { label: "Changeover", value: "50 ms fixed" },
      { label: "Output", value: "2 contacts, 8 A" },
      { label: "Mounting", value: "DIN rail, 1 module" },
    ],
  },
];

export const solutions = [
  {
    id: "energy-management",
    title: "Energy Management Solutions",
    icon: LineChart,
    image: solEnergy,
    paragraphs: [
      "Track electrical consumption in real time across every feeder, panel and tenant. Our energy management hardware integrates with software platforms via Modbus and Ethernet for centralized reporting.",
      "Identify waste, allocate costs accurately, and produce ISO 50001-ready data. The same hardware scales from a single substation to multi-site portfolios.",
    ],
    benefits: [
      "Real-time visibility on every load",
      "Multi-tariff and tenant sub-billing",
      "Modbus / Ethernet integration",
      "ISO 50001-ready reporting",
    ],
    relatedProducts: ["epm-04", "epm-06", "es3-63ls"],
  },
  {
    id: "power-factor",
    title: "Power Factor Correction Solutions",
    icon: Zap,
    image: solPF,
    paragraphs: [
      "Reduce reactive energy penalties and free up transformer capacity with automatic capacitor banks driven by ENTES RGP controllers.",
      "Our solutions target a power factor above 0.95, protect capacitors against harmonics and over-voltage, and report stage health for predictive maintenance.",
    ],
    benefits: [
      "Power factor maintained above 0.95",
      "Reduced reactive energy invoicing",
      "Capacitor health and THD monitoring",
      "Sized for 9 to 12 stages",
    ],
    relatedProducts: ["rgp-9", "rgp-12", "epm-06"],
  },
  {
    id: "protection",
    title: "Protection & Control Solutions",
    icon: ShieldCheck,
    image: solProtection,
    paragraphs: [
      "Safeguard motors, panels and process equipment with phase, voltage and current protection relays. Configurable thresholds and time delays match site requirements.",
      "Combined with multi-function timers, our protection range covers everything from simple star-delta starting to phase-failure shutdown of critical loads.",
    ],
    benefits: [
      "Phase failure and sequence protection",
      "Programmable U< / U> thresholds",
      "Timing relays for automation",
      "DIN-rail format, fast install",
    ],
    relatedProducts: ["gkrc-03", "gkrc-03f", "mcb-25"],
  },
];

export const brochures = [
  { title: "Power Quality Brochure", category: "Power Quality & Energy" },
  { title: "Energy Management Brochure", category: "Energy Management" },
  { title: "Power Factor Correction Brochure", category: "Power Factor" },
  { title: "Protection Relays Brochure", category: "Protection & Control" },
  { title: "Current Transformers Brochure", category: "Current Transformers" },
  { title: "Electrical Measurement Brochure", category: "Measurement" },
];

export const CATALOG_URL = "https://houseelectricite.ma/Uploads/files/Catalogue.pdf";

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id);
}