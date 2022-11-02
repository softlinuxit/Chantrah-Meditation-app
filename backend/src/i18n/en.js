/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'Conspiracy Coin',
  },

  auth: {
    userDisabled: 'Your account is disabled',
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Email is already in use',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired',
      error: `Email not recognized`,
    },
  },

  iam: {
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own owner permission`,
    },
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  emails: {
    invitation: {
      subject: `You've been invited to {0}`,
      body: `
        <p>Hello,</p>
        <p>You've been invited to {0}.</p>
        <p>Follow this link to register.</p>
        <p><a href="{1}">{1}</a></p>
        <p>Thanks,</p>
        <p>Your {0} team</p>
      `,
    },
    emailAddressVerification: {
      subject: `Verify your email for {0}`,
      body: `
        <p>Hello,</p>
        <p>Follow this link to verify your email address.</p>
        <p><a href='{0}'>{0}</a></p>
        <p>If you didn’t ask to verify this address, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your {1} team</p>
      `,
    },
    passwordReset: {
      subject: `Reset your password for {0}`,
      body: `
        <p>Hello,</p>
        <p>Follow this link to reset your {0} password for your {1} account.</p>
        <p><a href='{2}'>{2}</a></p>
        <p>If you didn’t ask to reset your password, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your {0} team</p>
      `,
    },
    quoteRequest: {
      subject: `New Quote Request`,
      body: `
        <p>Hello, {2}</p>
        <p>You have received a new Quote.</p>
        <p>{4}</p>
        <p>Follow this Link to create an Appointment. <a href='{3}'>{3}</a></p>        
        <p>Thanks,</p>
        <p>{0} team</p>
      `,
    },
    appointmentRequest: {
      subject: `New Appointment Request`,
      body: `
        <p>Hello, {2}</p>
        <p>You have received a new Appointment.</p>
        <p>{4}</p>
        <p>Follow this Link for more details/accept an Appointment. <a href='{3}'>{3}</a></p>        
        <p>Thanks,</p>
        <p>{0} team</p>
      `,
    },
    bookingRequest: {
      subject: `New Booking Request`,
      body: `
        <p>Hello, {2}</p>
        <p>You have received a new Booking.</p>
        <p>{4}</p>
        <p>Follow this Link for more details/accept an booking. <a href='{3}'>{3}</a></p>        
        <p>Thanks,</p>
        <p>{0} team</p>
      `,
    },
    invoiceRequest: {
      subject: `New Invoice Received`,
      body: `
        <p>Hello, {2}</p>
        <p>You have received a new invoice.</p>
        <p>{4}</p>
        <p>Follow this Link to pay the outstanding Amount. <a href='{3}'>{3}</a></p>        
        <p>Thanks,</p>
        <p>{0} team</p>
      `,
    },

  },
};

module.exports = en;
