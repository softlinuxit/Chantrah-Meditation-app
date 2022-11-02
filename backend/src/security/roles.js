/**
 * List of Roles available for the Users.
 */
class Roles {
  static get values() {
    return {
      owner: 'owner',
      editor: 'editor',
      viewer: 'viewer',
      auditLogViewer: 'auditLogViewer',
      iamSecurityReviewer: 'iamSecurityReviewer',
      entityEditor: 'entityEditor',
      entityViewer: 'entityViewer',
      appUsersEditor: 'appUsersEditor',
      appUsersViewer: 'appUsersViewer',
      engineersEditor: 'engineersEditor',
      engineersViewer: 'engineersViewer',
      servicesEditor: 'servicesEditor',
      servicesViewer: 'servicesViewer',
      workGalleryEditor: 'workGalleryEditor',
      workGalleryViewer: 'workGalleryViewer',
      bookingEditor: 'bookingEditor',
      bookingViewer: 'bookingViewer',
      commentsEditor: 'commentsEditor',
      commentsViewer: 'commentsViewer',
      enquiriesEditor: 'enquiriesEditor',
      enquiriesViewer: 'enquiriesViewer',
    };
  }
}

module.exports = Roles;
