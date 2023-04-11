const { Client, GatewayIntentBits } = require('discord.js');
const { Collection } = require('discord.js')
const config = require('./config.json');
const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMembers
        ]
    });
const invites = new Collection();
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.guilds.cache.forEach(async (guild) => {
        const firstInvites = await guild.invites.fetch();
        invites.set(guild.id, new Collection(firstInvites.map((invite) => [invite.code, invite.uses])));
    });
});


client.on("inviteDelete", (invite) => {
    invites.get(invite.guild.id).delete(invite.code);
});

client.on("inviteCreate", (invite) => {
    invites.get(invite.guild.id).set(invite.code, invite.uses);
});

client.on("guildMemberAdd", async (member) => {
    const newInvites = await member.guild.invites.fetch()
    const oldInvites = invites.get(member.guild.id);
    const invite = newInvites.find(i => i.uses > oldInvites.get(i.code));
    const inviter = await client.users.fetch(invite.inviter.id);
    const logChannel = member.guild.channels.cache.find(channel => channel.id === config.channel_id);
    inviter
        ? logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`)
        : logChannel.send(`${member.user.tag} joined but I couldn't find through which invite.`);
});


client.login(config.token);