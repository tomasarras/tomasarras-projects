import { APPROVE_TELEGRAM_ACTION, BAN_TELEGRAM_ACTION, REJECT_TELEGRAM_ACTION } from "../Constants";
import axios from "../utils/axiosTelegram";
import { v4 as uuidv4 } from 'uuid';

export async function sendLoginNotification(req) {
  try {
    const chatId = process.env.TELEGRAM_CHAT_ID_2FA
    const secondFactorLoginId = uuidv4();
    const userAgent = req.headers.get("user-agent") || 'Unknow browser';
    let ip = ""
    try {
      ip = req.headers.get("X-Real-IP");
    } catch (e) {}
    await axios.post(`/sendMessage`, {
      chat_id: chatId,
      text: `Login\n${userAgent}\n`,//TODO mostrar mas datos como localidad dispocitivo ip, etc
      reply_markup: {
        inline_keyboard: [
            [
                { text: "Approve", callback_data: `${APPROVE_TELEGRAM_ACTION}_${secondFactorLoginId}` },
                { text: "Reject", callback_data: `${REJECT_TELEGRAM_ACTION}_${secondFactorLoginId}` },
                { text: "Ban", callback_data: `${BAN_TELEGRAM_ACTION}_${ip}` }
            ]
        ]
      }
    });
    return secondFactorLoginId
  } catch (e) {
    console.log(e);
  }
}

export async function sendLoginFailNotification(req, agent) {
  try {
    console.log(agent);
    let ip = ''
    try {
      ip = req.headers.get("X-Real-IP");
    } catch (e) {}
    try {
      agent.ip = ip
      agent = JSON.stringify(agent, null, 2)
    } catch (e) {
      agent = 'ip='+ip
    }
    const mapUrl = "https://www.cual-es-mi-ip.net/geolocalizar-ip-mapa/" + ip
    const chatId = process.env.TELEGRAM_CHAT_ID_2FA
    const userAgent = req.headers.get("user-agent") || 'Unknow browser';
    const response = await axios.post(`/sendMessage`, {
      chat_id: chatId,
      silent: true,
      text: `Login fail\n${userAgent}\n${agent}\n${mapUrl}`,//TODO mostrar mas datos como localidad dispocitivo ip, etc
      reply_markup: {
        inline_keyboard: [
            [
                { text: "Ban", callback_data: `${BAN_TELEGRAM_ACTION}_${ip}` }
            ]
        ]
      }
    });  
    return response
  } catch (e) {
    console.log(e);
  }
}