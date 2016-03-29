let login = (options) => {
  _validate(options.form, options.template);
};

let _validate = (form, template) => {
  $(form).validate(validation(template));
};

let validation = (template) => {
  return {
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.'
      }
    },
    submitHandler() {
      _handleLogin(template);
    }
  };
};

let _handleLogin = (template) => {
  let email = template.find('[name="emailAddress"]').value,
    password = template.find('[name="password"]').value,
    formData = {
      user_info: email,
      hash_password: calcSHA1(password)
    };

  Session.set('loggingIn', true);

  requestApi('sign_in', formData, function (error, response) {
    var result = response.data;
    if (result.status == 'ERROR') {
      Bert.alert(result.msg, 'warning');
    } else {
      util.setCookie('leporu_token', result.token_id, 3);
      Session.set('currentUser', JSON.stringify({
        full_name: result.full_name,
        photo: result.photo,
        type: result.type
      }));
      Bert.alert('Logged in!', 'success');
    }
    Session.set('loggingIn', false);
  });
};

Modules.client.login = login;
