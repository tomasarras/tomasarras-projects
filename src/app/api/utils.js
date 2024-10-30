import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import axios from '../utils/axiosTelegram';
let initialized = false
const CryptoJS = require("crypto-js");
export async function init(db) {
	//TODO ver que no se ejecute mas de una vez
	if (initialized) return
	if (db == undefined) {
		const { client } = require('../../../db');
		db = client();
	}
	const query = "CREATE TABLE IF NOT EXISTS authenticator_token ("+
								 "id UUID DEFAULT gen_random_uuid() primary key,"+
								 "ip INET,"+
								 "created_at TIMESTAMPTZ DEFAULT NOW()"+
								 ");"
	const query2 = "CREATE TABLE IF NOT EXISTS authenticator_app ("+
									"id UUID PRIMARY KEY DEFAULT gen_random_uuid(),"+
									"name VARCHAR NOT NULL,"+
									"status VARCHAR NOT NULL,"+
									"description TEXT,"+
									"img VARCHAR,"+
									"password VARCHAR NOT NULL,"+
									"secret_otp VARCHAR,"+
									"created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"+
									");"
	const query3 = "CREATE TABLE IF NOT EXISTS ip_list ("+
									"ip VARCHAR PRIMARY KEY,"+
									"created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"+
									"status VARCHAR NOT NULL,"+
									"attempt INTEGER NOT NULL,"+
									"lock_until TIMESTAMP"+
									");"//TODO
	const query4 = "CREATE TABLE IF NOT EXISTS login_2fa ("+
									"id UUID PRIMARY KEY DEFAULT gen_random_uuid(),"+
									"status VARCHAR NOT NULL"+
									");"//TODO
	try {
		await db.none(query);
		await db.none(query2);
		await db.none(query3);
		await db.none(query4);
		console.log("Table 'authenticator_token' created (if not exists).");
		console.log("Table 'authenticator_app' created (if not exists).");
	} catch (error) {
		console.error("Error creating table 'authenticator_token': ", error);
	}
	const webHook = process.env.TELEGRAM_WEBHOOK_URL
	try {
		const response = await axios.get(`/setWebhook?url=${webHook}`)
		console.log(response.data);
	} catch (e) {}
}

export async function isValidToken(req) {
	const ip = req.headers.get("X-Real-IP");
	const token = req.headers.get("Authorization")?.split(' ')[1];
	if (!token)
		return false
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const { client } = require('../../../db');
		const db = client();
		const tokenId = decoded.id
		const query = "SELECT * "+
									"FROM authenticator_token "+
									"WHERE id = $1 "+
									"LIMIT 1;"
		const [result] = await db.any(query, [tokenId]);
		if (!result)
			return false
		const sameIp = result.ip == ip
		if (!sameIp)
			return false
		await revokeToken(decoded.id, db)
		return newToken(req)
	} catch (e) {
		if (e.name == "TokenExpiredError")
			return false
		console.error(e);
		return false
	}
}

async function revokeToken(tokenId, db) {
	return db.result('DELETE FROM authenticator_token WHERE id = $1', tokenId)
}

export async function newToken(req) {
	const ip = req.headers.get("X-Real-IP");
	const id = uuidv4();
	const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION || '5m' });
	const { client } = require('../../../db');
	const db = client();
	await init(db)
	
	const insertQuery = `
		INSERT INTO authenticator_token (id , ip, created_at) 
		VALUES ($1, $2, $3)
		RETURNING *;`;

	db.one(insertQuery, [id, ip, new Date()])
	return token
}

export function formatAppResponse(app) {
	app.createdAt = app["created_at"]
	delete app["created_at"]
	delete app["secret_otp"]
	delete app["password"]
	return app
}

export async function encryptPassword(password) {
	return CryptoJS.AES.encrypt(password, process.env.ENCRYPT_PASSWORD).toString();
}

export async function decryptPassword(hashedText) {
	const bytes = CryptoJS.AES.decrypt(hashedText, process.env.ENCRYPT_PASSWORD);
	return bytes.toString(CryptoJS.enc.Utf8);
};