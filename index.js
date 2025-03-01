const mineflayer = require('mineflayer');

// === CONFIGURATION ===
const config = {
    serverIP: "Empiresmps.aternos.me",  // Replace with your Aternos server IP
    botUsername: "AFK_Bot",              // Change bot username
    autoReconnect: true,                 // Auto-reconnect
    preventAFK: true,                     // Enable AFK movements
    chatMessages: ["Still here!", "AFK but online!", "Keeping server alive!"], 
    chatInterval: 300000,                 // Send chat message every 5 minutes
};

let bot;
function createBot() {
    bot = mineflayer.createBot({
        host: config.serverIP,
        port: 25565, // Default port
        username: config.botUsername,
    });

    bot.on('login', () => console.log(`[BOT] Logged in as ${config.botUsername}`));

    if (config.preventAFK) {
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 2000);
        }, 60000);
    }

    if (config.chatMessages.length > 0) {
        setInterval(() => {
            const msg = config.chatMessages[Math.floor(Math.random() * config.chatMessages.length)];
            bot.chat(msg);
        }, config.chatInterval);
    }

    bot.on('end', () => {
        console.log("[BOT] Disconnected! Reconnecting...");
        if (config.autoReconnect) setTimeout(createBot, 5000);
    });

    bot.on('error', err => console.log(`[ERROR] ${err}`));
}

createBot();
