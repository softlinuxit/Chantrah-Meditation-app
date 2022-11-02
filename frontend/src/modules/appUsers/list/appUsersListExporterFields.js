import model from 'modules/appUsers/appUsersModel';

const { fields } = model;

export default [
  fields.id,
  fields.username,
  // fields.password,
  fields.fullName,
  fields.email,
  fields.phone,
  fields.address,
  fields.bio,
  // fields.image,
  fields.notifications,
  fields.createdAt,
  fields.updatedAt
];
