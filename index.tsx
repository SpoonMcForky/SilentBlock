import { UPlugin } from '@classes';
import { getByDisplayName } from '@webpack';
const PrivateChannel = getByDisplayName('PrivateChannel', { ret: 'exports' }).default;
const Patcher = require('@patcher');
export default class SilentBlock extends UPlugin {
  start() {
    this.patchComponent();
  }
  patchComponent() {
    Patcher.after('block', PrivateChannel.prototype, 'render', (_: any, ret: any, ...args: any) => {
      try {
        const dms = [/*DM ID as string*/];
        if (args[0].props.id === dms[0]) {
          ret = null;
          return ret;
        }
      } catch (err) {}
    });
  }
  stop() {
    Patcher.unpatchAll('block');
  }
}
