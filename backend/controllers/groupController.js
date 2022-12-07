import Helpers from '../helpers/helpers';
import Group from '../models/groups';
import JoinedGroup from '../models/joinedGroups';
import moment from 'moment';
import Database from '../db/db';
import { SUCCESS, NOT_AUTHORISED } from '../utils/constants';

const group = new Group();
const joinedG = new JoinedGroup();
const db = new Database();
const date = moment(new Date()).format('YYYY-MM-DD');

class GroupController {
  static async getAllGroups(req, res) {
    const _group = await group.allWhere({ status: 'active' });
    if (_group.errors) return Helpers.dbError(res, _group);
    return Helpers.sendResponse(res, 200, SUCCESS, { groups: _group.rows });
  }

  static async createGroup(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const newGroup = {
      ...req.body,
      owner_id: currentuser.id,
    };
    const _group = await group.create(newGroup);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    const newJoin = {
      user_id: currentuser.id,
      group_id: _group.rows[0].id,
      join_date: date,
      status: 'accepted',
    };
    const _join = await joinedG.create(newJoin);
    if (_join.errors) {
      return Helpers.dbError(res, _join);
    }
    return Helpers.sendResponse(res, 200, SUCCESS, { group: _group.rows[0] });
  }

  static async joinGroup(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);

    const _group = await group.getById(req.params.id);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    let newJoin = {};
    if (_group.row.type === 'private') {
      newJoin = {
        user_id: currentuser.id,
        group_id: req.params.id,
        join_date: date,
        status: 'pending',
      };
    } else {
      newJoin = {
        user_id: currentuser.id,
        group_id: req.params.id,
        join_date: date,
        status: 'accepted',
      };
    }

    const _newjoin = await joinedG.create(newJoin);
    if (_newjoin.errors) {
      return Helpers.dbError(res, _newjoin);
    }
    return Helpers.sendResponse(res, 200, SUCCESS, {
      group: _newjoin.rows,
    });
  }

  static async deleteGroup(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _group = await group.getById(req.params.id);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    if (currentuser.id !== _group.row.owner_id) {
      return Helpers.sendResponse(res, 401, NOT_AUTHORISED);
    }

    const _deletegroup = await group.update({ status: 'inactive' }, { id: req.params.id });
    if (_deletegroup.errors) {
      return Helpers.dbError(res, _deletegroup);
    }
    return Helpers.sendResponse(res, 200, SUCCESS);
  }

  static async updateGroup(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _group = await group.getById(req.params.id);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    if (currentuser.id !== _group.row.owner_id) {
      return Helpers.sendResponse(res, 401, NOT_AUTHORISED);
    }

    const newupdate = {
      ...req.body,
    };
    const _updategroup = await group.update(newupdate, { id: req.params.id });
    if (_updategroup.errors) {
      return Helpers.dbError(res, _updategroup);
    }
    return Helpers.sendResponse(res, 200, SUCCESS, {
      group: _updategroup.rows[0],
    });
  }

  static async leaveGroup(req, res) {
    const data = { leave_date: date };
    const where = { id: req.params.id };
    const _group = await joinedG.update(data, where);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, SUCCESS);
  }

  static async groupById(req, res) {
    const _group = await group.getById(req.params.id);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, SUCCESS, { groups: _group.row });
  }

  static async getGroupRequests(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _group = await group.getById(req.params.id);

    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }

    if (currentuser.id === _group.row.owner_id) {
      const _requests = await joinedG.allWhere({ group_id: req.params.id, status: 'pending' });
      if (_requests.errors) {
        return Helpers.dbError(res, _requests);
      }
      return Helpers.sendResponse(res, 200, SUCCESS, { requests: _requests.rows });
    }

    return Helpers.sendResponse(res, 400, NOT_AUTHORISED);
  }

  static async updateGroupRequest(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _jgroup = await joinedG.getById(req.params.id);

    if (_jgroup.errors) {
      return Helpers.dbError(res, _jgroup);
    }

    const _group = await group.getById(_jgroup.row.group_id);

    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }

    if (currentuser.id === _group.row.owner_id) {
      const _requests = await joinedG.update({ status: req.body.status }, { id: req.params.id });
      if (_requests.errors) {
        return Helpers.dbError(res, _requests);
      }
      return Helpers.sendResponse(res, 200, SUCCESS, { requests: _requests.rows });
    }

    return Helpers.sendResponse(res, 401, NOT_AUTHORISED);
  }

  static async deleteGroupRequest(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _jgroup = await joinedG.getById(req.params.id);

    if (_jgroup.errors) {
      return Helpers.dbError(res, _jgroup);
    }

    if (currentuser.id === _jgroup.row.user_id) {
      const _requests = await joinedG.delete({ id: req.params.id });
      if (_requests.errors) {
        return Helpers.dbError(res, _requests);
      }
      return Helpers.sendResponse(res, 200, SUCCESS);
    }

    return Helpers.sendResponse(res, 401, NOT_AUTHORISED);
  }

  static async groupMembers(req, res) {
    const sql = `SELECT users.fullname, users.email, users.phone, users.city, joined_groups.join_date FROM users JOIN joined_groups ON joined_groups.user_id = users.id WHERE joined_groups.group_id = ${req.params.id};`;
    const _members = await db.queryBuilder(sql);
    if (_members.errors) return Helpers.dbError(res, _members);

    return Helpers.sendResponse(res, 200, SUCCESS, { members: _members.rows });
  }
}

export default GroupController;
