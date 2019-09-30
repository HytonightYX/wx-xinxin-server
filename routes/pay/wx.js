// 微信公众号端支付/分享功能
const express = require('express')
const request = require('request')
const cache = require('memory-cache')
const config = require('./config')
const common = require('../common')
const util = require('../../util')
const router = express.Router()

router.get('/test', function (req, res) {
	res.json({
		code: 0,
		data: 'test',
		message: ''
	})
})

/**
 * 微信用户授权重定向
 */
router.get('/redirect', function (req, res) {
	console.log('=============== get redirect =================')
	const redirectUrl = req.query.url
	const scope = req.query.scope
	const cb = 'http://wx.xinxin.com/api/getOpenId'
	cache.put('redirectUrl', redirectUrl)
	const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.wx.appId}&redirect_uri=${cb}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
	// 重定向到
	res.redirect(authUrl)
})

/**
 * 根据 code 获取用户的 OpenID
 */
router.get('/getOpenId', async function (req, res) {
	console.log('=============== get getOpenId =================')
	const code = req.query.code

	console.log('get code:', code)

	if (!code) {
		console.log('当前未获取到 code 码')
		res.json(util.handleFailure('当前未获取到 code 码'))
	} else {
		const r = await common.getAccessToken(code)

		if (r.code === 0) {
			let data = r.data.data
			console.log('data:', data)
			console.log('get access token:', data.access_token)
			let expireTime = 1000 * 60 * 1
			res.cookie('openId', data.openid, {maxAge: expireTime})
			const redirectUrl = cache.get('redirectUrl')
			res.redirect(redirectUrl)
		} else {
			res.json(r)
		}
	}
})

module.exports = router
