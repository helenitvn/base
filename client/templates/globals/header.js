Template.header.helpers({
  brandLink() {
    let login = FlowRouter.path('login'),
      index = FlowRouter.path('index');
    return util.getCookie('leporu_token') ? index : login;
  },
  currentUser() {
    var currentUser = Session.get('currentUser');
    if (currentUser) return JSON.parse(currentUser);

    requestApi('get_user_info_by_token_id', {}, function (error, response) {
      var result = response.data;
      if (result.status == 'ERROR') {
        Bert.alert(result.msg, 'warning');
      } else {
        Session.set('currentUser', JSON.stringify(result.user));
        return result.user;
      }
    });
  }
});

Template.header.events({
  'click .logout' () {
    requestApi('sign_out', {}, function (error, response) {
      var result = response.data;
      if (result.status == 'ERROR') {
        Bert.alert(result.msg, 'warning');
      } else {
        util.deleteCookie('leporu_token');
        Session.set('currentUser', null);
        Bert.alert('Logged out!', 'success');
      }
    });
  }
});
