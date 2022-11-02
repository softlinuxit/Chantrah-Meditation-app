const Roles = require('./roles');
const roles = Roles.values;

/**
 * List of Permissions and the Roles allowed of using them.
 */
class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
          roles.viewer,
        ],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,


        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.owner, roles.auditLogViewer, roles.viewer],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.owner],
      },
      appUsersImport: {
        id: 'appUsersImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.appUsersEditor,
        ],
      },
      appUsersCreate: {
        id: 'appUsersCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.appUsersEditor,
        ],
        allowedStorageFolders: ['appUsers'],
      },
      appUsersEdit: {
        id: 'appUsersEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.appUsersEditor,
        ],
        allowedStorageFolders: ['appUsers'],
      },
      appUsersDestroy: {
        id: 'appUsersDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.appUsersEditor,
        ],
        allowedStorageFolders: ['appUsers'],
      },
      appUsersRead: {
        id: 'appUsersRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.appUsersEditor,
          roles.appUsersViewer,
        ],
      },
      appUsersAutocomplete: {
        id: 'appUsersAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.appUsersEditor,
          roles.appUsersViewer,
          roles.bookingEditor,
          roles.bookingViewer,
          roles.commentsEditor,
          roles.commentsViewer,
        ],
      },

      engineersImport: {
        id: 'engineersImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.engineersEditor,
        ],
      },
      engineersCreate: {
        id: 'engineersCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.engineersEditor,
        ],
        allowedStorageFolders: ['engineers'],
      },
      engineersEdit: {
        id: 'engineersEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.engineersEditor,
        ],
        allowedStorageFolders: ['engineers'],
      },
      engineersDestroy: {
        id: 'engineersDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.engineersEditor,
        ],
        allowedStorageFolders: ['engineers'],
      },
      engineersRead: {
        id: 'engineersRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.engineersEditor,
          roles.engineersViewer,
        ],
      },
      engineersAutocomplete: {
        id: 'engineersAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.engineersEditor,
          roles.engineersViewer,
          roles.workGalleryEditor,
          roles.workGalleryViewer,
          roles.bookingEditor,
          roles.bookingViewer,
          roles.commentsEditor,
          roles.commentsViewer,
        ],
      },

      servicesImport: {
        id: 'servicesImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.servicesEditor,
        ],
      },
      servicesCreate: {
        id: 'servicesCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.servicesEditor,
        ],
        allowedStorageFolders: ['services'],
      },
      servicesEdit: {
        id: 'servicesEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.servicesEditor,
        ],
        allowedStorageFolders: ['services'],
      },
      servicesDestroy: {
        id: 'servicesDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.servicesEditor,
        ],
        allowedStorageFolders: ['services'],
      },
      servicesRead: {
        id: 'servicesRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.servicesEditor,
          roles.servicesViewer,
        ],
      },
      servicesAutocomplete: {
        id: 'servicesAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.servicesEditor,
          roles.servicesViewer,
          roles.engineersEditor,
          roles.engineersViewer,
        ],
      },

      workGalleryImport: {
        id: 'workGalleryImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.workGalleryEditor,
        ],
      },
      workGalleryCreate: {
        id: 'workGalleryCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.workGalleryEditor,
        ],
        allowedStorageFolders: ['workGallery'],
      },
      workGalleryEdit: {
        id: 'workGalleryEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.workGalleryEditor,
        ],
        allowedStorageFolders: ['workGallery'],
      },
      workGalleryDestroy: {
        id: 'workGalleryDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.workGalleryEditor,
        ],
        allowedStorageFolders: ['workGallery'],
      },
      workGalleryRead: {
        id: 'workGalleryRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.workGalleryEditor,
          roles.workGalleryViewer,
        ],
      },
      workGalleryAutocomplete: {
        id: 'workGalleryAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.workGalleryEditor,
          roles.workGalleryViewer,

        ],
      },

      bookingImport: {
        id: 'bookingImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.bookingEditor,
        ],
      },
      bookingCreate: {
        id: 'bookingCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.bookingEditor,
        ],
        allowedStorageFolders: ['booking'],
      },
      bookingEdit: {
        id: 'bookingEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.bookingEditor,
        ],
        allowedStorageFolders: ['booking'],
      },
      bookingDestroy: {
        id: 'bookingDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.bookingEditor,
        ],
        allowedStorageFolders: ['booking'],
      },
      bookingRead: {
        id: 'bookingRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.bookingEditor,
          roles.bookingViewer,
        ],
      },
      bookingAutocomplete: {
        id: 'bookingAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.bookingEditor,
          roles.bookingViewer,
          roles.commentsEditor,
          roles.commentsViewer,
        ],
      },

      commentsImport: {
        id: 'commentsImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.commentsEditor,
        ],
      },
      commentsCreate: {
        id: 'commentsCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.commentsEditor,
        ],
        allowedStorageFolders: ['comments'],
      },
      commentsEdit: {
        id: 'commentsEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.commentsEditor,
        ],
        allowedStorageFolders: ['comments'],
      },
      commentsDestroy: {
        id: 'commentsDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.commentsEditor,
        ],
        allowedStorageFolders: ['comments'],
      },
      commentsRead: {
        id: 'commentsRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.commentsEditor,
          roles.commentsViewer,
        ],
      },
      commentsAutocomplete: {
        id: 'commentsAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.commentsEditor,
          roles.commentsViewer,

        ],
      },

      enquiriesImport: {
        id: 'enquiriesImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.enquiriesEditor,
        ],
      },
      enquiriesCreate: {
        id: 'enquiriesCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.enquiriesEditor,
        ],
        allowedStorageFolders: ['enquiries'],
      },
      enquiriesEdit: {
        id: 'enquiriesEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.enquiriesEditor,
        ],
        allowedStorageFolders: ['enquiries'],
      },
      enquiriesDestroy: {
        id: 'enquiriesDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.enquiriesEditor,
        ],
        allowedStorageFolders: ['enquiries'],
      },
      enquiriesRead: {
        id: 'enquiriesRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.enquiriesEditor,
          roles.enquiriesViewer,
        ],
      },
      enquiriesAutocomplete: {
        id: 'enquiriesAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.enquiriesEditor,
          roles.enquiriesViewer,

        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

module.exports = Permissions;
