const handleRedirect = ( routes, redirect ) => {
	let currentRoute = FlowRouter.getRouteName();
	if ( routes.indexOf( currentRoute ) > -1 ) {
		FlowRouter.go( redirect );
		return true;
	}
};

Template.default.helpers({
	loggingIn() {
		//return Meteor.loggingIn();
    return Session.get('loggingIn');
	},
	authenticated() {
		//return !Meteor.loggingIn() && Meteor.user();
    return util.getCookie('leporu_token') ? true : false;
	},
	redirectAuthenticated() {
	 	return handleRedirect([
			'login',
			'signup',
			'recover-password',
			'reset-password'
		], '/' );
	},
	redirectPublic() {
		return handleRedirect([
			'index',
			'dashboard'
		], '/login' );
	}
});
