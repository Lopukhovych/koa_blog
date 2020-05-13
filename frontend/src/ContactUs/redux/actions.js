export const LOAD_CONTACT_US = 'LOAD_CONTACT_US';
export const CONTACT_US_PENDING = 'CONTACT_US_PENDING';
export const CONTACT_US_SUCCESS = 'CONTACT_US_SUCCESS';
export const CONTACT_US_FAILURE = 'CONTACT_US_FAILURE';

export const CONTACT_US_SEND_MESSAGE = 'CONTACT_US_SEND_MESSAGE';
export const CONTACT_US_SEND_MESSAGE_PENDING = 'CONTACT_US_SEND_MESSAGE_PENDING';
export const CONTACT_US_SEND_MESSAGE_SUCCESS = 'CONTACT_US_SEND_MESSAGE_SUCCESS';
export const CONTACT_US_SEND_MESSAGE_FAILURE = 'CONTACT_US_SEND_MESSAGE_FAILURE';

export const loadContactUs = () => ({
  type: LOAD_CONTACT_US,
});

export const loadContactUsStart = () => ({
  type: CONTACT_US_PENDING,
});

export const loadContactUsSuccess = (data) => ({
  type: CONTACT_US_SUCCESS,
  data,
});

export const loadContactUsFail = (error) => ({
  type: CONTACT_US_FAILURE,
  error,
});

export const contactUsSendMessage = (data) => ({
  type: CONTACT_US_SEND_MESSAGE,
  data,
});

export const contactUsSendMessageStart = () => ({
  type: CONTACT_US_SEND_MESSAGE_PENDING,
});

export const contactUsSendMessageSuccess = () => ({
  type: CONTACT_US_SEND_MESSAGE_SUCCESS,
});

export const contactUsSendMessageFailure = () => ({
  type: CONTACT_US_SEND_MESSAGE_FAILURE,
});
