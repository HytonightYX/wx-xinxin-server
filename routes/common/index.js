const request = require('request')
const config = require('../pay/config')
const util = require('../../util')

/**
 * @description 微信接口统一封装处理
 * @type {{}}
 */
// exports = {
// 	getAccessToken(code) {
// 		const tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appId}&secret=${config.wx.appSecret}&code=${code}&grant_type=authorization_code`
//
// 		return new Promise((resolve, reject) => {
// 			request.get(tokenUrl, function (err, res, body) {
// 				const r = util.handleResponse(err, res, body)
// 				resolve(r)
// 			})
// 		})
// 	}
// }

function getAccessToken(code) {
	const tokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appId}&secret=${config.wx.appSecret}&code=${code}&grant_type=authorization_code`
	return new Promise((resolve, reject) => {
		request.get(tokenUrl, function (err, res, body) {
			const r = util.handleResponse(err, res, body)
			resolve(r)
		})
	})
}

module.exports = {
	getAccessToken
}

