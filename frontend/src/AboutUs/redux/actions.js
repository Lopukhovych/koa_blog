export const LOAD_ABOUT_US = 'LOAD_ABOUT_US';
export const LOAD_ABOUT_US_PENDING = 'LOAD_ABOUT_US_PENDING';
export const LOAD_ABOUT_US_SUCCESS = 'LOAD_ABOUT_US_SUCCESS';
export const LOAD_ABOUT_US_FAILED = 'LOAD_ABOUT_US_FAILED';


export const loadAboutUs = () => ({
  type: LOAD_ABOUT_US,
});

export const loadAboutUsStart = () => ({
  type: LOAD_ABOUT_US_PENDING,
});

export const loadAboutUsSuccess = (data) => ({
  type: LOAD_ABOUT_US_SUCCESS,
  data,
});

export const loadAboutUsFail = (error) => ({
  type: LOAD_ABOUT_US_FAILED,
  error,
});
