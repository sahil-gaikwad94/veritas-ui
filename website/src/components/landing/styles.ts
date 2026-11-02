/* Shared CSS class names for signature visual motifs */

/* Fluted / Ribbed Glass Contractor Surface */
export const veritasFlutedGlass = `
  relative overflow-hidden rounded-[28px] bg-white
`;

export const veritasFlutedLouvers = `
  absolute inset-0
  bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0px,rgba(255,255,255,0.02)_14px,rgba(6,27,82,0.14)_72px,rgba(255,255,255,0.32)_88px)]
  backdrop-blur-[18px] -webkit-backdrop-blur-[18px] saturate-[140%]
`;

/* Tactile 3D Cobalt Squircle Badge */
export const veritasCobaltSquircle = `
  rounded-[22px]
  bg-gradient-to-tr from-[#3B76FF] via-[#1146E8] to-[#0932B5]
  shadow-[0_20px_38px_-10px_rgba(20,78,255,0.42),0_4px_12px_-2px_rgba(20,78,255,0.25),inset_0_2px_3px_rgba(255,255,255,0.55),inset_0_-3px_6px_rgba(4,18,74,0.45)]
  transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
  hover:-translate-y-6 hover:scale-104
`;
