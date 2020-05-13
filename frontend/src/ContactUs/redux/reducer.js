import {
  CONTACT_US_PENDING,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAILURE,
  CONTACT_US_SEND_MESSAGE_PENDING,
  CONTACT_US_SEND_MESSAGE_SUCCESS,
  CONTACT_US_SEND_MESSAGE_FAILURE,
} from './actions';

const initialState = {
  loadPending: false,
  loadError: null,
  contactUs: null,
  sendMessagePending: false,
  sendMessageSuccess: false,
  sendMessageFailure: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_US_PENDING:
      return {
        ...initialState,
        loadPending: true,
      };
    case CONTACT_US_SUCCESS:
      return {
        ...initialState,
        contactUs: action.data,
      };
    case CONTACT_US_FAILURE:
      return {
        ...initialState,
        loadError: action.error,
      };
    case CONTACT_US_SEND_MESSAGE_PENDING:
      return {
        ...state,
        sendMessagePending: true,
      };
    case CONTACT_US_SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendMessagePending: false,
        sendMessageSuccess: true,
      };
    case CONTACT_US_SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendMessagePending: false,
        sendMessageFailure: true,
      };
    default:
      return state;
  }
};
