function requestApi(action, data, callback) {
  var formData = {
    action: action,
    data: data,
    device: 'web'
  };
  if (util.getCookie('leporu_token')) {
    formData.token_id = util.getCookie('leporu_token');
  }
  HTTP.call("POST", "https://api-dev.ibooknail.com", {data: formData}, callback);
}