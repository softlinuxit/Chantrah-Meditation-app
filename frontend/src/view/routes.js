import Permissions from 'security/permissions';
import { i18n } from 'i18n';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    icon: 'home',
    label: i18n('entities.posts.menu'),
    menu: {
      exact: true,
    },
    loader: () => import('view/posts/list/PostsListPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
  },
  {
    path: '/app-users',
    loader: () => import('view/appUsers/list/AppUsersListPage'),
    permissionRequired: permissions.appUsersRead,
    exact: true,
    icon: 'usergroup-add',
    label: i18n('entities.appUsers.menu'),
    menu: true,
  },
  {
    path: '/app-users/new',
    loader: () => import('view/appUsers/form/AppUsersFormPage'),
    menu: false,
    permissionRequired: permissions.appUsersCreate,
    exact: true,
  },
  {
    path: '/app-users/importer',
    loader: () =>
      import('view/appUsers/importer/AppUsersImporterPage'),
    menu: false,
    permissionRequired: permissions.appUsersImport,
    exact: true,
  },
  {
    path: '/app-users/:id/edit',
    loader: () => import('view/appUsers/form/AppUsersFormPage'),
    menu: false,
    permissionRequired: permissions.appUsersEdit,
    exact: true,
  },
  {
    path: '/app-users/:id',
    loader: () => import('view/appUsers/view/AppUsersViewPage'),
    menu: false,
    permissionRequired: permissions.appUsersRead,
    exact: true,
  },
  // {
  //   path: '/posts',
  //   loader: () => import('view/posts/list/PostsListPage'),
  //   permissionRequired: permissions.postsRead,
  //   exact: true,
  //   icon: 'read',
  //   label: i18n('entities.posts.menu'),
  //   menu: true,
  // },
  {
    path: '/posts/new',
    loader: () => import('view/posts/form/PostsFormPage'),
    menu: false,
    permissionRequired: permissions.postsCreate,
    exact: true,
  },
  {
    path: '/posts/importer',
    loader: () =>
      import('view/posts/importer/PostsImporterPage'),
    menu: false,
    permissionRequired: permissions.postsImport,
    exact: true,
  },
  {
    path: '/posts/:id/edit',
    loader: () => import('view/posts/form/PostsFormPage'),
    menu: false,
    permissionRequired: permissions.postsEdit,
    exact: true,
  },
  {
    path: '/posts/:id',
    loader: () => import('view/posts/view/PostsViewPage'),
    menu: false,
    permissionRequired: permissions.postsRead,
    exact: true,
  },
  {
    path: '/comments',
    loader: () => import('view/comments/list/CommentsListPage'),
    permissionRequired: permissions.commentsRead,
    exact: true,
    icon: 'like',
    label: i18n('entities.comments.menu'),
    menu: true,
  },
  {
    path: '/comments/new',
    loader: () => import('view/comments/form/CommentsFormPage'),
    menu: false,
    permissionRequired: permissions.commentsCreate,
    exact: true,
  },
  {
    path: '/comments/importer',
    loader: () =>
      import('view/comments/importer/CommentsImporterPage'),
    menu: false,
    permissionRequired: permissions.commentsImport,
    exact: true,
  },
  {
    path: '/comments/:id/edit',
    loader: () => import('view/comments/form/CommentsFormPage'),
    menu: false,
    permissionRequired: permissions.commentsEdit,
    exact: true,
  },
  {
    path: '/comments/:id',
    loader: () => import('view/comments/view/CommentsViewPage'),
    menu: false,
    permissionRequired: permissions.commentsRead,
    exact: true,
  },
  // {
  //   path: '/audit-logs',
  //   icon: 'file-search',
  //   label: i18n('auditLog.menu'),
  //   loader: () => import('view/auditLog/AuditLogPage'),
  //   menu: true,
  //   permissionRequired: permissions.auditLogRead,
  // },
  {
    path: '/iam',
    loader: () => import('view/iam/list/IamPage'),
    permissionRequired: permissions.iamRead,
    exact: true,
    icon: 'user-add',
    label: i18n('iam.menu'),
    menu: true,
  },

  {
    path: '/iam/new',
    loader: () => import('view/iam/new/IamNewPage'),
    menu: false,
    permissionRequired: permissions.iamCreate,
    exact: true,
  },
  {
    path: '/iam/importer',
    loader: () =>
      import('view/iam/importer/IamImporterPage'),
    menu: false,
    permissionRequired: permissions.iamImport,
    exact: true,
  },
  {
    path: '/iam/:id/edit',
    loader: () => import('view/iam/edit/IamEditPage'),
    menu: false,
    permissionRequired: permissions.iamEdit,
    exact: true,
  },
  {
    path: '/iam/:id',
    loader: () => import('view/iam/view/IamViewPage'),
    menu: false,
    permissionRequired: permissions.iamRead,
    exact: true,
  },
  {
    path: '/settings',
    icon: 'setting',
    label: i18n('settings.menu'),
    loader: () => import('view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    menu: true,
  },



];

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () => import('view/auth/ForgotPasswordPage'),
  },
];

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () => import('view/auth/EmptyPermissionsPage'),
  },
];

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () => import('view/auth/EmailUnverifiedPage'),
  },
];

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () => import('view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () => import('view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () => import('view/shared/errors/Error404Page'),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};
