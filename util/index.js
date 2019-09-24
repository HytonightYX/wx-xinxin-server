/**
 * 统一处理 response
 */
function handleResponse(err, response, body) {
	if (!err && response.statusCode === 200) {
		let data = JSON.parse(body)

		// 网络请求成功
		if (data && !data.errcode) {
			return handleSuccess(this.handleSuccess(data))
		} else {
			// 否则直接取微信返回的 errmsg 和 errcode
			return handleFailure(data.errmsg, data.errcode)
		}
	} else {
		return handleFailure(err, -1)
	}
}

function handleSuccess(data = '') {
	return {
		code: 0,
		data: data,
		msg: ''
	}
}

function handleFailure(msg = '', code = 10001) {
	return {
		code,
		data: '',
		msg
	}
}

module.exports = {
	handleResponse,
	handleFailure,
	handleSuccess
}
