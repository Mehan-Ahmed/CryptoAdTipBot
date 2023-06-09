/*CMD
  command: /mute
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Admin Command
  answer: 
  keyboard: 
  aliases: 
CMD*/

Api.deleteMessage({ message_id: request.message_id })
if (chat.chat_type == "private") {
  Bot.sendInlineKeyboard(
    [
      [
        {
          title: "🚀 Add Me To A Group 🚀",
          url: "https://t.me/" + bot.name + "?startgroup=addtogroup"
        }
      ]
    ],
    "This bot work only in [group](https://t.me/+dUNUqeIZEV9kNTll)!"
  )
  return
}
var admin = Bot.getProperty("admin_" + request.chat.id, { list: {} })
//reply
if (request.reply_to_message) {
  if (admin.list[user.telegramid] == user.telegramid) {
    var tgid = request.reply_to_message.from.id
    var botk = request.reply_to_message.from.id.is_bot
    //valid user
    if (!Bot.getProperty(tgid)) {
      Bot.sendMessage("*User not found*!")
      return
    }
    //admin and bot
    if ((admin.list[tgid] == tgid) | botk) {
      Bot.sendMessage("You Can't mute admininstration or bot & channel")
      return
    }
    //admin command
    if (!params) {
      Api.restrictChatMember({
        chat_id: request.chat.id,
        user_id: tgid,
        on_result: "/muted " + tgid + " und2 und3 und4"
      })
      //mute forever
    } else {
      //with params
      if (!Bot.getProperty(tgid)) {
        Bot.sendMessage("*User not found*!")
        return
      }
      var time = params.split(" ")[0]
      if (!isNumeric(time)) {
        Api.restrictChatMember({
          chat_id: request.chat.id,
          user_id: tgid,
          on_result: "/muted " + tgid + " und2 und3 " + params
        })
        //mute forever
        return
      }
      var key = params.split(" ")[1]
      if (!key) {
        Bot.sendMessage(
          "⚠️ Incorrect Format use\nReply User `/mute 30 seconds`"
        )
        return
      }
      var cov = params.split(key)[1]
      if (!cov) {
        var optional = "und3"
      } else {
        var optional = cov
      }
      Api.restrictChatMember({
        chat_id: request.chat.id,
        user_id: tgid,
        until_date: GetTime(key, time),
        on_result: "/muted " + tgid + " " + time + " " + key + " " + optional
      })
    }
    return
  }
  return
}
if (!params) {
  Bot.sendMessage("⚠️ Incorrect Format use\n`/mute @user 30 seconds`")
} else {
  //with params
  if (admin.list[user.telegramid] == user.telegramid) {
    var tg = Bot.getProperty(params.split(" ")[0])
    //admin and bot
    if (admin.list[tg.user_id] == tg.user_id) {
      Bot.sendMessage("You Can't mute admininstration or bot & channel")
      return
    }
    if (!tg) {
      Bot.sendMessage("*User not found*!")
      return
    }
    var time = params.split(" ")[1]
    if (!time) {
      Api.restrictChatMember({
        chat_id: request.chat.id,
        user_id: tg.user_id,
        on_result: "/muted " + tg.user_id + " und2 und3 und4"
      })
      return
    }
    if (!isNumeric(time)) {
      Api.restrictChatMember({
        chat_id: request.chat.id,
        user_id: tg.user_id,
        on_result: "/muted " + tg.user_id + " und2 und3 " + params
      })
      return
    }
    var key = params.split(" ")[2]
    if (!key) {
      Bot.sendMessage("⚠️ Incorrect Format use\n`/mute @user 30 seconds`")
      return
    }
    var cov = params.split(key)[1]
    var optional = GetOptional(cov)
    Api.restrictChatMember({
      chat_id: request.chat.id,
      user_id: tg.user_id,
      until_date: GetTime(key, time),
      on_result:
        "/muted " + tg.user_id + " " + time + " " + key + " " + optional
    })
    return
  }
}
//function
function GetOptional(cov) {
  if (!cov) {
    return "und3"
  }
  return cov
}

