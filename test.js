const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Selamat idul fitri 1 Syawal 1440H`);
});
client.on("message", (message) => { 

    if (message.content === "F") {
        message.channel.send("https://media1.giphy.com/media/26gR1v0rIDrjSsca4/giphy.gif?fbclid=IwAR0Is3fI64j0ETye4OqFXtyo_5NyMVSVV-VMXKshJGJPTZMwx1ceXiHdeFo");
    }
    if (message.content === "wat") {
        message.channel.send("https://imgur.com/a/MUB3UHJ");
    }

    if (message.content === "no u") {
        message.channel.send("https://imgur.com/a/ufInSUc");
    }
    if (message.content === "halo") {
        message.channel.send("Hai " + message.author.toString() + "!");
    }
    if (message.content === "Halo") {
        message.channel.send("Hai " + message.author.toString() + "!");
    }

    if (message.content === "hmmm") {
        message.channel.send("https://cdn.discordapp.com/attachments/257828947272663041/372201791728648213/yoy587pe6pmz.gif");
    }

    if (message.content === "your mom gay") {
        message.channel.send("no u");
    }
    if (message.content === "loss") {
        message.channel.send("|         | | ");
        message.channel.send("| |       | _");
    }
    if (message.isMentioned(client.user)) {
         message.reply('Apa?');
    }
});
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Yo ho! I'm still there! , My latency is ${m.createdTimestamp - message.createdTimestamp}ms`);
    }
    if (command === "say") {
        if (!message.member.roles.some(r => ["Admin"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");
        const sayMessage = args.join(" ");
        message.delete().catch(O_o => { });
        message.channel.send(sayMessage);
    }

    if (command === "kick") {
        if (!message.member.roles.some(r => ["Admin"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.kickable)
            return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";
        await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

    }
    if (command === "stats") {
        message.channel.send("Connected to SGP 2931 | RAM Usage : 31 / 256MB");
    }
    if (command === "ban") {
        if (!message.member.roles.some(r => ["Admin"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");

        let member = message.mentions.members.first();
        if (!member)
            return message.reply("Please mention a valid member of this server");
        if (!member.bannable)
            return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";

        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
        message.channel.send("https://imgur.com/a/a3VlUGR");
    }

    if (command === "prune") {
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
        const fetched = await message.channel.fetchMessages({ count: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
});
client.login(process.env.BOT_TOKEN);
