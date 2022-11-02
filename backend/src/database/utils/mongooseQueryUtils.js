const database = require('../database');


module.exports = class MongooseQueryUtils {

  static uuid(value) {
    let id = value;

    if (!database.Types.ObjectId.isValid(id)) {
      id = database.Types.ObjectId.createFromTime(
        +new Date(),
      );
    }

    return id;
  }


  static escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }


  static sort(orderBy) {
    if (!orderBy) {
      return undefined;
    }

    let [column, order] = orderBy.split('_');

    if (column === 'id') {
      column = '_id';
    }

    return {
      [column]: order === 'ASC' ? 1 : -1,
    };
  }
};
