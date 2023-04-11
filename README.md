# Discord Invite Traker

This is a simple Discord bot that track user's invites

## Getting Started

To use this bot, you'll need to set your Discord bot token in the `config.json` file. Here's how:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Click on the "Bot" tab and then click "Add Bot".
3. Copy the bot token and paste it into the `config.json` file, replacing `your_token_here` with your actual token:
4. You will also need to add the id of a channel on your server replacing `your_log_channel_id`, where log messages will be sent

```json
{
"token": "your_token_here",
"channel_id": "your_log_channel_id"
}
```

4. Save the `config.json` file
5. Run the command `npm i`
6. Run the bot using `node index.js`.

That's it! Your bot should now be online and ready to use.

## Commands

This bot supports the following commands:

- `no commands available`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
