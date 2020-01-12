import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Error from 'src/components/Error';
import {updateFormControlsHandler} from 'src/core/formHandler.helper';
import ContactUsView from './ContactUs.view';
import {loadContactUs, contactUsSendMessage} from './redux/actions';

class ContactUsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Name',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          errorMessage: 'This field is required',
          touched: false,
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your email',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          errorMessage: 'Should contain only a-z, A-Z, 0-9, ._, and one "@"',
          touched: false,
        },
        message: {
          elementType: 'textarea',
          elementConfig: {
            type: 'textarea',
            placeholder: 'Message',
            resize: 'none',
          },
          value: '',
          validation: {
            required: true,
            maxLength: 300,
          },
          valid: false,
          errorMessage: 'Max length is 300 symbols',
          touched: false,
        },
      },
      formIsValid: false,
      errorMessage: null,
    };
  }

  componentDidMount() {
    const {loadContactUs} = this.props;
    loadContactUs();
  }

  changeFormValueHandler = (value, controlName) => {
    const {controls} = this.state;

    this.setState(updateFormControlsHandler(value, controlName, controls));
  };

  submitFormHandler = (e) => {
    e.preventDefault();
    const {contactUsSendMessage} = this.props;
    const {controls, formIsValid} = this.state;
    if (formIsValid) {
      const messageData = {};
      Object.keys(controls).forEach((key) => {
        messageData[key] = controls[key].value;
      });
      contactUsSendMessage(messageData);
    }
  };

  render() {
    const {
      loadPending,
      loadError,
      contactUs,
      sendMessagePending,
      sendMessageSuccess,
      sendMessageFailure,
    } = this.props;
    const {controls, formIsValid, errorMessage} = this.state;

    if (loadError) {
      return <Error />;
    }

    if (!contactUs || loadPending) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <ContactUsView
        showLabel
        controls={controls}
        formIsValid={formIsValid}
        errorMessage={errorMessage}
        changeFormValueHandler={this.changeFormValueHandler}
        submitFormHandler={this.submitFormHandler}
        feedBack={contactUs && contactUs.feedBack}
        contactInfo={contactUs && contactUs.contactInfo}
        sendMessagePending={sendMessagePending}
        sendMessageSuccess={sendMessageSuccess}
        sendMessageFailure={sendMessageFailure}
      />
    );
  }
}

ContactUsContainer.propTypes = {
  loadPending: PropTypes.bool,
  loadError: PropTypes.oneOfType([PropTypes.object]),
  contactUs: PropTypes.shape({
    feedBack: PropTypes.string,
    contactInfo: PropTypes.object,
  }),
  sendMessagePending: PropTypes.bool,
  sendMessageSuccess: PropTypes.bool,
  sendMessageFailure: PropTypes.bool,
  loadContactUs: PropTypes.func.isRequired,
  contactUsSendMessage: PropTypes.func.isRequired,
};

ContactUsContainer.defaultProps = {
  loadPending: false,
  loadError: null,
  contactUs: null,
  sendMessagePending: false,
  sendMessageSuccess: false,
  sendMessageFailure: false,
};

const mapStateToProps = ({
  contactUs: {
    loadPending,
    loadError,
    contactUs,
    sendMessagePending,
    sendMessageSuccess,
    sendMessageFailure,
  },
}) => ({
  loadPending,
  loadError,
  contactUs,
  sendMessagePending,
  sendMessageSuccess,
  sendMessageFailure,
});

const mapDispatchToProps = {
  loadContactUs,
  contactUsSendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsContainer);
