module.exports = {
  config: {
    name: "ephoto",
    version: "2.0.0",
    permission: 0,
    credits: "Nayan",
    description: "",
    prefix: true,
    category: "user",
    usages: "text",
    cooldowns: 5,
    dependencies: {
      'nayan-server': ''
    }
  },

  start: async function({ nayan, events, args, NAYAN }) {

    if (!NAYAN) {
      return nayan.reply(`[❌] Unsupported this file your bot`, events.threadID);
    }

    NAYAN.react("⏳️");
    const { messageID, threadID } = events;
    const fs = require("fs");
    const axios = require("axios");
    const request = require("request");

    const prompt = args.join(" ");
    if (!args[0]) return nayan.reply(`🔰Use ${global.config.PREFIX}${this.config.name} [text] | [no.]\n🔰Example:${global.config.PREFIX}${this.config.name} Nayan | 1\n\n🔥Total Edit limit 14...`, threadID, messageID);

    const content = args.join(" ");
    const msg = content.split("|");
    const number = msg[1]?.trim();
    const name = msg[0]?.trim();

    if (!number || !name) {
      return nayan.reply(`🔰Use ${global.config.PREFIX}${this.config.name} [text] | [no.]\n🔰Example:${global.config.PREFIX}${this.config.name} Nayan | 1\n\n🔥Total Edit limit 14...`, threadID, messageID);
    }

    const { ephoto } = require('nayan-server');

    const urls = {
  "1": "https://ephoto360.com/hieu-ung-chu/tao-hieu-ung-chu-mam-anh-sang-74.html",
  "2": "https://ephoto360.com/hieu-ung-chu/chu-kim-loai-tong-vang-ruc-215.html",
  "3": "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-kim-loai-nung-onine-341.html",
  "4": "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-typography-online-dark-green-typo-359.html",
  "5": "https://ephoto360.com/hieu-ung-chu/viet-chu-len-so-co-la-chocolate--186.html",
  "6": "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-tren-nen-la-cay-153.html",
  "7": "https://ephoto360.com/hieu-ung-chu/viet-chu-len-cua-so-mua-75.html",
  "8": "https://ephoto360.com/hieu-ung-chu/viet-chu-phan-len-bang-30.html",
  "9": "https://ephoto360.com/viet-ten-len-cat-truc-tuyen-hieu-ung-chu-cat-dep-mien-phi-667.html",
  "10": "https://ephoto360.com/hieu-ung-chu-anh-sang-hoang-hon-truc-tuyen-995.html",
  "11": "https://ephoto360.com/hieu-ung-viet-chu-len-cua-kinh-mua-tam-trang-dep-682.html",
  "12": "https://ephoto360.com/hieu-ung-chu/hieu-ung-chu-phao-bong-356.html",
  "13": "https://ephoto360.com/hieu-ung-chu/typography-online-voi-mau-nghe-thuat-moi-343.html",
  "14": "https://ephoto360.com/hieu-ung-chu/tao-hieu-ung-chu-tren-la-248.html"
};


    const url = urls[number] || null;

    if (!url) {
      return nayan.reply(`Invalid number. Please choose a number between 1 and 14.`, threadID, messageID);
    }

    try {
      let data = await ephoto(url, [name]);
      console.log(data);
      var file = fs.createWriteStream(__dirname + '/cache/ephoto.jpg');

      const link = data.url;
      const rqs = request(encodeURI(`${link}`));

      NAYAN.react("✅");
      rqs.pipe(file);

      file.on('finish', () => {
        setTimeout(function () {
          return nayan.reply({
            body: `❐ THIS IS YOUR NAME EDIT ✌️\n\n___________________________________\n\n❐ This Bot Name : ${global.config.BOTNAME} 🤖\n❐ This Bot Owner : 一々 Tʌɱɩɱ࿐😘\n❐ Your Input Name : ${name}\n\n___________________________________`,
            attachment: fs.createReadStream(__dirname + '/cache/ephoto.jpg')
          }, threadID, messageID);
        }, 5000);
      });

    } catch (err) {
      NAYAN.react("❌");
      nayan.reply(`🔰Use ${global.config.PREFIX}${this.config.name} [no.] [text]\n🔰Example:${global.config.PREFIX}${this.config.name} 1 nayan\n\n🔥Total Edit limit 14...`, events.threadID, events.messageID);
    }
  }
};
