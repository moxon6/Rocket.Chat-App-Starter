import {
    IConfigurationExtend,
    IEnvironmentRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { SendExampleCommand } from './commands/SendExampleCommand';

export class ExampleApp extends App {
    protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(new SendExampleCommand(this));
    }
}
