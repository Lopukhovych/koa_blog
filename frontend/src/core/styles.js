export const smallMobile = 'smallMobile';
export const mobile = 'mobile';
export const bigMobile = 'bigMobile';
export const tablet = 'tablet';
export const smallDesktop = 'smallDesktop';
export const mq = {};

const breakpoints = [
  {name: smallMobile, values: [320, 360]},
  {name: mobile, values: [360, 480]},
  {name: bigMobile, values: [480, 768]},
  {name: tablet, values: [768, 992]},
  {name: smallDesktop, values: [992, 1200]}];

breakpoints.forEach((item) => {
  mq[item.name] = `@media (min-width: ${item.values[0]}px) and  (max-width: ${item.values[1]}px)`;
});
