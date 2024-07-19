import fetch from 'auth/FetchInterceptor'

const AuthService = {}

AuthService.login = function (data) {
	return fetch({
		url: '/User/AdminLogin',
		method: 'post',
		data: ({
			email: data.username,
			password: data.password
		})
	})
}

AuthService.logout = function () {
	return fetch({
		url: '/User/LogOut',
		method: 'get'
	})
}

AuthService.isLogger = function () {
	const token = localStorage.getItem("auth_token");
	return !!token;
}

export default AuthService;