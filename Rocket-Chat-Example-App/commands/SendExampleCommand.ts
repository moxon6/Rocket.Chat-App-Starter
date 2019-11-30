import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { ExampleApp } from '../ExampleApp';

export class SendExampleCommand implements ISlashCommand {
    public command = 'example';
    public i18nParamsExample = 'Example_Command_Example';
    public i18nDescription = 'Example_Command_Description';
    public providesPreview = false;

    constructor(private readonly app: ExampleApp) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const message = await modify.getCreator().startMessage();
        const sender = await read.getUserReader().getByUsername(context.getSender().username);

        const room = await read.getRoomReader().getById(context.getRoom().id);
        const roomEph = context.getRoom();

        if (!room) {
            throw Error('No room is configured for the message');
        }

        message.setSender(sender);

        try {

            message
                .setRoom(room)
                .setText("Example Response");
            modify.getCreator().finish(message);

        } catch (error) {
            message
                .setRoom(roomEph)
                .setText(error.message);
            modify.getNotifier().notifyRoom(roomEph, message.getMessage());
        }
    }
}
